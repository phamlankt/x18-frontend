import axiosInstance from "./axiosInstance";

const applicationAPI = {
  getAll: () => axiosInstance.get("/applications/all"),
  getApplicationsAndApplicants: (jobId, currentPage, pageSize) =>
    axiosInstance.get(
      `/applications/applicants/${jobId}?currentPage=${currentPage}&pageSize=${pageSize}`
    ),
  create: (values) => axiosInstance.post("/applications/create", values),
  confirm: (values) => axiosInstance.post("/applications/cancel", values),
  confirm: (values) => axiosInstance.post("/applications/confirm", values),
  reject: (values) => axiosInstance.post("/applications/reject", values),
  getById: () => {},
};
export default applicationAPI;
