import React from "react";
import MasterLayout from "../components/layout/MasterLayout";
import CreateJobForm from "../components/creatJob/JobForm";

function CreateJobPage() {
  return (
    <MasterLayout
      ContentComponent={<CreateJobForm type="create" />}
      hasSideBar={false}
      hasFooter={false}
    />
  );
}

export default CreateJobPage;
