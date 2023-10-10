import axiosInstance from "./axiosInstance";

const userAPI = {
  getById: () => axiosInstance.get("/user/getById"),
  getAll: () => axiosInstance.get("/account"),
  create: (values) => axiosInstance.post("/user/create", values),
  update: (values) => axiosInstance.post("/user/update", values),
  uploadAvatar: (formData) =>
    axiosInstance.post("/user/upload-avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};

export default userAPI;
