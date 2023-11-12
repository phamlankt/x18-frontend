import React, { useContext, useEffect, useState } from "react";
import notificationAPI from "../../apis/notificationAPI";
import AlertContext from "../../contexts/AlertContext/AlertContext";
import { parsePath, useNavigate } from "react-router-dom";
import { getPastTime } from "../../utils/fomatDate";
import NotificationContext from "../../contexts/NotificationContext/NotificationContext";

function Notifications() {
  const navigate = useNavigate();
const{notifications,handleNotification}=useContext(NotificationContext)
  const processNotification = (notification) => {
    const data = { ...notification, read: true };
    notificationAPI.updateNotification(data).then(() => {
      const updatedNotification = notifications.filter(
        (noti) => noti._id !== notification._id
      );
      handleNotification(updatedNotification);
    });
    navigate(`/jobs/${notification.jobId}`);
  };

  const notificationHtmlList =
    notifications && notifications.length > 0 ? (
      notifications.map((notification, index) => {
        return (
          !notification.read && (
            <div
              className="notification-tag-container"
              key={index}
              onClick={() => processNotification(notification)}
            >
              <p>
                {notification.status === "sent"
                  ? `${notification.applicant} has applied for "${notification.jobTitle}"`
                  : notification.status === "cancelled"
                  ? `${notification.applicant} has cancelled application for "${notification.jobTitle}"`
                  : (notification.status === "confirmed" ||
                      notification.status === "rejected") &&
                    `application ${notification.status} for "${notification.jobTitle}"`}
              </p>
              <div className="notification-action">
                <p></p>
                <p>{getPastTime(notification.createdAt)}</p>
              </div>
            </div>
          )
        );
      })
    ) : (
      <></>
    );
  return <>{notificationHtmlList}</>;
}

export default Notifications;
