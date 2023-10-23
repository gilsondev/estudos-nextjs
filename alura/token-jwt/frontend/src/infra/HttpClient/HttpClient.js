import { tokenService } from "../../services/auth/tokenService";

export const HttpClient = async (fetchUrl, fetchOptions) => {
  const options = {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      ...fetchOptions.headers,
    },
    body: fetchOptions.body ? JSON.stringify(fetchOptions.body) : null,
  };

  return fetch(fetchUrl, options)
    .then(async (resp) => {
      return {
        ok: resp.ok,
        status: resp.status,
        body: await resp.json(),
      };
    })
    .then(async (resp) => {
      if (!options.refresh) return resp;
      if (resp.status !== 401) return resp;

      const isServer = true;

      const refreshResponse = await HttpClient(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/refresh`,
        {
          method: isServer ? "PUT" : "GET",
          body: isServer ? { refresh_token } : "",
        }
      );

      const newAccessToken = refreshResponse.body.data.access_token;
      const newRefreshToken = refreshResponse.body.data.refresh_token;

      tokenService.save(newAccessToken);

      const retryResponse = await HttpClient(fetchUrl, {
        ...options,
        refresh: false,
        headers: {
          Authorization: `Bearer ${newAccessToken}`,
        },
      });

      return retryResponse;
    });
};
