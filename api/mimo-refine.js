"use strict";

const fs = require("fs");
const path = require("path");

const DEFAULT_BASE_URL = "https://token-plan-sgp.xiaomimimo.com/anthropic";
const DEFAULT_MESSAGES_URL = "https://token-plan-sgp.xiaomimimo.com/anthropic/v1/messages";
const DEFAULT_MODEL = "mimo-v2.5";

function loadLocalEnvFile() {
  if (process.env.VERCEL) return;

  const envPath = path.join(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) return;

  const text = fs.readFileSync(envPath, "utf8");
  text.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) return;

    const separator = trimmed.indexOf("=");
    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();
    if (!key || process.env[key] !== undefined) return;

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  });
}

loadLocalEnvFile();

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

function uniqueItems(items) {
  return [...new Set(items.filter(Boolean))];
}

function buildEndpointCandidates(baseUrl, exactUrl) {
  const candidates = [];
  if (exactUrl) candidates.push(String(exactUrl).trim());

  const trimmed = String(baseUrl || DEFAULT_BASE_URL).replace(/\/+$/, "");
  candidates.push(buildMessagesEndpoint(trimmed));

  try {
    const parsed = new URL(trimmed);
    if (!parsed.pathname.includes("/anthropic")) {
      candidates.push(`${parsed.origin}/anthropic/v1/messages`);
    }
  } catch {
    // The final official fallback below still covers normal use.
  }

  candidates.push(DEFAULT_MESSAGES_URL);
  return uniqueItems(candidates);
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

async function callMimoEndpoint(endpoint, apiKey, model, prompt) {
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

  return {
    ok: upstream.ok,
    status: upstream.status,
    statusText: upstream.statusText,
    rawText,
    payload,
    endpoint
  };
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
    const melodyLines = Array.isArray(body.melodyLines) ? body.melodyLines.slice(0, 500) : [];
    const rhythmLines = Array.isArray(body.rhythmLines) ? body.rhythmLines.slice(0, 500) : [];
    const combinedLines = Array.isArray(body.combinedLines) ? body.combinedLines.slice(0, 500) : [];
    if (!chordLines.length) {
      res.status(400).json({ error: "No chord lines supplied" });
      return;
    }

    const endpoints = buildEndpointCandidates(process.env.MIMO_BASE_URL, process.env.MIMO_MESSAGES_URL);
    const model = process.env.MIMO_MODEL || DEFAULT_MODEL;
    const prompt = [
      "You are refining an automatic chord-recognition result for a Sky: Children of the Light 15-button piano sheet maker.",
      "Keep output compact and deterministic.",
      "Merge repeated adjacent chords if the chord name and Sky buttons are the same.",
      "Use melody/rhythm/combined context only to avoid obviously wrong harmonic changes.",
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
      chordLines.join("\n"),
      melodyLines.length ? "\nDetected melody context:" : "",
      melodyLines.join("\n"),
      rhythmLines.length ? "\nDetected rhythm context:" : "",
      rhythmLines.join("\n"),
      combinedLines.length ? "\nCombined Sky sketch context:" : "",
      combinedLines.join("\n")
    ].join("\n");

    const attempted = [];
    let result = null;
    for (const endpoint of endpoints) {
      result = await callMimoEndpoint(endpoint, apiKey, model, prompt);
      attempted.push(endpoint);
      if (result.ok || result.status !== 404) break;
    }

    if (!result || !result.ok) {
      res.status(result ? result.status : 502).json({
        error: `MiMo API error: ${sanitizeErrorText(result ? result.rawText || result.statusText : "No response")}`,
        attemptedEndpoints: attempted
      });
      return;
    }

    const refinedText = extractText(result.payload);
    res.status(200).json({
      refinedText,
      model,
      endpoint: result.endpoint
    });
  } catch (error) {
    res.status(500).json({
      error: sanitizeErrorText(error && error.message ? error.message : "MiMo request failed")
    });
  }
};
