"use strict";

const fs = require("fs");
const http = require("http");
const path = require("path");
const { URL } = require("url");

const ROOT_DIR = __dirname;
const PUBLIC_DIR = path.join(ROOT_DIR, "public");
const PORT = Number(process.env.PORT || 5173);
const HOST = process.env.HOST || "127.0.0.1";

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8"
};

function apiResponse(res) {
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.json = (payload) => {
    if (!res.headersSent) res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(payload));
  };
  return res;
}

async function routeApi(req, res, pathname) {
  if (pathname === "/api/auth/login") {
    await require("./api/auth/login")(req, apiResponse(res));
    return true;
  }

  if (pathname === "/api/auth/callback") {
    await require("./api/auth/callback")(req, apiResponse(res));
    return true;
  }

  if (pathname === "/api/auth/user") {
    await require("./api/auth/user")(req, apiResponse(res));
    return true;
  }

  if (pathname === "/api/auth/logout") {
    await require("./api/auth/logout")(req, apiResponse(res));
    return true;
  }

  if (pathname === "/api/mimo-refine") {
    await require("./api/mimo-refine")(req, apiResponse(res));
    return true;
  }

  if (pathname === "/api/sheet-omr") {
    await require("./api/sheet-omr")(req, apiResponse(res));
    return true;
  }

  return false;
}

function safeStaticPath(pathname) {
  const cleanPath = decodeURIComponent(pathname).replace(/^\/+/, "");
  const fileName = cleanPath || "index.html";
  const publicPath = path.resolve(PUBLIC_DIR, fileName);
  const rootPath = path.resolve(ROOT_DIR, fileName);

  if (publicPath.startsWith(PUBLIC_DIR) && fs.existsSync(publicPath) && fs.statSync(publicPath).isFile()) {
    return publicPath;
  }

  if (rootPath.startsWith(ROOT_DIR) && fs.existsSync(rootPath) && fs.statSync(rootPath).isFile()) {
    return rootPath;
  }

  return path.join(PUBLIC_DIR, "index.html");
}

function serveStatic(req, res, pathname) {
  const filePath = safeStaticPath(pathname);
  if (!fs.existsSync(filePath)) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("Not found");
    return;
  }

  const extension = path.extname(filePath).toLowerCase();
  res.statusCode = 200;
  res.setHeader("Content-Type", MIME_TYPES[extension] || "application/octet-stream");
  fs.createReadStream(filePath).pipe(res);
}

const server = http.createServer(async (req, res) => {
  const parsed = new URL(req.url || "/", `http://${req.headers.host || `${HOST}:${PORT}`}`);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  try {
    if (parsed.pathname.startsWith("/api/")) {
      const handled = await routeApi(req, res, parsed.pathname);
      if (!handled) {
        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "API route not found" }));
      }
      return;
    }

    serveStatic(req, res, parsed.pathname);
  } catch (error) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: error && error.message ? error.message : "Local server error" }));
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Sky Piano Sheet Maker local server: http://${HOST}:${PORT}`);
});
