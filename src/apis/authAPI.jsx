import axiosInstance from "./axiosInstance";

const authAPI = {
  login: (values) => axiosInstance.post("/auth/login", values),
  register: (values) => axiosInstance.post("/auth/register", values),
  authInfo: (values) => axiosInstance.get("/auth/me", values),
};

export default authAPI;
