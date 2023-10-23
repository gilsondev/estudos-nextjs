import nookies from "nookies";

const ACCESS_TOKEN_KEY = "ACCESS_TOKEN_KEY";
const REFRESH_TOKEN_KEY = "REFRESH_TOKEN";

export const tokenService = {
  save(accessToken, ctx = null) {
    nookies.set(ctx, ACCESS_TOKEN_KEY, accessToken, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  },
  saveRefreshToken(refreshToken, ctx) {
    nookies.set(ctx, REFRESH_TOKEN_KEY, req.body.refresh_token, {
      httpOnly: true,
      sameSite: "lax",
    });
  },
  get(ctx = null) {
    const cookies = nookies.get(ctx);
    return cookies[ACCESS_TOKEN_KEY] || "";
  },
  getRefreshToken(ctx) {
    const cookies = nookies.get(ctx);
    return cookies[REFRESH_TOKEN_KEY] || "";
  },
  delete(ctx = null) {
    nookies.destroy(ctx, ACCESS_TOKEN_KEY);
  },
};
