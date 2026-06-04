"use strict";

const crypto = require("crypto");
const {
  getApplicationKey,
  getAuthUser,
  getCohesivityOrigin,
  getRequestOrigin,
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

function remoteErrorText(value, fallback) {
  if (!value) return fallback;
  if (typeof value === "string") return value;
  if (value.message) return String(value.message);
  try {
    return JSON.stringify(value);
  } catch {
    return fallback;
  }
}

function marketplaceError(message, statusCode = 400, extra = {}) {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.extra = extra;
  return error;
}

function stableNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? Number(number.toFixed(3)) : fallback;
}

function normalizedEvent(event) {
  if (!event || typeof event !== "object") return null;
  if (event.type === "note") {
    return {
      type: "note",
      notes: Array.isArray(event.notes)
        ? event.notes.map((note) => safeInteger(note, 0)).filter(Boolean).sort((a, b) => a - b)
        : [],
      duration: stableNumber(event.duration, 1),
      time: Number.isFinite(Number(event.time)) ? stableNumber(event.time) : null
    };
  }
  if (event.type === "rest") {
    return {
      type: "rest",
      duration: stableNumber(event.duration, 1),
      time: Number.isFinite(Number(event.time)) ? stableNumber(event.time) : null
    };
  }
  if (event.type === "bar" || event.type === "line") {
    return { type: event.type };
  }
  return {
    type: compactText(event.type || "event", "event", 24),
    duration: stableNumber(event.duration, 0),
    time: Number.isFinite(Number(event.time)) ? stableNumber(event.time) : null
  };
}

function sheetHashForPayload(payload, fallbackKeyId, fallbackBpm) {
  const events = Array.isArray(payload && payload.events)
    ? payload.events.map(normalizedEvent).filter(Boolean)
    : [];
  const identity = {
    keyId: compactText(payload && payload.keyId || fallbackKeyId || "C", "C", 16),
    bpm: safeInteger(payload && payload.bpm || fallbackBpm, 96),
    duration: stableNumber(payload && payload.duration, 0),
    events
  };
  return crypto.createHash("sha256").update(JSON.stringify(identity)).digest("hex");
}

function marketplaceLink(req, id) {
  const url = new URL("/", getRequestOrigin(req));
  url.searchParams.set("marketplace", id);
  return url.toString();
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
    throw new Error(remoteErrorText(data.error, "Could not create Cohesivity database session"));
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
    throw new Error(remoteErrorText(data.error, "Cohesivity database query failed"));
  }
  return data;
}

async function addMarketplaceColumn(columnSql) {
  try {
    await dbQuery(`ALTER TABLE sky_marketplace_sheets ADD COLUMN ${columnSql}`);
  } catch (error) {
    const message = String(error && error.message || "").toLowerCase();
    if (!message.includes("duplicate") && !message.includes("exists")) throw error;
  }
}

async function cleanupExpiredMarketplaceDeletes() {
  const now = new Date().toISOString();
  await dbQuery(
    `DELETE FROM sky_marketplace_ratings
      WHERE marketplace_id IN (
        SELECT id FROM sky_marketplace_sheets
         WHERE delete_after_at IS NOT NULL AND delete_after_at <= ?
      )`,
    [now]
  );
  await dbQuery(
    `DELETE FROM sky_marketplace_sheets
      WHERE delete_after_at IS NOT NULL AND delete_after_at <= ?`,
    [now]
  );
}

async function backfillSheetHashes() {
  for (let pass = 0; pass < 20; pass += 1) {
    const result = await dbQuery(
      `SELECT id, key_id AS keyId, bpm, payload
         FROM sky_marketplace_sheets
        WHERE sheet_hash IS NULL OR sheet_hash = ''
        LIMIT 200`
    );
    const rows = result.rows || [];
    if (!rows.length) break;
    for (const row of rows) {
      let payload = {};
      try {
        payload = JSON.parse(row.payload || "{}");
      } catch {
        payload = {};
      }
      await dbQuery(
        "UPDATE sky_marketplace_sheets SET sheet_hash = ? WHERE id = ?",
        [sheetHashForPayload(payload, row.keyId || row.key_id, row.bpm), row.id]
      );
    }
  }
}

function ensureSchema() {
  if (!schemaReady) {
    schemaReady = (async () => {
      await dbQuery(`
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
        sheet_hash TEXT,
        payload TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        published_at TEXT NOT NULL,
        delete_requested_at TEXT,
        delete_after_at TEXT,
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
    `);
      await addMarketplaceColumn("sheet_hash TEXT");
      await addMarketplaceColumn("delete_requested_at TEXT");
      await addMarketplaceColumn("delete_after_at TEXT");
      await dbQuery(`
        CREATE INDEX IF NOT EXISTS idx_sky_marketplace_hash
          ON sky_marketplace_sheets (sheet_hash);
        CREATE INDEX IF NOT EXISTS idx_sky_marketplace_delete_after
          ON sky_marketplace_sheets (delete_after_at);
      `);
      await backfillSheetHashes();
      await cleanupExpiredMarketplaceDeletes();
    })().catch((error) => {
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
      CASE WHEN m.owner_id = ? THEN 1 ELSE 0 END AS isOwner,
      CASE WHEN m.owner_id = ? THEN m.source_sheet_id ELSE NULL END AS sourceSheetId,
      m.published_at AS publishedAt,
      m.updated_at AS updatedAt,
      m.delete_requested_at AS deleteRequestedAt,
      m.delete_after_at AS deleteAfterAt,
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
  await cleanupExpiredMarketplaceDeletes();
  const trimmedSearch = compactText(search || "", "", 120);
  const whereSql = trimmedSearch ? "WHERE LOWER(m.title) LIKE LOWER(?)" : "";
  const params = trimmedSearch
    ? [viewerId || "", viewerId || "", viewerId || "", `%${trimmedSearch}%`]
    : [viewerId || "", viewerId || "", viewerId || ""];
  const result = await dbQuery(
    `${marketplaceSelectSql(whereSql)}
      ORDER BY averageRating DESC, ratingCount DESC, m.published_at DESC
      LIMIT 100`,
    params
  );
  return (result.rows || []).map((row) => normalizeMarketplaceRow(row));
}

async function getMarketplaceSheet(viewerId, id) {
  await ensureSchema();
  await cleanupExpiredMarketplaceDeletes();
  const result = await dbQuery(
    `SELECT
        m.id,
        m.title,
        m.key_id AS keyId,
        m.bpm,
        m.event_count AS eventCount,
        m.owner_name AS ownerName,
        m.owner_picture AS ownerPicture,
        CASE WHEN m.owner_id = ? THEN 1 ELSE 0 END AS isOwner,
        CASE WHEN m.owner_id = ? THEN m.source_sheet_id ELSE NULL END AS sourceSheetId,
        m.published_at AS publishedAt,
        m.updated_at AS updatedAt,
        m.delete_requested_at AS deleteRequestedAt,
        m.delete_after_at AS deleteAfterAt,
        m.payload,
        COALESCE(ROUND(AVG(r.rating), 2), 0) AS averageRating,
        COUNT(r.rating) AS ratingCount,
        MAX(CASE WHEN r.user_id = ? THEN r.rating ELSE NULL END) AS myRating
       FROM sky_marketplace_sheets m
       LEFT JOIN sky_marketplace_ratings r ON r.marketplace_id = m.id
      WHERE m.id = ?
      GROUP BY m.id
      LIMIT 1`,
    [viewerId || "", viewerId || "", viewerId || "", id]
  );

  const row = result.rows && result.rows[0];
  if (!row) return null;
  return normalizeMarketplaceRow(row, true);
}

function normalizeMarketplaceRow(row, includePayload = false) {
  const normalized = {
    id: row.id,
    title: row.title,
    keyId: row.keyId || row.key_id,
    bpm: row.bpm ?? row.BPM,
    eventCount: row.eventCount ?? row.event_count ?? 0,
    ownerName: row.ownerName || row.owner_name,
    ownerPicture: row.ownerPicture || row.owner_picture,
    isOwner: Boolean(row.isOwner || row.is_owner),
    sourceSheetId: row.sourceSheetId || row.source_sheet_id || null,
    publishedAt: row.publishedAt || row.published_at,
    updatedAt: row.updatedAt || row.updated_at,
    deleteRequestedAt: row.deleteRequestedAt || row.delete_requested_at || null,
    deleteAfterAt: row.deleteAfterAt || row.delete_after_at || null,
    averageRating: row.averageRating ?? row.average_rating ?? 0,
    ratingCount: row.ratingCount ?? row.rating_count ?? 0,
    myRating: row.myRating || null
  };
  if (includePayload) normalized.payload = JSON.parse(row.payload);
  return normalized;
}

async function readSavedSheetRecord(userId, sheetId) {
  const saved = await dbQuery(
    `SELECT id, title, key_id AS keyId, bpm, event_count AS eventCount, payload, created_at AS createdAt, updated_at AS updatedAt
       FROM sky_user_sheets
      WHERE user_id = ? AND id = ?
      LIMIT 1`,
    [userId, sheetId]
  );
  const row = saved.rows && saved.rows[0];
  if (!row) throw marketplaceError("Saved sheet not found", 404);
  return row;
}

function buildMarketplaceRecord(user, row) {
  const payload = JSON.parse(row.payload);
  const ownerName = compactText(user.name || user.email || "Sky creator", "Sky creator", 120);
  const ownerPicture = compactText(user.picture || "", "", 600);
  const title = compactText(payload.title || row.title, "Untitled Sky Sheet", 160);
  const keyId = compactText(payload.keyId || row.keyId || "C", "C", 16);
  const bpm = safeInteger(payload.bpm || row.bpm, 96);
  const eventCount = Array.isArray(payload.events) ? payload.events.length : safeInteger(row.eventCount, 0);
  return {
    payload,
    title,
    keyId,
    bpm,
    eventCount,
    ownerName,
    ownerPicture,
    sheetHash: sheetHashForPayload(payload, keyId, bpm)
  };
}

async function findDuplicateSheet(sheetHash, exceptId = "") {
  if (!sheetHash) return null;
  const result = await dbQuery(
    `SELECT id, title, owner_name AS ownerName, delete_after_at AS deleteAfterAt
       FROM sky_marketplace_sheets
      WHERE sheet_hash = ? AND (? = '' OR id <> ?)
      ORDER BY published_at DESC
      LIMIT 1`,
    [sheetHash, exceptId || "", exceptId || ""]
  );
  return result.rows && result.rows[0] ? result.rows[0] : null;
}

async function rejectDuplicateIfNeeded(req, sheetHash, exceptId) {
  const duplicate = await findDuplicateSheet(sheetHash, exceptId);
  if (!duplicate) return;
  throw marketplaceError("same sheet exists", 409, {
    duplicate: {
      id: duplicate.id,
      title: duplicate.title || "Marketplace sheet",
      url: marketplaceLink(req, duplicate.id),
      deleteAfterAt: duplicate.deleteAfterAt || duplicate.delete_after_at || null
    }
  });
}

async function findOwnMarketplaceBySource(userId, sheetId) {
  const existing = await dbQuery(
    `SELECT id FROM sky_marketplace_sheets
      WHERE owner_id = ? AND source_sheet_id = ?
      LIMIT 1`,
    [userId, sheetId]
  );
  return existing.rows && existing.rows[0] ? existing.rows[0].id : "";
}

async function publishSavedSheet(req, user, body) {
  await ensureSchema();
  const userId = userKey(user);
  const sheetId = cleanId(body && body.sheetId);
  if (!sheetId) throw marketplaceError("Missing saved sheet id", 400);

  const row = await readSavedSheetRecord(userId, sheetId);
  const record = buildMarketplaceRecord(user, row);
  const existingMarketplaceId = await findOwnMarketplaceBySource(userId, sheetId);
  await rejectDuplicateIfNeeded(req, record.sheetHash, existingMarketplaceId);
  const now = new Date().toISOString();
  const marketplaceId = crypto.randomUUID();

  const result = await dbQuery(
    `INSERT INTO sky_marketplace_sheets
      (id, owner_id, owner_name, owner_picture, source_sheet_id, title, key_id, bpm, event_count, sheet_hash, payload, created_at, updated_at, published_at, delete_requested_at, delete_after_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL, NULL)
     ON CONFLICT(owner_id, source_sheet_id) DO UPDATE SET
       owner_name = excluded.owner_name,
       owner_picture = excluded.owner_picture,
       title = excluded.title,
       key_id = excluded.key_id,
       bpm = excluded.bpm,
       event_count = excluded.event_count,
       sheet_hash = excluded.sheet_hash,
       payload = excluded.payload,
       updated_at = excluded.updated_at,
       delete_requested_at = NULL,
       delete_after_at = NULL
     RETURNING id, title, key_id AS keyId, bpm, event_count AS eventCount, owner_name AS ownerName,
               owner_picture AS ownerPicture, source_sheet_id AS sourceSheetId, published_at AS publishedAt, updated_at AS updatedAt,
               delete_requested_at AS deleteRequestedAt, delete_after_at AS deleteAfterAt`,
    [marketplaceId, userId, record.ownerName, record.ownerPicture, sheetId, record.title, record.keyId, record.bpm, record.eventCount, record.sheetHash, JSON.stringify(record.payload), now, now, now]
  );
  const rowOut = result.rows && result.rows[0]
    ? result.rows[0]
    : { id: existingMarketplaceId || marketplaceId, title: record.title, keyId: record.keyId, bpm: record.bpm, eventCount: record.eventCount, ownerName: record.ownerName, ownerPicture: record.ownerPicture, sourceSheetId: sheetId, publishedAt: now, updatedAt: now };
  return {
    action: existingMarketplaceId ? "updated" : "published",
    sheet: normalizeMarketplaceRow({ ...rowOut, isOwner: 1 })
  };
}

async function updateMarketplaceSheet(req, user, body) {
  await ensureSchema();
  const userId = userKey(user);
  const marketplaceId = cleanId(body && body.marketplaceId);
  const sheetId = cleanId(body && body.sheetId);
  if (!marketplaceId || !sheetId) throw marketplaceError("Missing marketplace update target", 400);

  const target = await dbQuery(
    "SELECT id, owner_id AS ownerId FROM sky_marketplace_sheets WHERE id = ? LIMIT 1",
    [marketplaceId]
  );
  const targetRow = target.rows && target.rows[0];
  if (!targetRow) throw marketplaceError("Marketplace sheet not found", 404);
  if (String(targetRow.ownerId || targetRow.owner_id) !== userId) {
    throw marketplaceError("Only the uploader can update this marketplace sheet", 403);
  }

  const sourceConflict = await dbQuery(
    `SELECT id, title FROM sky_marketplace_sheets
      WHERE owner_id = ? AND source_sheet_id = ? AND id <> ?
      LIMIT 1`,
    [userId, sheetId, marketplaceId]
  );
  const conflict = sourceConflict.rows && sourceConflict.rows[0];
  if (conflict) {
    throw marketplaceError("This saved sheet is already uploaded as another marketplace sheet", 409, {
      duplicate: {
        id: conflict.id,
        title: conflict.title || "Marketplace sheet",
        url: marketplaceLink(req, conflict.id)
      }
    });
  }

  const saved = await readSavedSheetRecord(userId, sheetId);
  const record = buildMarketplaceRecord(user, saved);
  await rejectDuplicateIfNeeded(req, record.sheetHash, marketplaceId);

  const now = new Date().toISOString();
  const updated = await dbQuery(
    `UPDATE sky_marketplace_sheets
        SET owner_name = ?,
            owner_picture = ?,
            source_sheet_id = ?,
            title = ?,
            key_id = ?,
            bpm = ?,
            event_count = ?,
            sheet_hash = ?,
            payload = ?,
            updated_at = ?,
            delete_requested_at = NULL,
            delete_after_at = NULL
      WHERE id = ? AND owner_id = ?
      RETURNING id, title, key_id AS keyId, bpm, event_count AS eventCount, owner_name AS ownerName,
                owner_picture AS ownerPicture, source_sheet_id AS sourceSheetId, published_at AS publishedAt,
                updated_at AS updatedAt, delete_requested_at AS deleteRequestedAt, delete_after_at AS deleteAfterAt`,
    [record.ownerName, record.ownerPicture, sheetId, record.title, record.keyId, record.bpm, record.eventCount, record.sheetHash, JSON.stringify(record.payload), now, marketplaceId, userId]
  );
  const row = updated.rows && updated.rows[0];
  if (!row) throw marketplaceError("Marketplace sheet update failed", 500);
  return { action: "updated", sheet: normalizeMarketplaceRow({ ...row, isOwner: 1 }) };
}

async function scheduleMarketplaceDelete(user, body) {
  await ensureSchema();
  const userId = userKey(user);
  const marketplaceId = cleanId(body && body.marketplaceId);
  if (!marketplaceId) throw marketplaceError("Missing marketplace sheet id", 400);

  const target = await dbQuery(
    "SELECT id, owner_id AS ownerId FROM sky_marketplace_sheets WHERE id = ? LIMIT 1",
    [marketplaceId]
  );
  const row = target.rows && target.rows[0];
  if (!row) throw marketplaceError("Marketplace sheet not found", 404);
  if (String(row.ownerId || row.owner_id) !== userId) {
    throw marketplaceError("Only the uploader can delete this marketplace sheet", 403);
  }

  const now = new Date();
  const deleteAfter = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();
  await dbQuery(
    `UPDATE sky_marketplace_sheets
        SET delete_requested_at = ?,
            delete_after_at = ?,
            updated_at = ?
      WHERE id = ? AND owner_id = ?`,
    [now.toISOString(), deleteAfter, now.toISOString(), marketplaceId, userId]
  );
  return getMarketplaceSheet(userId, marketplaceId);
}

async function rateMarketplaceSheet(user, body) {
  await ensureSchema();
  const userId = userKey(user);
  const marketplaceId = cleanId(body && body.marketplaceId);
  const rating = Math.max(1, Math.min(5, safeInteger(body && body.rating, 0)));
  if (!marketplaceId || !rating) throw marketplaceError("Missing rating target", 400);

  const owner = await dbQuery(
    "SELECT owner_id AS ownerId FROM sky_marketplace_sheets WHERE id = ? LIMIT 1",
    [marketplaceId]
  );
  const ownerRow = owner.rows && owner.rows[0];
  if (!ownerRow) throw marketplaceError("Marketplace sheet not found", 404);
  if (String(ownerRow.ownerId || ownerRow.owner_id) === userId) {
    throw marketplaceError("You cannot rate your own sheet", 403);
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
      sendJson(res, 401, { error: "Sign in to publish, update, delete, or rate marketplace sheets" });
      return;
    }

    const body = await readJson(req);
    if (body.action === "publish") {
      sendJson(res, 200, await publishSavedSheet(req, user, body));
      return;
    }

    if (body.action === "update") {
      sendJson(res, 200, await updateMarketplaceSheet(req, user, body));
      return;
    }

    if (body.action === "delete") {
      sendJson(res, 200, { sheet: await scheduleMarketplaceDelete(user, body) });
      return;
    }

    if (body.action === "rate") {
      sendJson(res, 200, { sheet: await rateMarketplaceSheet(user, body) });
      return;
    }

    sendJson(res, 400, { error: "Unknown marketplace action" });
  } catch (error) {
    sendJson(res, error.statusCode || 500, {
      error: error && error.message ? error.message : "Marketplace request failed",
      ...(error.extra || {})
    });
  }
};
