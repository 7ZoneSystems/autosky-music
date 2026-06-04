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

function cleanId(id) {
  const value = String(id || "").trim();
  return /^[a-zA-Z0-9_-]{8,80}$/.test(value) ? value : "";
}

function compactText(value, fallback, limit) {
  const text = String(value || fallback).replace(/\s+/g, " ").trim();
  return (text || fallback).slice(0, limit);
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
      CREATE TABLE IF NOT EXISTS sky_marketplace_sheets (
        id TEXT PRIMARY KEY,
        owner_id TEXT NOT NULL,
        owner_name TEXT NOT NULL,
        owner_picture TEXT,
        source_sheet_id TEXT NOT NULL,
        title TEXT NOT NULL,
        key_id TEXT NOT NULL,
        bpm INTEGER NOT NULL,
        event_count INTEGER NOT NULL,
        payload TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        published_at TEXT NOT NULL,
        UNIQUE (owner_id, source_sheet_id)
      );
      CREATE TABLE IF NOT EXISTS sky_marketplace_ratings (
        marketplace_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        rating INTEGER NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        PRIMARY KEY (marketplace_id, user_id)
      );
      CREATE INDEX IF NOT EXISTS idx_sky_marketplace_title
        ON sky_marketplace_sheets (title);
      CREATE INDEX IF NOT EXISTS idx_sky_marketplace_published
        ON sky_marketplace_sheets (published_at DESC);
      CREATE INDEX IF NOT EXISTS idx_sky_marketplace_ratings_sheet
        ON sky_marketplace_ratings (marketplace_id);
    `).catch((error) => {
      schemaReady = null;
      throw error;
    });
  }
  return schemaReady;
}

function marketplaceSelectSql(whereSql = "") {
  return `
    SELECT
      m.id,
      m.title,
      m.key_id AS keyId,
      m.bpm,
      m.event_count AS eventCount,
      m.owner_name AS ownerName,
      m.owner_picture AS ownerPicture,
      m.published_at AS publishedAt,
      m.updated_at AS updatedAt,
      COALESCE(ROUND(AVG(r.rating), 2), 0) AS averageRating,
      COUNT(r.rating) AS ratingCount,
      MAX(CASE WHEN r.user_id = ? THEN r.rating ELSE NULL END) AS myRating
    FROM sky_marketplace_sheets m
    LEFT JOIN sky_marketplace_ratings r ON r.marketplace_id = m.id
    ${whereSql}
    GROUP BY m.id
  `;
}

async function listMarketplace(viewerId, search) {
  await ensureSchema();
  const trimmedSearch = compactText(search || "", "", 120);
  const whereSql = trimmedSearch ? "WHERE LOWER(m.title) LIKE LOWER(?)" : "";
  const params = trimmedSearch ? [viewerId || "", `%${trimmedSearch}%`] : [viewerId || ""];
  const result = await dbQuery(
    `${marketplaceSelectSql(whereSql)}
      ORDER BY averageRating DESC, ratingCount DESC, m.published_at DESC
      LIMIT 100`,
    params
  );
  return result.rows || [];
}

async function getMarketplaceSheet(viewerId, id) {
  await ensureSchema();
  const result = await dbQuery(
    `SELECT
        m.id,
        m.title,
        m.key_id AS keyId,
        m.bpm,
        m.event_count AS eventCount,
        m.owner_name AS ownerName,
        m.owner_picture AS ownerPicture,
        m.published_at AS publishedAt,
        m.updated_at AS updatedAt,
        m.payload,
        COALESCE(ROUND(AVG(r.rating), 2), 0) AS averageRating,
        COUNT(r.rating) AS ratingCount,
        MAX(CASE WHEN r.user_id = ? THEN r.rating ELSE NULL END) AS myRating
       FROM sky_marketplace_sheets m
       LEFT JOIN sky_marketplace_ratings r ON r.marketplace_id = m.id
      WHERE m.id = ?
      GROUP BY m.id
      LIMIT 1`,
    [viewerId || "", id]
  );

  const row = result.rows && result.rows[0];
  if (!row) return null;
  return {
    id: row.id,
    title: row.title,
    keyId: row.keyId || row.key_id,
    bpm: row.bpm,
    eventCount: row.eventCount || row.event_count,
    ownerName: row.ownerName || row.owner_name,
    ownerPicture: row.ownerPicture || row.owner_picture,
    publishedAt: row.publishedAt || row.published_at,
    updatedAt: row.updatedAt || row.updated_at,
    averageRating: row.averageRating || 0,
    ratingCount: row.ratingCount || 0,
    myRating: row.myRating || null,
    payload: JSON.parse(row.payload)
  };
}

async function publishSavedSheet(user, body) {
  await ensureSchema();
  const userId = userKey(user);
  const sheetId = cleanId(body && body.sheetId);
  if (!sheetId) throw new Error("Missing saved sheet id");

  const saved = await dbQuery(
    `SELECT id, title, key_id AS keyId, bpm, event_count AS eventCount, payload, created_at AS createdAt, updated_at AS updatedAt
       FROM sky_user_sheets
      WHERE user_id = ? AND id = ?
      LIMIT 1`,
    [userId, sheetId]
  );
  const row = saved.rows && saved.rows[0];
  if (!row) throw new Error("Saved sheet not found");

  const payload = JSON.parse(row.payload);
  const now = new Date().toISOString();
  const ownerName = compactText(user.name || user.email || "Sky creator", "Sky creator", 120);
  const ownerPicture = compactText(user.picture || "", "", 600);
  const title = compactText(payload.title || row.title, "Untitled Sky Sheet", 160);
  const keyId = compactText(payload.keyId || row.keyId || "C", "C", 16);
  const bpm = safeInteger(payload.bpm || row.bpm, 96);
  const eventCount = Array.isArray(payload.events) ? payload.events.length : safeInteger(row.eventCount, 0);
  const marketplaceId = crypto.randomUUID();

  const result = await dbQuery(
    `INSERT INTO sky_marketplace_sheets
      (id, owner_id, owner_name, owner_picture, source_sheet_id, title, key_id, bpm, event_count, payload, created_at, updated_at, published_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(owner_id, source_sheet_id) DO UPDATE SET
       owner_name = excluded.owner_name,
       owner_picture = excluded.owner_picture,
       title = excluded.title,
       key_id = excluded.key_id,
       bpm = excluded.bpm,
       event_count = excluded.event_count,
       payload = excluded.payload,
       updated_at = excluded.updated_at
     RETURNING id, title, key_id AS keyId, bpm, event_count AS eventCount, owner_name AS ownerName,
               owner_picture AS ownerPicture, published_at AS publishedAt, updated_at AS updatedAt`,
    [marketplaceId, userId, ownerName, ownerPicture, sheetId, title, keyId, bpm, eventCount, JSON.stringify(payload), now, now, now]
  );
  return result.rows && result.rows[0] ? result.rows[0] : { id: marketplaceId, title, keyId, bpm, eventCount, ownerName, ownerPicture, publishedAt: now, updatedAt: now };
}

async function rateMarketplaceSheet(user, body) {
  await ensureSchema();
  const userId = userKey(user);
  const marketplaceId = cleanId(body && body.marketplaceId);
  const rating = Math.max(1, Math.min(5, safeInteger(body && body.rating, 0)));
  if (!marketplaceId || !rating) throw new Error("Missing rating target");

  const owner = await dbQuery(
    "SELECT owner_id AS ownerId FROM sky_marketplace_sheets WHERE id = ? LIMIT 1",
    [marketplaceId]
  );
  const ownerRow = owner.rows && owner.rows[0];
  if (!ownerRow) throw new Error("Marketplace sheet not found");
  if (String(ownerRow.ownerId || ownerRow.owner_id) === userId) {
    throw new Error("You cannot rate your own sheet");
  }

  const now = new Date().toISOString();
  await dbQuery(
    `INSERT INTO sky_marketplace_ratings (marketplace_id, user_id, rating, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?)
     ON CONFLICT(marketplace_id, user_id) DO UPDATE SET
       rating = excluded.rating,
       updated_at = excluded.updated_at`,
    [marketplaceId, userId, rating, now, now]
  );
  return getMarketplaceSheet(userId, marketplaceId);
}

module.exports = async function marketplace(req, res) {
  const session = await getAuthUser(req, res);
  const user = session.user || null;
  const viewerId = userKey(user);

  try {
    if (req.method === "GET") {
      const url = new URL(req.url || "/", "http://localhost");
      const id = cleanId(url.searchParams.get("id"));
      if (id) {
        const sheet = await getMarketplaceSheet(viewerId, id);
        if (!sheet) {
          sendJson(res, 404, { error: "Marketplace sheet not found" });
          return;
        }
        sendJson(res, 200, { sheet });
        return;
      }
      const sheets = await listMarketplace(viewerId, url.searchParams.get("search") || "");
      sendJson(res, 200, { sheets });
      return;
    }

    if (req.method !== "POST") {
      sendJson(res, 405, { error: "Method not allowed" });
      return;
    }

    if (!user) {
      sendJson(res, 401, { error: "Sign in to publish or rate marketplace sheets" });
      return;
    }

    const body = await readJson(req);
    if (body.action === "publish") {
      sendJson(res, 200, { sheet: await publishSavedSheet(user, body) });
      return;
    }

    if (body.action === "rate") {
      sendJson(res, 200, { sheet: await rateMarketplaceSheet(user, body) });
      return;
    }

    sendJson(res, 400, { error: "Unknown marketplace action" });
  } catch (error) {
    sendJson(res, 500, { error: error && error.message ? error.message : "Marketplace request failed" });
  }
};
