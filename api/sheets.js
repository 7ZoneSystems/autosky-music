"use strict";

const crypto = require("crypto");
const {
  getApplicationKey,
  getAuthUser,
  getCohesivityOrigin,
  sendJson
} = require("./auth-utils");

let edgeTokenCache = null;
let schemaReady = null;

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
      if (data.length > 2_500_000) {
        reject(new Error("Request body is too large"));
        req.destroy();
      }
    });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

async function readJson(req) {
  const text = await readBody(req);
  if (!text.trim()) return {};
  return JSON.parse(text);
}

function userKey(user) {
  return String(user && user.id ? user.id : user && user.email ? user.email : "");
}

function cleanSheetId(id) {
  const value = String(id || "").trim();
  return /^[a-zA-Z0-9_-]{8,80}$/.test(value) ? value : "";
}

function compactTitle(title) {
  const value = String(title || "Untitled Sky Sheet").replace(/\s+/g, " ").trim();
  return value.slice(0, 160) || "Untitled Sky Sheet";
}

function safeInteger(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.round(number) : fallback;
}

async function getEdgeToken() {
  const appKey = getApplicationKey();
  if (!appKey) throw new Error("COHESIVITY_APPLICATION_KEY is not configured");

  const now = Date.now();
  if (edgeTokenCache && edgeTokenCache.expiresAt > now + 5000) return edgeTokenCache.token;

  const response = await fetch(`${getCohesivityOrigin()}/edge/session?key=${encodeURIComponent(appKey)}`, {
    method: "POST"
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.token) {
    throw new Error(data.error || "Could not create Cohesivity database session");
  }

  edgeTokenCache = {
    token: data.token,
    expiresAt: now + Math.max(10, Number(data.expires_in) || 60) * 1000
  };
  return edgeTokenCache.token;
}

async function dbQuery(query, params = []) {
  const token = await getEdgeToken();
  const response = await fetch(`${getCohesivityOrigin()}/edge/database`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ query, params })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "Cohesivity database query failed");
  }
  return data;
}

function ensureSchema() {
  if (!schemaReady) {
    schemaReady = dbQuery(`
      CREATE TABLE IF NOT EXISTS sky_user_sheets (
        id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        title TEXT NOT NULL,
        key_id TEXT NOT NULL,
        bpm INTEGER NOT NULL,
        event_count INTEGER NOT NULL,
        payload TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        PRIMARY KEY (user_id, id)
      );
      CREATE INDEX IF NOT EXISTS idx_sky_user_sheets_user_updated
        ON sky_user_sheets (user_id, updated_at DESC);
    `).catch((error) => {
      schemaReady = null;
      throw error;
    });
  }
  return schemaReady;
}

async function listSheets(userId) {
  await ensureSchema();
  const result = await dbQuery(
    `SELECT id, title, key_id AS keyId, bpm, event_count AS eventCount, created_at AS createdAt, updated_at AS updatedAt
       FROM sky_user_sheets
      WHERE user_id = ?
      ORDER BY updated_at DESC
      LIMIT 100`,
    [userId]
  );
  return result.rows || [];
}

async function getSheet(userId, id) {
  await ensureSchema();
  const result = await dbQuery(
    `SELECT id, title, key_id AS keyId, bpm, event_count AS eventCount, payload, created_at AS createdAt, updated_at AS updatedAt
       FROM sky_user_sheets
      WHERE user_id = ? AND id = ?
      LIMIT 1`,
    [userId, id]
  );
  const row = result.rows && result.rows[0];
  if (!row) return null;
  return {
    ...row,
    payload: JSON.parse(row.payload)
  };
}

async function saveSheet(userId, body) {
  await ensureSchema();
  const payload = body && body.payload && typeof body.payload === "object" ? body.payload : {};
  const id = cleanSheetId(body && body.id) || crypto.randomUUID();
  const title = compactTitle(payload.title);
  const keyId = String(payload.keyId || "C").slice(0, 16);
  const bpm = safeInteger(payload.bpm, 96);
  const eventCount = Array.isArray(payload.events) ? payload.events.length : 0;
  const serialized = JSON.stringify(payload);
  const now = new Date().toISOString();

  if (serialized.length > 1_500_000) {
    throw new Error("Sheet is too large for cloud save");
  }

  const result = await dbQuery(
    `INSERT INTO sky_user_sheets
      (id, user_id, title, key_id, bpm, event_count, payload, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(user_id, id) DO UPDATE SET
       title = excluded.title,
       key_id = excluded.key_id,
       bpm = excluded.bpm,
       event_count = excluded.event_count,
       payload = excluded.payload,
       updated_at = excluded.updated_at
     RETURNING id, title, key_id AS keyId, bpm, event_count AS eventCount, created_at AS createdAt, updated_at AS updatedAt`,
    [id, userId, title, keyId, bpm, eventCount, serialized, now, now]
  );
  return result.rows && result.rows[0]
    ? result.rows[0]
    : { id, title, keyId, bpm, eventCount, createdAt: now, updatedAt: now };
}

async function deleteSheet(userId, id) {
  await ensureSchema();
  await dbQuery(
    "DELETE FROM sky_user_sheets WHERE user_id = ? AND id = ?",
    [userId, id]
  );
}

module.exports = async function sheets(req, res) {
  const session = await getAuthUser(req, res);
  if (!session.configured) {
    sendJson(res, 503, { error: "Cohesivity auth is not configured" });
    return;
  }
  if (!session.user) {
    sendJson(res, 401, { error: "Sign in to use cloud saves" });
    return;
  }

  const userId = userKey(session.user);
  if (!userId) {
    sendJson(res, 401, { error: "Signed-in user has no stable id" });
    return;
  }

  try {
    if (req.method === "GET") {
      const url = new URL(req.url || "/", "http://localhost");
      const id = cleanSheetId(url.searchParams.get("id"));
      if (id) {
        const sheet = await getSheet(userId, id);
        if (!sheet) {
          sendJson(res, 404, { error: "Sheet not found" });
          return;
        }
        sendJson(res, 200, { sheet });
        return;
      }
      sendJson(res, 200, { sheets: await listSheets(userId) });
      return;
    }

    if (req.method === "POST") {
      const body = await readJson(req);
      const sheet = await saveSheet(userId, body);
      sendJson(res, 200, { sheet });
      return;
    }

    if (req.method === "DELETE") {
      const url = new URL(req.url || "/", "http://localhost");
      const body = await readJson(req).catch(() => ({}));
      const id = cleanSheetId(url.searchParams.get("id") || body.id);
      if (!id) {
        sendJson(res, 400, { error: "Missing sheet id" });
        return;
      }
      await deleteSheet(userId, id);
      sendJson(res, 200, { ok: true });
      return;
    }

    sendJson(res, 405, { error: "Method not allowed" });
  } catch (error) {
    sendJson(res, 500, { error: error && error.message ? error.message : "Cloud save failed" });
  }
};
