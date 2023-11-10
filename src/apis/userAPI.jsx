import axiosInstance from "./axiosInstance";

const userAPI = {
  getStatistic: () => axiosInstance.get("/admin/statistic/user"),
  getAllByRoleId: (query) =>
    axiosInstance.get(
      `/admin/users/?search=${query.search || ""}&roles=${
        query.roles
      }&currentPage=${query.currentPage || 1}&pageSize=${query.pageSize || 10}`
    ),
  // getById: () => axiosInstance.get("/users/getById"),
  create: (values) => axiosInstance.post("/users/create", values),
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
