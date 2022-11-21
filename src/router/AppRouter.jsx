import React from "react";
import { Route, Routes } from "react-router-native";
import Login from "../modules/auth/screens/login/login";
import Register from "../modules/auth/screens/register/register";
import FarmerRoutes from "./FarmerRoutes";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <FarmerRoutes />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default AppRouter;
