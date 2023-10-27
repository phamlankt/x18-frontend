import React from "react";
import MasterLayout from "../components/layout/MasterLayout";
import Filter from "../components/homePage/Filter";
import PostedJobsListings from "../components/postedJobsListingsCpmponents/PostedJobsListings";

function ListJobOfRecruiter() {
  return (
    <MasterLayout
      ContentComponent={<PostedJobsListings />}
      SideBarComponent={<Filter />}
    />
  );
}

export default ListJobOfRecruiter;
