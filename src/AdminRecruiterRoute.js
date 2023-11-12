import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./contexts/AuthContext/AuthContext";
import Forbidden from "./pages/Forbidden";

const AdminRecruiterRoute = ({ component }) => {
  const { auth, handleLogin } = useContext(AuthContext);
  const { isAuthenticated, user } = auth;

  if (!isAuthenticated) {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      handleLogin().then((userInfo) => {
        if (userInfo.email) {
          checkComponent(component);
        } else return <Navigate to="/login" />;
      });
    } else return <Navigate to="/login" />;
  } else {
    // checkComponent( component);
    if (
      user.roleName === "superadmin" ||
      user.roleName === "admin" ||
      user.roleName === "recruiter"
    ) {
      return component;
    } else if (
      user.roleName !== "superadmin" ||
      user.roleName === "admin" ||
      user.roleName !== "recruiter"
    ) {
      return <Forbidden />;
    }
  }

  function checkComponent(component) {
    if (
      user.roleName === "superadmin" ||
      user.roleName === "admin" ||
      user.roleName === "recruiter"
    ) {
      return component;
    } else if (
      user.roleName !== "superadmin" ||
      user.roleName === "admin" ||
      user.roleName !== "recruiter"
    ) {
      return <Forbidden />;
    }
  }
};

export default AdminRecruiterRoute;
