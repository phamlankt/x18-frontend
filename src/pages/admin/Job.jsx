import React from "react";
import AdminMasterLayout from "../../components/layout/AdminMasterLayout";
import AdminJobPage from "../../components/admin/job/AdminJobPage";

function Job() {
  return <AdminMasterLayout ContentComponent={<AdminJobPage />} />;
}

export default Job;
