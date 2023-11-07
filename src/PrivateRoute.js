import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./contexts/AuthContext/AuthContext";

const PrivateRoute = ({ component }) => {
  const { auth, handleLogin } = useContext(AuthContext);
  const { isAuthenticated } = auth;

  if (!isAuthenticated) {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const userInfo = handleLogin();
      userInfo.then(() => {
        if (userInfo.email) return component;
        else return <Navigate to="/login" />;
      });
    } else return <Navigate to="/login" />;
  } else return component;
};

export default PrivateRoute;
