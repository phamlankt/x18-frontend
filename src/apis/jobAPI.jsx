import axiosInstance from "./axiosInstance";

const jobAPI = {
  getStatistic: () => axiosInstance.get("/admin/statistic/job"),
  getAll: () => axiosInstance.get("/jobs/active"),
  getBySearchAndFilter: (values) =>
    axiosInstance.get(
      `/jobs/query/?search=${values?.search || ""}&sectors=${
        values?.sectors || ""
      }&location=${values?.location || ""}&sortField=${
        values.sortField
      }&sortBy=${values?.sortBy || ""}&currentPage=${
        values?.currentPage || ""
      }&pageSize=${values?.pageSize || ""}`
    ),
  getListJob: () => axiosInstance.get("/jobs/user/query"),
  getById: (jobId) => axiosInstance.get(`/jobs/details/${jobId}`),
  create: (values) => axiosInstance.post("/jobs/create", values),
  update: (jobId, values) => axiosInstance.put(`/jobs/${jobId}`, values),
  remove: (jobId) => axiosInstance.post("/jobs/remove", jobId),
  adminRemove: (values) => axiosInstance.put("/admin/jobs/remove", values),
  getJobByUserId: (values) =>
    axiosInstance.get(
      `/admin/jobs/?userId=${values?.userId || ""}&search=${
        values?.search || ""
      }&sectors=${values?.sectors || ""}&status=${
        values?.status || ""
      }&sortField=${values.sortField}&sortBy=${
        values?.sortBy || ""
      }&currentPage=${values?.currentPage || ""}&pageSize=${
        values?.pageSize || ""
      }`
    ),
};

export default jobAPI;
