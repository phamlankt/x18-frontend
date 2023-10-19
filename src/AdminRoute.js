import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./contexts/AuthContext/AuthContext";

const AdminRoute = ({ component }) => {
  const { auth } = useContext(AuthContext);
  const { isAuthenticated, user } = auth;

  if (
    isAuthenticated &&
    (user.roleName === "superadmin" || user.roleName === "admin")
  ) {
    return component;
  } else if (
    isAuthenticated &&
    (user.roleName !== "superadmin" || user.roleName !== "admin")
  ) {
    return <Navigate to="/" />;
  }

  return <Navigate to="/login" />;
};

export default AdminRoute;
