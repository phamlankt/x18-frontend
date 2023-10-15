import axiosInstance from "./axiosInstance";

const mailAPI = {
  send: (values) => axiosInstance.post("/mail/sent", values),
};

export default mailAPI;
