import { Route, Routes } from "react-router-dom";
import routes from "./global/routes";
import AuthState from "./contexts/AuthContext/AuthState";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import AdminRecruiterRoute from "./AdminRecruiterRoute";
import AdminApplicantRoute from "./AdminApplicantRoute";
import "react-toastify/dist/ReactToastify.css";
import AlertState from "./contexts/AlertContext/AlertState";
import { ToastContainer } from "react-toastify";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import SocketState from "./contexts/SocketContext/SocketState";

function App() {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, []);

  useEffect(() => {
    socket.emit("newUser");
  }, []);
  return (
    <SocketState>
      <AlertState>
        <AuthState>
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
        </AuthState>
      </AlertState>
    </SocketState>
  );
}

export default App;
