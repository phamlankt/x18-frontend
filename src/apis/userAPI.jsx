import axiosInstance from "./axiosInstance";

const userAPI = {
  // getById: () => axiosInstance.get("/users/getById"),
  // getAll: () => axiosInstance.get("/users"),
  // create: (values) => axiosInstance.post("/users/create", values),
  update: (values) => axiosInstance.put("/users/update", values),
  changePassword: (values) =>
    axiosInstance.put("/users/changePassword", values),
  resetPassword: (values) => axiosInstance.put(`/users/resetPassword`, values),
  uploadAvatar: (formData) =>
    axiosInstance.post("/users/upload-avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  uploadLogo: (formData) =>
    axiosInstance.post("/users/upload-logo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};

export default userAPI;
