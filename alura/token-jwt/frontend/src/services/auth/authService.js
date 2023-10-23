import { HttpClient } from "../../infra/HttpClient/HttpClient";
import { tokenService } from "./tokenService";

export const authService = {
  async login({ username, password }) {
    return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
      method: "POST",
      body: {
        username,
        password,
      },
    })
      .then(async (resp) => {
        if (!resp.ok) {
          throw new Error("Usuário ou senha invalidos");
        }

        const body = resp.body;
        tokenService.save(body.data.access_token);

        return body;
      })
      .then(async ({ data }) => {
        const { refresh_token } = data;

        const resp = await HttpClient("/api/refresh", {
          method: "POST",
          body: {
            refresh_token,
          },
        });
      });
  },

  async getSession(ctx = null) {
    const access_token = tokenService.get(ctx);
    return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/session`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }).then(async (resp) => {
      if (!resp.ok) {
        return null;
      }

      return resp.body;
    });
  },
};
