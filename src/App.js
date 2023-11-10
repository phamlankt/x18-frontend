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
import { useEffect, useContext } from "react";
import AuthContext from "./contexts/AuthContext/AuthContext";
function App() {

  return (
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
  );
}

export default App;
