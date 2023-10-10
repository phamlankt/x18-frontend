import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Forbidden() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
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
