import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./contexts/AuthContext/AuthContext";
import Forbidden from "./pages/Forbidden";

const AdminApplicantRoute = ({ component }) => {
  const { auth, handleLogin } = useContext(AuthContext);
  const { isAuthenticated, user } = auth;

  if (!isAuthenticated) {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const userInfo = handleLogin();
      userInfo.then(() => {
        if (userInfo.email) {
          checkComponent(component);
        } else return <Navigate to="/login" />;
      });
    } else return <Navigate to="/login" />;
  } else {
    // checkComponent(component);
    if (
      user.roleName === "superadmin" ||
      user.roleName === "admin" ||
      user.roleName === "applicant"
    ) {
      return component;
    } else if (
      user.roleName !== "superadmin" ||
      user.roleName === "admin" ||
      user.roleName !== "applicant"
    ) {
      return <Forbidden />;
    }
  }

  function checkComponent(component) {
    if (
      user.roleName === "superadmin" ||
      user.roleName === "admin" ||
      user.roleName === "applicant"
    ) {
      return component;
    } else if (
      user.roleName !== "superadmin" ||
      user.roleName === "admin" ||
      user.roleName !== "applicant"
    ) {
      return <Forbidden />;
    }
  }
};

export default AdminApplicantRoute;
