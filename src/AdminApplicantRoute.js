import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./contexts/AuthContext/AuthContext";
import Forbidden from "./pages/Forbidden";

const AdminApplicantRoute = ({ component }) => {
  const { auth } = useContext(AuthContext);
  const { isAuthenticated, user } = auth;

  if (
    isAuthenticated &&
    (user.roleName === "superadmin" ||
      user.roleName === "admin" ||
      user.roleName === "applicant")
  ) {
    return component;
  } else if (
    isAuthenticated &&
    (user.roleName !== "superadmin" ||
      user.roleName === "admin" ||
      user.roleName !== "applapplicanticant")
  ) {
    return <Forbidden />;
  }

  return <Navigate to="/login" />;
};

export default AdminApplicantRoute;
