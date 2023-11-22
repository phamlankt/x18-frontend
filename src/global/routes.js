import BusinessSector from "../pages/admin/BusinessSector.jsx";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Profile from "../pages/Profile.jsx";
import Register from "../pages/Register.jsx";
import ResetPassword from "../pages/ResetPassword.jsx";
import ListJobOfApplicant from "../pages/ListJobOfApplicant.jsx";
import ListJobOfRecruiter from "../pages/ListJobOfRecruiter.jsx";
import CreateJobPage from "../pages/CreateJob.jsx";
import JobDetails from "../pages/JobDetails.jsx";
import UpdateJob from "../pages/UpdateJob.jsx";
import User from "../pages/admin/User.jsx";
import Job from "../pages/admin/Job.jsx";
import AdminRegister from "../pages/admin/Register.jsx";
import Dashboard from "../pages/admin/Dashboard.jsx";


export const routes = [
  {
    path: "/",
    component: <Home />,
    isPrivate: false,
  },
  {
    path: "/admin",
    component: <Dashboard />,
    isPrivate: true,
    isAdmin: true,
  },
  {
    path: "/admin/job",
    component: <Job />,
    isPrivate: true,
    isAdmin: true,
  },
  {
    path: "/admin/user",
    component: <User />,
    isPrivate: true,
    isAdmin: true,
  },
  {
    path: "/admin/register",
    component: <AdminRegister />,
    isPrivate: true,
    isAdmin: true
  },
  {
    path: "/admin/price",
    component: <BusinessSector />,
    isPrivate: true,
    isAdmin: true,
  },
  {
    path: "/admin/sector",
    component: <BusinessSector />,
    isPrivate: true,
    isAdmin: true,
  },
  {
    path: "/admin/position",
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
    isPrivate: true,
    isAdminApplicant: true,
  },
  {
    path: "/myPost",
    component: <ListJobOfRecruiter />,
    isPrivate: true,
    isAdminRecruiter: true,
  },
  {
    path: "/createJods",
    component: <CreateJobPage />,
    isPrivate: true,
    isAdminRecruiter: true,
  },
  {
    path: "/updateJob/:jobId",
    component: <UpdateJob />,
    isPrivate: true,
    isAdminRecruiter: true,
  },
];
export default routes;
