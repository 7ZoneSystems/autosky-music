"use strict";

const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.join(__dirname, "..");
const COHESIVITY_ORIGIN = "https://cohesivity.ai";
const ACCESS_COOKIE = "access_token";
const REFRESH_COOKIE = "refresh_token";

function parseKeyValueFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const text = fs.readFileSync(filePath, "utf8");
  return Object.fromEntries(
    text
      .split(/\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#") && line.includes("="))
      .map((line) => {
        const separator = line.indexOf("=");
        return [line.slice(0, separator).trim(), line.slice(separator + 1).trim()];
      })
  );
}

const localEnv = {
  ...parseKeyValueFile(path.join(ROOT_DIR, ".env")),
  ...parseKeyValueFile(path.join(ROOT_DIR, ".cohesivity"))
};

Object.entries(localEnv).forEach(([key, value]) => {
  if (process.env[key] === undefined) process.env[key] = value;
});

function getTenantId() {
  return (
    process.env.COHESIVITY_TENANT_ID ||
    process.env.COH_TENANT_ID ||
    process.env.tenant_id ||
    localEnv.tenant_id ||
    ""
  ).trim();
}

function getApplicationKey() {
  return (
    process.env.COHESIVITY_APPLICATION_KEY ||
    process.env.COH_APPLICATION_KEY ||
    process.env.coh_application_key ||
    localEnv.coh_application_key ||
    ""
  ).trim();
}

function getCohesivityOrigin() {
  return (process.env.COHESIVITY_ORIGIN || COHESIVITY_ORIGIN).replace(/\/+$/, "");
}

function firstHeaderValue(value) {
  if (Array.isArray(value)) return value[0] || "";
  return String(value || "").split(",")[0].trim();
}

function isLocalHost(host) {
  return /^localhost(?::\d+)?$/.test(host) || /^127\.0\.0\.1(?::\d+)?$/.test(host);
}

function getRequestOrigin(req) {
  const headers = req.headers || {};
  const host = firstHeaderValue(headers["x-forwarded-host"] || headers.host || `localhost:${process.env.PORT || 5173}`);
  const forwardedProto = firstHeaderValue(headers["x-forwarded-proto"]);
  const protocol = forwardedProto || (isLocalHost(host) ? "http" : "https");
  return `${protocol}://${host}`;
}

function isSecureRequest(req) {
  const origin = getRequestOrigin(req);
  return origin.startsWith("https://");
}

function safeReturnTo(value) {
  if (!value || typeof value !== "string") return "/";
  if (!value.startsWith("/") || value.startsWith("//") || value.includes("\\")) return "/";
  return value;
}

function getUrl(req) {
  return new URL(req.url || "/", getRequestOrigin(req));
}

function parseCookies(req) {
  const header = req.headers && req.headers.cookie ? req.headers.cookie : "";
  return Object.fromEntries(
    header
      .split(";")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => {
        const separator = item.indexOf("=");
        const name = separator >= 0 ? item.slice(0, separator) : item;
        const rawValue = separator >= 0 ? item.slice(separator + 1) : "";
        try {
          return [name, decodeURIComponent(rawValue)];
        } catch {
          return [name, rawValue];
        }
      })
  );
}

function makeCookie(name, value, req, options = {}) {
  const parts = [
    `${name}=${encodeURIComponent(value || "")}`,
    "Path=/",
    `Max-Age=${Math.max(0, Number(options.maxAge) || 0)}`,
    "SameSite=Lax",
    "HttpOnly"
  ];
  if (isSecureRequest(req)) parts.push("Secure");
  return parts.join("; ");
}

function appendSetCookie(res, cookies) {
  const next = cookies.filter(Boolean);
  if (!next.length) return;
  const existing = typeof res.getHeader === "function" ? res.getHeader("Set-Cookie") : undefined;
  const merged = existing ? (Array.isArray(existing) ? existing.concat(next) : [existing].concat(next)) : next;
  res.setHeader("Set-Cookie", merged);
}

function setAuthCookies(res, req, tokens) {
  appendSetCookie(res, [
    makeCookie(ACCESS_COOKIE, tokens.access_token, req, { maxAge: 3600 }),
    makeCookie(REFRESH_COOKIE, tokens.refresh_token || "", req, { maxAge: 30 * 86400 })
  ]);
}

function clearAuthCookies(res, req) {
  appendSetCookie(res, [
    makeCookie(ACCESS_COOKIE, "", req, { maxAge: 0 }),
    makeCookie(REFRESH_COOKIE, "", req, { maxAge: 0 })
  ]);
}

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

function redirect(res, location, statusCode = 302) {
  res.statusCode = statusCode;
  res.setHeader("Location", location);
  res.end();
}

async function postCohesivity(pathname, body) {
  const response = await fetch(`${getCohesivityOrigin()}${pathname}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const text = await response.text();
  let data = {};
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { error: text };
    }
  }
  return { ok: response.ok, status: response.status, data };
}

async function verifyAccessToken(tenantId, accessToken) {
  if (!tenantId || !accessToken) return { valid: false };
  const result = await postCohesivity(`/edge/auth/${tenantId}/verify`, { access_token: accessToken });
  if (!result.ok) return { valid: false, status: result.status };
  return result.data || { valid: false };
}

async function refreshTokens(tenantId, refreshToken) {
  if (!tenantId || !refreshToken) return null;
  const result = await postCohesivity(`/edge/auth/${tenantId}/refresh`, { refresh_token: refreshToken });
  if (!result.ok || !result.data || !result.data.access_token) return null;
  return result.data;
}

async function logoutRefreshToken(tenantId, refreshToken) {
  if (!tenantId || !refreshToken) return;
  try {
    await postCohesivity(`/edge/auth/${tenantId}/logout`, { refresh_token: refreshToken });
  } catch {
    // Clearing local cookies is still correct if the remote logout call is unavailable.
  }
}

async function getAuthUser(req, res) {
  const tenantId = getTenantId();
  if (!tenantId) return { configured: false, user: null };

  const cookies = parseCookies(req);
  const accessToken = cookies[ACCESS_COOKIE];
  const refreshToken = cookies[REFRESH_COOKIE];
  if (!accessToken && !refreshToken) return { configured: true, user: null };

  try {
    const verified = await verifyAccessToken(tenantId, accessToken);
    if (verified.valid && verified.user) {
      return { configured: true, user: verified.user };
    }

    const refreshed = await refreshTokens(tenantId, refreshToken);
    if (!refreshed) {
      clearAuthCookies(res, req);
      return { configured: true, user: null };
    }

    const reverified = await verifyAccessToken(tenantId, refreshed.access_token);
    if (reverified.valid && reverified.user) {
      setAuthCookies(res, req, refreshed);
      return { configured: true, user: reverified.user };
    }

    clearAuthCookies(res, req);
    return { configured: true, user: null };
  } catch (error) {
    return {
      configured: true,
      user: null,
      error: error && error.message ? error.message : "Auth verification failed"
    };
  }
}

module.exports = {
  ACCESS_COOKIE,
  REFRESH_COOKIE,
  clearAuthCookies,
  getApplicationKey,
  getAuthUser,
  getCohesivityOrigin,
  getRequestOrigin,
  getTenantId,
  getUrl,
  logoutRefreshToken,
  parseCookies,
  redirect,
  safeReturnTo,
  sendJson,
  setAuthCookies
};
