import React from "react";
import MasterLayout from "../components/layout/MasterLayout";
import Filter from "../components/homePage/Filter";
import HomePage from "../components/homePage/HomePage";

function Home() {
  return (
    <MasterLayout
      ContentComponent={<HomePage />}
      SideBarComponent={<Filter />}
    />
  );
}

export default Home;
