import axiosInstance from "./axiosInstance";

const businessSectorAPI = {
    getAll: () => axiosInstance.get("/business_sector"),
    create: (business_sector) => axiosInstance.post("/business_sector/update",business_sector),
    update: (business_sector) => axiosInstance.post("/business_sector/update",business_sector),
};

export default businessSectorAPI;
