"use strict";

const {
  getCohesivityOrigin,
  getRequestOrigin,
  getTenantId,
  getUrl,
  redirect,
  safeReturnTo,
  sendJson
} = require("../auth-utils");

module.exports = async function login(req, res) {
  if (req.method !== "GET") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  const tenantId = getTenantId();
  if (!tenantId) {
    sendJson(res, 503, { error: "Cohesivity login is not configured" });
    return;
  }

  const requestUrl = getUrl(req);
  const returnTo = safeReturnTo(requestUrl.searchParams.get("return_to") || "/");
  const callbackUrl = `${getRequestOrigin(req)}/api/auth/callback`;
  const loginUrl = new URL(`${getCohesivityOrigin()}/edge/auth/${tenantId}/google`);
  loginUrl.searchParams.set("redirect_uri", callbackUrl);
  loginUrl.searchParams.set("return_to", returnTo);

  redirect(res, loginUrl.toString());
};
