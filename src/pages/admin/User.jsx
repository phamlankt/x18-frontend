import React from "react";
import AdminMasterLayout from "../../components/layout/AdminMasterLayout";
import UserManagementComponent from "../../components/userManagement/userManagamentComponent";
import "../../scss/_userManagement.scss"

function User() {
  return <AdminMasterLayout ContentComponent={
    <UserManagementComponent/>
  } />;
}

export default User;
