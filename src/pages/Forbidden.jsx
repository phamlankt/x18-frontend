import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext/AuthContext";

function Forbidden() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    const timer = setTimeout(() => {
      auth.user.roleName.includes("admin") ? navigate("/admin") : navigate("/");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="container rounded bg-white m-4 profile-form p-4">
      <h1 className="fw-bold">Forbidden</h1>
      <p>You don't have permission to access this resource</p>
      <div>Redirecting...</div>
    </div>
  );
}

export default Forbidden;
