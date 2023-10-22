import React from "react";
import MasterLayout from "../components/layout/MasterLayout";
import PostedJobsListings from "../components/postedJobsListingsCpmponents/PostedJobsListings";

function ListJobOfRecruiter() {
  return (
    <MasterLayout
      ContentComponent={<PostedJobsListings />}
      hasSideBar={false}
    />
  );
}

export default ListJobOfRecruiter;
