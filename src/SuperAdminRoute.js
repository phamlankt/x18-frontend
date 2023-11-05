import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./contexts/AuthContext/AuthContext";
import Forbidden from "./pages/Forbidden";

const SuperAdminRoute = ({ component }) => {
  const { auth } = useContext(AuthContext);
  const { isAuthenticated, user } = auth;

  if (isAuthenticated && user.roleName === "superadmin") {
    return component;
  } else if (isAuthenticated && user.roleName !== "superadmin") {
    return <Forbidden />;
  }

  return <Navigate to="/login" />;
};

export default SuperAdminRoute;
