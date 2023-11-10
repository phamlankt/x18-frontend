import axiosInstance from "./axiosInstance";

const adminAPI = {
    allUser: () => axiosInstance.get("/admin/users"),
    register: (data) => axiosInstance.post("/admin/create", data),
    update: (data) => axiosInstance.post("/admin/update", data),
}

export default adminAPI;