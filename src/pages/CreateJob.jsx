import React from "react";
import MasterLayout from "../components/layout/MasterLayout";
import CreateJobForm from "../components/creatJob/CreateJobForm";

function CreateJobPage() {
  return (
    <MasterLayout
      ContentComponent={<CreateJobForm />}
      hasSideBar={false}
      hasFooter={false}
    />
  );
}

export default CreateJobPage;
