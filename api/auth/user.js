"use strict";

const { getAuthUser, sendJson } = require("../auth-utils");

module.exports = async function user(req, res) {
  if (req.method !== "GET") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  const session = await getAuthUser(req, res);
  sendJson(res, 200, {
    configured: Boolean(session.configured),
    user: session.user || null,
    error: session.error || null
  });
};
