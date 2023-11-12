import axiosInstance from "./axiosInstance";

const notificationAPI = {
  getByReceiver: () => axiosInstance.get("/notifications"),
  updateNotification: (data) =>
    axiosInstance.put("/notifications/update", data),
};
export default notificationAPI;
