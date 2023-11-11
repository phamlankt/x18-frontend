import React from "react";
import AdminMasterLayout from "../../components/layout/AdminMasterLayout";
import RegisterAdmin from "../../components/admin/Register";

function AdminRegister() {
    return <AdminMasterLayout ContentComponent={<RegisterAdmin />} />
}

export default AdminRegister;