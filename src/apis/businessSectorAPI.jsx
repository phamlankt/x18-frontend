import axiosInstance from "./axiosInstance";

const businessSectorAPI = {
  getAll: (query) =>
    axiosInstance.get(
      `/businessSectors/?search=${query?.search || ""}&currentPage=${
        query?.currentPage || 1
      }&pageSize=${query?.pageSize || 0}`
    ),
  create: (values) => axiosInstance.post("/businessSectors/create", values),
  update: (values) => axiosInstance.put("/businessSectors/update", values),
};

export default businessSectorAPI;
