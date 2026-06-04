"use strict";

const zlib = require("zlib");

const MAX_BODY_BYTES = 26000000;

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
      if (data.length > MAX_BODY_BYTES) {
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

function sanitizeErrorText(text) {
  return String(text || "")
    .replace(/[A-Za-z0-9_-]{24,}/g, "[redacted]")
    .slice(0, 700);
}

function isZipLike(file) {
  const name = String(file.name || "").toLowerCase();
  const media = String(file.mediaType || "").toLowerCase();
  return name.endsWith(".mxl") || name.endsWith(".zip") || media.includes("zip");
}

function findEndOfCentralDirectory(buffer) {
  for (let offset = buffer.length - 22; offset >= Math.max(0, buffer.length - 66000); offset -= 1) {
    if (buffer.readUInt32LE(offset) === 0x06054b50) return offset;
  }
  return -1;
}

function readZipEntry(buffer, entry) {
  const localOffset = entry.localOffset;
  if (buffer.readUInt32LE(localOffset) !== 0x04034b50) return null;
  const nameLength = buffer.readUInt16LE(localOffset + 26);
  const extraLength = buffer.readUInt16LE(localOffset + 28);
  const dataStart = localOffset + 30 + nameLength + extraLength;
  const dataEnd = dataStart + entry.compressedSize;
  const compressed = buffer.subarray(dataStart, dataEnd);
  if (entry.method === 0) return compressed;
  if (entry.method === 8) return zlib.inflateRawSync(compressed);
  return null;
}

function extractMusicXmlFromZip(base64Data) {
  const buffer = Buffer.from(base64Data, "base64");
  const eocdOffset = findEndOfCentralDirectory(buffer);
  if (eocdOffset < 0) throw new Error("MXL zip container is not readable");

  const entryCount = buffer.readUInt16LE(eocdOffset + 10);
  let centralOffset = buffer.readUInt32LE(eocdOffset + 16);
  const entries = [];

  for (let index = 0; index < entryCount; index += 1) {
    if (buffer.readUInt32LE(centralOffset) !== 0x02014b50) break;
    const method = buffer.readUInt16LE(centralOffset + 10);
    const compressedSize = buffer.readUInt32LE(centralOffset + 20);
    const fileNameLength = buffer.readUInt16LE(centralOffset + 28);
    const extraLength = buffer.readUInt16LE(centralOffset + 30);
    const commentLength = buffer.readUInt16LE(centralOffset + 32);
    const localOffset = buffer.readUInt32LE(centralOffset + 42);
    const name = buffer.subarray(centralOffset + 46, centralOffset + 46 + fileNameLength).toString("utf8");
    entries.push({ name, method, compressedSize, localOffset });
    centralOffset += 46 + fileNameLength + extraLength + commentLength;
  }

  const byName = new Map(entries.map((entry) => [entry.name, entry]));
  const container = byName.get("META-INF/container.xml");
  if (container) {
    const containerBytes = readZipEntry(buffer, container);
    const containerText = containerBytes ? containerBytes.toString("utf8") : "";
    const match = containerText.match(/full-path=["']([^"']+)["']/i);
    if (match && byName.has(match[1])) {
      const rootBytes = readZipEntry(buffer, byName.get(match[1]));
      if (rootBytes) return rootBytes.toString("utf8");
    }
  }

  const xmlEntry = entries.find((entry) => /\.(musicxml|xml)$/i.test(entry.name) && !/^META-INF\//i.test(entry.name));
  if (!xmlEntry) throw new Error("No MusicXML file found inside MXL");
  const xmlBytes = readZipEntry(buffer, xmlEntry);
  if (!xmlBytes) throw new Error("MusicXML entry inside MXL uses an unsupported compression method");
  return xmlBytes.toString("utf8");
}

module.exports = async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const body = await readBody(req);
    const files = Array.isArray(body.files) ? body.files.slice(0, 10).filter((file) => file && file.data) : [];
    if (!files.length) {
      res.status(400).json({ error: "No score file supplied" });
      return;
    }

    const zipFile = files.find(isZipLike);
    if (zipFile) {
      const musicXml = extractMusicXmlFromZip(zipFile.data);
      res.status(200).json({
        musicXml,
        sourceType: "mxl"
      });
      return;
    }

    res.status(400).json({
      error: "Image/PDF score reading is handled by local browser vision OMR. /api/sheet-omr only extracts MXL files."
    });
  } catch (error) {
    res.status(500).json({
      error: sanitizeErrorText(error && error.message ? error.message : "Score import route failed")
    });
  }
};
