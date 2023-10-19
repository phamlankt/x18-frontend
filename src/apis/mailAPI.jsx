import axiosInstance from "./axiosInstance";

const mailAPI = {
  send: (values) => axiosInstance.post("/mail/send", values),
};

export default mailAPI;
