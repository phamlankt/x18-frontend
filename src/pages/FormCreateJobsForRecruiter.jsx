import React from "react";
import MasterLayout from "../components/layout/MasterLayout";
import CreateJobs from "../components/formCreateJobsPostings/CreateJobs";

function FormCreateJobsForRecruiter() {
  return <MasterLayout ContentComponent={<CreateJobs />} hasSideBar={false} />;
}

export default FormCreateJobsForRecruiter;
