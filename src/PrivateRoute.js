import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./contexts/AuthContext/AuthContext";


const PrivateRoute = ({ component }) => {
  const { auth } = useContext(AuthContext);
  const { isAuthenticated } = auth;

  if (isAuthenticated) {
    return component;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;
