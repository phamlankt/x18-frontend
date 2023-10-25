import React, { useContext } from "react";
import AuthContext from "../../contexts/AuthContext/AuthContext";
import JobDescription from "./JobDescription";
import { Tabs } from "antd";
import ApplicantsByJobId from "../applicant/ApplicantsByJobId";
import ApplicationByJobId from "../application/ApplicationByJobId";

function JobDetailsLayout() {
  const { auth } = useContext(AuthContext);
  const roleName = auth.user.roleName;
    const onChange = (key) => {
      console.log(key);
    };
  const items = [
    {
      key: "1",
      label: "Job Description",
      children: <JobDescription />,
    },
    auth.isAuthenticated && {
      key: "2",
      label:
        roleName === "recruiter"
          ? "Applicants"
          : roleName === "applicant" && "Applications",
      children:
        roleName === "recruiter" ? (
          <ApplicantsByJobId />
        ) : (
          roleName === "applicant" && <ApplicationByJobId />
        ),
    },
  ];
  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
}

export default JobDetailsLayout;
