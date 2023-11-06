import React from "react";
import AdminMasterLayout from "../../components/layout/AdminMasterLayout";
import AdminProfile from "../../components/admin/UpdateProfile";

function AdminUpdateProfile() {
    return <AdminMasterLayout ContentComponent={<AdminProfile />} />
}

export default AdminUpdateProfile;