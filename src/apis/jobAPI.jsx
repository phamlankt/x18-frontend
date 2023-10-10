import axiosInstance from "./axiosInstance";

const jobAPI = {
  getAll: () => axiosInstance.get("/job"),
  getById: () => axiosInstance.get("/job/getById"),
  create: (values) => axiosInstance.post("/job/create", values),
  update: (values) => axiosInstance.post("/job/update", values),
};

export default jobAPI;
