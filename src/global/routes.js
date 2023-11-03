import BusinessSector from "../pages/admin/BusinessSector.jsx";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Profile from "../pages/Profile.jsx";
import Register from "../pages/Register.jsx";
import ResetPassword from "../pages/ResetPassword.jsx";
import ListJobOfApplicant from "../pages/ListJobOfApplicant.jsx";
import ListJobOfRecruiter from "../pages/ListJobOfRecruiter.jsx";
import User from "../pages/admin/User.jsx";
import CreateJobPage from "../pages/CreateJob.jsx";
import JobDetails from "../pages/JobDetails.jsx";
import UpdateJob from "../pages/UpdateJob.jsx";
import Job from "../pages/admin/Job.jsx";

export const routes = [
  {
    path: "/",
    component: <Home />,
    isPrivate: false,
  },
  {
    path: "/admin",
    component: <BusinessSector />,
    isPrivate: false,
    isAdmin: false,
  },
  {
    path: "/admin/job",
    component: <Job />,
    isPrivate: false,
    isAdmin: false,
  },
  {
    path: "/admin/user",
    component: <User />,
    isPrivate: false,
    isAdmin: false,
  },
  {
    path: "/admin/price",
    component: <BusinessSector />,
    isPrivate: false,
    isAdmin: false,
  },
  {
    path: "/admin/sector",
    component: <BusinessSector />,
    isPrivate: false,
    isAdmin: false,
  },
  {
    path: "/admin/position",
    component: <BusinessSector />,
    isPrivate: false,
    isAdmin: false,
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
    isPrivate: true,
  },
  {
    path: "/updateJob/:jobId",
    component: <UpdateJob />,
    isPrivate: true,
  },
];
export default routes;
