import { authService } from "../src/services/auth/authService";
import { withSession } from "../src/services/auth/session";

const AuthPageSSRPage = (props) => {
  return (
    <div>
      <h1>Auth Page SSR</h1>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
};

export default AuthPageSSRPage;

export const getServerSideProps = withSession((ctx) => {
  return {
    props: {
      session: ctx.req.session,
    },
  };
});

// export async function getServerSideProps(ctx) {
//   try {
//     const session = await authService.getSession(ctx);

//     return {
//       props: {
//         session,
//       },
//     };
//   } catch (error) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/?error=401",
//       },
//     };
//   }
// }
