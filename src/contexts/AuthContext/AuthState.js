import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

import authAPI from "../../apis/authAPI";

const AuthState = ({ children }) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        user: {},
    });

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
            return data.userInfo
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogout = () => {
        setAuth({
            isAuthenticated: false,
            user: {},
        });
    };
    

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        // Call API /me => check token => user, isAuthenticated
        if (accessToken) {
            handleLogin();
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                auth,
                handleLogin,
                handleLogout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthState;
