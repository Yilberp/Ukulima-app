import React from "react";
import { LoginProvider } from "./src/context/auth/authContext";
import AppRouter from "./src/router/AppRouter";

const UkulimaApp = () => {
  return (
    <LoginProvider>
      <AppRouter />
    </LoginProvider>
  );
};

export default UkulimaApp;
