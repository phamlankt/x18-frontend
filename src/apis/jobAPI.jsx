import axiosInstance from "./axiosInstance";

const jobAPI = {
  getAll: () => axiosInstance.get("/jobs/active"),
  getListJob: () => axiosInstance.get("/jobs/user/query"),
  getById: (jobId) => axiosInstance.get(`/jobs/details/${jobId}`),
  create: (values) => axiosInstance.post("/jobs/create", values),
  update: (values) => axiosInstance.post("/jobs/update", values),
  remove: (jobId) => axiosInstance.post("/jobs/remove", jobId),
};

export default jobAPI;
