import axiosInstance from "./axiosInstance";

const applicationAPI = {
  getAll: () => axiosInstance.get("/applications/all"),
  create: (values) => axiosInstance.post("/application/create", values),
  update: (values) => axiosInstance.post("/application/update", values),
  getById: () => {},
};
export default applicationAPI;
