import React from "react";
import AdminMasterLayout from "../../components/layout/AdminMasterLayout";
import AdminUser from "../../components/admin/User";

function User() {
  return <AdminMasterLayout ContentComponent={<AdminUser />} />
}

export default User;
