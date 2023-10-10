import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./contexts/AuthContext/AuthContext";
import Forbidden from "./pages/Forbidden";

const AdminRecruiterRoute = ({ component }) => {
  const { auth } = useContext(AuthContext);
  const { isAuthenticated, user } = auth;

  if (isAuthenticated && (user.role === "admin" || user.role === "recruiter")) {
    return component;
  } else if (isAuthenticated && (user.role !== "admin" || user.role !== "recruiter")) {
    return <Forbidden />;
  }

  return <Navigate to="/login" />;
};

export default AdminRecruiterRoute;
