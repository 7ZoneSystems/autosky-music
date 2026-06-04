"use strict";

const { getUrl, redirect, safeReturnTo, setAuthCookies } = require("../auth-utils");

module.exports = async function callback(req, res) {
  if (req.method !== "GET") {
    res.statusCode = 405;
    res.end("Method not allowed");
    return;
  }

  const requestUrl = getUrl(req);
  const error = requestUrl.searchParams.get("error");
  const returnTo = safeReturnTo(requestUrl.searchParams.get("return_to") || "/");
  if (error) {
    redirect(res, `/?auth_error=${encodeURIComponent(error)}`);
    return;
  }

  const accessToken = requestUrl.searchParams.get("access_token");
  const refreshToken = requestUrl.searchParams.get("refresh_token") || "";
  if (!accessToken) {
    redirect(res, "/?auth_error=missing_token");
    return;
  }

  setAuthCookies(res, req, {
    access_token: accessToken,
    refresh_token: refreshToken
  });
  redirect(res, returnTo);
};
