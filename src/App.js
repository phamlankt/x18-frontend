import { Route, Routes } from "react-router-dom";
import routes from "./global/routes";
import AuthState from "./contexts/AuthContext/AuthState";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import NotAuthRoute from "./NotAuthRoute";
import Header from "./components/header/Header";
import AppState from "./contexts/AppContext/AppState";
import AdminRecruiterRoute from "./AdminRecruiterRoute";
import AdminApplicantRoute from "./AdminApplicantRoute";
import Footer from "./components/footer/Footer";

function App() {
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
          <Footer />
        </>
      </AuthState>
    </AppState>
  );
}

export default App;
