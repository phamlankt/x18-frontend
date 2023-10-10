import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./contexts/AuthContext/AuthContext";


const NotAuthRoute = ({ component }) => {
  const { auth } = useContext(AuthContext);
  const { isAuthenticated } = auth;
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return component;
};

export default NotAuthRoute;
