import React from "react";
import MasterLayout from "../components/layout/MasterLayout";
import Filter from "../components/homePage/Filter";
import HomePage from "../components/homePage/HomePage";
import CreateJobs from "../components/formCreateJobsPostings/CreateJobs";

function Home() {
  return (
    <MasterLayout
      ContentComponent={<CreateJobs />}
      SideBarComponent={<null />}
      hasSideBar={false}
    />
  );
}

export default Home;
