import React from "react";
import MasterLayout from "../components/layout/MasterLayout";
import Filter from "../components/homePage/Filter";
import ListJobHaveApplied from "../components/listJobsHaveAppliedComponents/ListJobsHaveApplied";

function ListJobOfApplicant() {
  return (
    <MasterLayout
      ContentComponent={<ListJobHaveApplied />}
      SideBarComponent={<Filter />}
    />
  );
}

export default ListJobOfApplicant;
