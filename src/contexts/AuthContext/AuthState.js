import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { io } from "socket.io-client";
import authAPI from "../../apis/authAPI";
import { useNavigate } from "react-router-dom";

const AuthState = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: {},
  });
  const [socket, setSocket] = useState(null);

  //   1. Call API /me => userInfo
  //   2. Update auth state
  const handleLogin = async () => {
    try {
      const response = await authAPI.authInfo();
      const data = response.data.data;
      setAuth({
        isAuthenticated: true,
        user: data.userInfo,
      });

      setSocket(
        io(`${process.env.REACT_APP_BASE_API}`, { transports: ["websocket"] })
      );
      return data.userInfo;
    } catch (error) {
      console.log(error.response.data.message);
      if (error.response.data.message === "Token is expired")
        navigate("/login");
    }
  };

  const handleLogout = () => {
    socket.disconnect();
    setAuth({
      isAuthenticated: false,
      user: {},
    });
    navigate("/");
  };

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    // Call API /me => check token => user, isAuthenticated
    if (accessToken) {
      const decodedJwt = parseJwt(accessToken);

      if (decodedJwt.exp * 1000 > Date.now()) {
        handleLogin();
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        handleLogin,
        handleLogout,
        socket,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
