import React, { useState } from "react";
import NotificationContext from "./NotificationContext";

const NotificationState = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const handleNotification = (notificationList) => {
    setNotifications(notificationList);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        handleNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationState;
