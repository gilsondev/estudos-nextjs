import React from "react";
import { withSessionHOC } from "../src/services/auth/session";

const AuthPageStaticPage = () => {
  return (
    <div>
      <h1>Auth Page Static</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default withSessionHOC(AuthPageStaticPage);
