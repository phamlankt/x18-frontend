import React from "react";
import AdminMasterLayout from "../../components/layout/AdminMasterLayout";
import DashboardPage from "../../components/admin/dashboard/DashboardPage";

const Dashboard = () => {
  return <AdminMasterLayout ContentComponent={<DashboardPage />} />;
};

export default Dashboard;
