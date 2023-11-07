import React from "react";
import AdminMasterLayout from "../../components/layout/AdminMasterLayout";
import SectorPage from "../../components/admin/sector/SectorPage";

function BusinessSector() {
  return <AdminMasterLayout ContentComponent={<SectorPage />} />;
}

export default BusinessSector;
