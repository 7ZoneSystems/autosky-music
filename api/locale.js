"use strict";

function firstHeader(headers, name) {
  const value = headers && headers[name.toLowerCase()];
  if (Array.isArray(value)) return value[0] || "";
  return String(value || "").split(",")[0].trim();
}

function decodeHeader(value) {
  if (!value) return "";
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

module.exports = async function handler(req, res) {
  if (req.method && req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const headers = req.headers || {};
  const country = firstHeader(headers, "x-vercel-ip-country").toUpperCase();
  const region = firstHeader(headers, "x-vercel-ip-country-region");
  const city = decodeHeader(firstHeader(headers, "x-vercel-ip-city"));
  const acceptLanguage = firstHeader(headers, "accept-language");

  res.status(200).json({
    country,
    region,
    city,
    acceptLanguage,
    provider: country ? "vercel-geo" : "local-browser-fallback"
  });
};
