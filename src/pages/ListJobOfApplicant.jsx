import React from "react";
import MasterLayout from "../components/layout/MasterLayout";
import ListJobHaveApplied from "../components/listJobsHaveAppliedComponents/ListJobsHaveApplied";

function ListJobOfApplicant() {
  return (
    <MasterLayout
      ContentComponent={<ListJobHaveApplied />}
      hasSideBar={false}
    />
  );
}

export default ListJobOfApplicant;
