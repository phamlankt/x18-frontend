import AdminJob from "../pages/AdminJob.jsx";
import BusinessSector from "../pages/BusinessSector.jsx";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Profile from "../pages/Profile.jsx";
import Register from "../pages/Register.jsx";
import ResetPassword from "../pages/ResetPassword.jsx";
import ListJobOfApplicant from "../pages/ListJobOfApplicant.jsx";
import ListJobOfRecruiter from "../pages/ListJobOfRecruiter.jsx";
import User from "../pages/User.jsx";
import CreateJobPage from "../pages/CreateJob.jsx";
import JobDetails from "../pages/JobDetails.jsx";
import UpdateJob from "../pages/UpdateJob.jsx";

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
    path: "/jobs/:jobId",
    component: <JobDetails />,
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
  },
  {
    path: "/register",
    component: <Register />,
  },
  {
    path: "/resetPassword/:token",
    component: <ResetPassword />,
  },
  {
    path: "/myListJob",
    component: <ListJobOfApplicant />,
  },
  {
    path: "/myPost",
    component: <ListJobOfRecruiter />,
  },
  {
    path: "/createJods",
    component: <CreateJobPage />,
    isPrivate: false,
  },
  {
    path: "/updateJob/:jobId",
    component: <UpdateJob />,
    isPrivate: false,
  },
];
export default routes;
