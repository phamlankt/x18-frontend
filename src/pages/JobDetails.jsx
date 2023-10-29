import React from "react";
import MasterLayout from "../components/layout/MasterLayout";
import JobDetailsLayout from "../components/job/JobDetailsLayout";

function JobDetails() {
  return (
    <MasterLayout
      ContentComponent={<JobDetailsLayout />}
      hasSideBar={false}
    />
  );
}

export default JobDetails;
