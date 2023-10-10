import { Route, Routes, useNavigate } from "react-router-dom";
import routes from "./global/routes";
import AuthState from "./contexts/AuthContext/AuthState";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import NotAuthRoute from "./NotAuthRoute";
import Header from "./components/header/Header";
import LeftSideBar from "./components/leftSideBarComponents/LeftSideBar";
import { useEffect } from "react";
import AppState from "./contexts/AppContext/AppState";
import AdminOwnerRoute from "./AdminRecruiterRoute";
import AdminRecruiterRoute from "./AdminRecruiterRoute";
import AdminApplicantRoute from "./AdminApplicantRoute";

function App() {
  const navigate = useNavigate();
  // useEffect(() => {
  //   const urlLocalStorage = localStorage.getItem("currentUrl");
  //   urlLocalStorage && navigate(urlLocalStorage);
  // }, []);
  const pathname = window.location.pathname;
  const ignore_css = ["/login", "/register"];
  return (
    <AppState>
      <AuthState>
       
        <>
          <Header />
          <Routes>
            {routes.map((route, index) => {
              const {
                path,
                component,
                isPrivate,
                notAuth,
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
                    ) : notAuth ? (
                      <NotAuthRoute component={component} />
                    ) : (
                      component
                    )
                  }
                />
              );
            })}
          </Routes>
        </>
        {/* </div> */}
      </AuthState>
    </AppState>
  );
}

export default App;
