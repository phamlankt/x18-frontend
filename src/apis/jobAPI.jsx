import axiosInstance from "./axiosInstance";

const jobAPI = {
  getAll: (values) =>
    axiosInstance.get(
      `/jobs/query/?search=${values?.search}&sectors=${values?.sector}&sortBy=${values?.sortBy}&sortField=${values?.sortField}&pageSize=${values?.pageSize}&currentPage=${values?.currentPage}&location=${values?.location}`
    ),
  getById: () => axiosInstance.get("/job/getById"),
  create: (values) => axiosInstance.post("/job/create", values),
  update: (values) => axiosInstance.post("/job/update", values),
};

export default jobAPI;
