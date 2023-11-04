import axiosInstance from "./axiosInstance";

const roleAPI = {
  getAll: () => axiosInstance.get("/role"),
};

export default roleAPI;
