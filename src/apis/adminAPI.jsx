import axiosInstance from "./axiosInstance";

const adminAPI = {
    register: (data) => axiosInstance.post("/admin/create", data),
}

export default adminAPI;