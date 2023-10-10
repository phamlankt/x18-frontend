import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./contexts/AuthContext/AuthContext";
import Forbidden from "./pages/Forbidden";

const AdminApplicantRoute = ({ component }) => {
  const { auth } = useContext(AuthContext);
  const { isAuthenticated, user } = auth;

  if (
    isAuthenticated &&
    (user.role === "admin" || user.role === "admin_l1" || user.role_id === "applicant")
  ) {
    return component;
  } else if (
    isAuthenticated &&
    (user.role !== "admin" || user.role === "admin_l1" || user.role !== "applicant")
  ) {
    return <Forbidden />;
  }

  return <Navigate to="/login" />;
};

export default AdminApplicantRoute;
