"use strict";

const {
  clearAuthCookies,
  getTenantId,
  logoutRefreshToken,
  parseCookies,
  REFRESH_COOKIE,
  sendJson
} = require("../auth-utils");

module.exports = async function logout(req, res) {
  if (req.method !== "POST" && req.method !== "GET") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  const cookies = parseCookies(req);
  await logoutRefreshToken(getTenantId(), cookies[REFRESH_COOKIE]);
  clearAuthCookies(res, req);
  sendJson(res, 200, { ok: true });
};
