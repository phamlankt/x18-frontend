import { Route, Routes } from "react-router-dom";
import routes from "./global/routes";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import AdminRecruiterRoute from "./AdminRecruiterRoute";
import AdminApplicantRoute from "./AdminApplicantRoute";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useEffect, useContext, useState } from "react";
import AuthContext from "./contexts/AuthContext/AuthContext";
import { handleApplicationNotification } from "./global/common";
import AlertContext from "./contexts/AlertContext/AlertContext";
import NotificationContext from "./contexts/NotificationContext/NotificationContext";
import notificationAPI from "./apis/notificationAPI";
import { io } from "socket.io-client";

function App() {
  const { handleAlertStatus } = useContext(AlertContext);
  const { auth, socket } = useContext(AuthContext);
  const { handleNotification } = useContext(NotificationContext);
  
  useEffect(() => {
    if (auth.isAuthenticated && socket) {
      socket.once("connect", () => {
        socket.emit("newUser", { id: auth.user._id, email: auth.user.email });
      });

      socket.on("getJobNotification", async (data) => {
        const message = handleApplicationNotification(data);

        handleAlertStatus({
          type: "success",
          message: message,
        });
        try {
          await notificationAPI.getByReceiver().then((result) => {
            const notiListFromDB = result.data.data.notificationList;
            handleNotification(notiListFromDB);
          });
        } catch (error) {
          console.log(error.response.data.message);
        }
      });
    }
  }, [socket]);

  return (
    <>
      <ToastContainer />
      <Routes>
        {routes.map((route, index) => {
          const {
            path,
            component,
            isPrivate,
            isAdmin,
            isSuperAdmin,
            isAdminRecruiter,
            isAdminApplicant,
          } = route;
          return (
            <Route
              key={index}
              path={path}
              element={
                isPrivate ? (
                  isAdmin ? (
                    <AdminRoute component={component} />
                  ) : isAdminRecruiter ? (
                    <AdminRecruiterRoute component={component} />
                  ) : isAdminApplicant ? (
                    <AdminApplicantRoute component={component} />
                  ) : (
                    <PrivateRoute component={component} />
                  )
                ) : (
                  component
                )
              }
            />
          );
        })}
      </Routes>
    </>
  );
}

export default App;
