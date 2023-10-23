import React from "react";
import { authService } from "../src/services/auth/authService";
import { useRouter } from "next/router";

// Decoration Pattern
// https://nextjs.org/docs/pages/building-your-application/routing/authenticating#authenticating-server-rendered-pages
export const withSession = (callback) => {
  return async (ctx) => {
    try {
      const session = await authService.getSession(ctx);
      const modifiedContext = {
        ...ctx,
        req: {
          ...ctx.req,
          session,
        },
      };
      return callback(modifiedContext);
    } catch (error) {
      return {
        redirect: {
          permanent: false,
          destination: "/?error=401",
        },
      };
    }
  };
};

const useSession = () => {
  const [session, setSession] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    authService
      .getSession()
      .then((resp) => {
        setSession(resp);
      })
      .catch((err) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    data: session,
    loading,
    error,
  };
};

// High Order Component
export function withSessionHOC(Component) {
  return function Wrapper(props) {
    const router = useRouter();
    const { loading, error, data } = useSession();

    if (!loading && error) {
      router.push("/?error=401");
    }

    const modifiedProps = {
      ...props,
      data,
    };

    return <Component {...modifiedProps} />;
  };
}
