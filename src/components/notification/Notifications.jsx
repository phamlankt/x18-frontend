import React, { useContext, useEffect, useState } from "react";
import notificationAPI from "../../apis/notificationAPI";
import AlertContext from "../../contexts/AlertContext/AlertContext";
import { parsePath, useNavigate } from "react-router-dom";

function Notifications({ notifications, setNotifications }) {
  const navigate = useNavigate();

  const handleNotification = (notification) => {
    const data = { ...notification, read: true };
    notificationAPI.updateNotification(data).then(() => {
      const updatedNotification = notifications.filter(
        (noti) => noti._id !== notification._id
      );
      setNotifications(updatedNotification);
    });
    navigate(`/jobs/${notification.jobId}`);
  };

  const notificationHtmlList =
    notifications && notifications.length > 0 ? (
      notifications.map((notification, index) => {
        return (
          !notification.read && (
            <button
              key={index}
              className="btn btn-link"
              onClick={() => handleNotification(notification)}
            >
              {notification.status === "sent"
                ? `${notification.applicant} has applied for "${notification.jobTitle}"`
                : notification.status === "cancelled"
                ? `${notification.applicant} has cancelled application for "${notification.jobTitle}"`
                : (notification.status === "confirmed" ||
                    notification.status === "rejected") &&
                  `application ${notification.status} for "${notification.jobTitle}"`}
            </button>
          )
        );
      })
    ) : (
      <></>
    );
  return <>{notificationHtmlList}</>;
}

export default Notifications;
