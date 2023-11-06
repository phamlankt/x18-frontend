import React from "react";
import AdminMasterLayout from "../../components/layout/AdminMasterLayout";
import UserList from "../../components/admin/User";

function User() {
  return <AdminMasterLayout ContentComponent={<UserList />} />
}

export default User;
