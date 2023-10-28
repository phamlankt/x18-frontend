import axiosInstance from "./axiosInstance";

const applicationAPI = {
  getAll: () => axiosInstance.get("/applications/all"),
  getApplicationsAndApplicants: (jobId, currentPage, pageSize) =>
    axiosInstance.get(
      `/applications/applicants/${jobId}?currentPage=${currentPage}&pageSize=${pageSize}`
    ),
  getApplicationByJobIdForApplicant: (jobId) =>
    axiosInstance.get(`/applications/applicant/${jobId}`),
  create: (values) => axiosInstance.post("/applications/create", values),
  cancel: (values) => axiosInstance.post("/applications/cancel", values),
  updatStatusByRecruiter: (values) =>
    axiosInstance.post("/applications/updatStatusByRecruiter", values),
  getById: () => {},
};
export default applicationAPI;
