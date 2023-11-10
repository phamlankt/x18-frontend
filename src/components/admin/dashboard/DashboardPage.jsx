import React from "react";
import UserChart from "./UserChart";
import JobChart from "./JobChart";

const DashboardPage = () => {
  return (
    <div
      style={{
        height: "fit-content",
        padding: 50,
        gap: 20,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <UserChart />
      <JobChart />
    </div>
  );
};

export default DashboardPage;
