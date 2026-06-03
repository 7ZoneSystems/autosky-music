"use strict";

const DEFAULT_BASE_URL = "https://token-plan-sgp.xiaomimimo.com/v1";
const DEFAULT_MODEL = "mimo-v2.5";

function readBody(req) {
  if (req.body && typeof req.body === "object") return Promise.resolve(req.body);
  if (typeof req.body === "string") {
    try {
      return Promise.resolve(JSON.parse(req.body));
    } catch {
      return Promise.resolve({});
    }
  }

  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
      if (data.length > 100000) {
        reject(new Error("Request body too large"));
      }
    });
    req.on("end", () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch {
        resolve({});
      }
    });
    req.on("error", reject);
  });
}

function buildMessagesEndpoint(baseUrl) {
  const trimmed = String(baseUrl || DEFAULT_BASE_URL).replace(/\/+$/, "");
  if (trimmed.endsWith("/messages")) return trimmed;
  if (trimmed.endsWith("/v1")) return `${trimmed}/messages`;
  return `${trimmed}/v1/messages`;
}

function extractText(payload) {
  if (Array.isArray(payload.content)) {
    return payload.content
      .map((block) => {
        if (typeof block === "string") return block;
        return block && typeof block.text === "string" ? block.text : "";
      })
      .join("")
      .trim();
  }
  if (typeof payload.content === "string") return payload.content.trim();
  if (typeof payload.completion === "string") return payload.completion.trim();
  return "";
}

function sanitizeErrorText(text) {
  return String(text || "")
    .replace(/[A-Za-z0-9_-]{24,}/g, "[redacted]")
    .slice(0, 500);
}

module.exports = async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.MIMO_API_KEY || process.env.XIAOMI_MIMO_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "Missing MIMO_API_KEY environment variable" });
    return;
  }

  try {
    const body = await readBody(req);
    const chordLines = Array.isArray(body.chordLines) ? body.chordLines.slice(0, 500) : [];
    if (!chordLines.length) {
      res.status(400).json({ error: "No chord lines supplied" });
      return;
    }

    const endpoint = buildMessagesEndpoint(process.env.MIMO_BASE_URL);
    const model = process.env.MIMO_MODEL || DEFAULT_MODEL;
    const prompt = [
      "You are refining an automatic chord-recognition result for a Sky: Children of the Light 15-button piano sheet maker.",
      "Keep output compact and deterministic.",
      "Merge repeated adjacent chords if the chord name and Sky buttons are the same.",
      "Preserve timestamps, chord names, and Sky button mappings when they are useful.",
      "Mark unplayable rows as 'rest' or 'not in selected Sky key'.",
      "Return only a minimal chord format, one line per segment.",
      "",
      `Title: ${body.title || "Untitled Sky Sheet"}`,
      `Selected Sky key: ${body.selectedSkyKey || "unknown"}`,
      `Detected audio key: ${body.detectedKey || "unknown"}`,
      `Duration seconds: ${Number(body.duration || 0).toFixed(2)}`,
      "",
      "Raw detected chord lines:",
      chordLines.join("\n")
    ].join("\n");

    const upstream = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "api-key": apiKey
      },
      body: JSON.stringify({
        model,
        max_tokens: 1600,
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    const rawText = await upstream.text();
    let payload = {};
    try {
      payload = rawText ? JSON.parse(rawText) : {};
    } catch {
      payload = {};
    }

    if (!upstream.ok) {
      res.status(upstream.status).json({
        error: `MiMo API error: ${sanitizeErrorText(rawText || upstream.statusText)}`
      });
      return;
    }

    const refinedText = extractText(payload);
    res.status(200).json({
      refinedText,
      model
    });
  } catch (error) {
    res.status(500).json({
      error: sanitizeErrorText(error && error.message ? error.message : "MiMo request failed")
    });
  }
};
