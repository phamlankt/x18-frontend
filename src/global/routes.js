import AdminJob from "../pages/AdminJob.jsx";
import BusinessSector from "../pages/BusinessSector.jsx";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Profile from "../pages/Profile.jsx";
import Register from "../pages/Register.jsx";
import User from "../pages/User.jsx";

export const routes = [
  {
    path: "/",
    component: <Home />,
    isPrivate: false,
  },
  {
    path: "/admin/users",
    component: <User />,
    isPrivate: true,
    isAdmin: true,
  },
  {
    path: "/admin/jobs",
    component: <AdminJob />,
    isPrivate: true,
    isAdmin: true,
  },
  {
    path: "/admin/sectors",
    component: <BusinessSector />,
    isPrivate: true,
    isAdmin: true,
  },
  {
    path: "/jobs",
    component: <Home />,
    isPrivate: false,
  },
  {
    path: "/profile",
    component: <Profile />,
    isPrivate: true,
  },
  {
    path: "/login",
    component: <Login />,
    notAuth: true,
  },
  {
    path: "/register",
    component: <Register />,
    notAuth: true,
  },
];
export default routes;
