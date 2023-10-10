import axiosInstance from "./axiosInstance";

const applicationAPI = {
  getAll: () => {},
  create: (values) => axiosInstance.post("/application/create", values),
  update: (values) => axiosInstance.post("/application/update", values),
  getById: () => {},
};
export default applicationAPI;
