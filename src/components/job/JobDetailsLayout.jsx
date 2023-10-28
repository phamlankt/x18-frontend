import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext/AuthContext";
import JobDescription from "./JobDescription";
import { Tabs } from "antd";
import ApplicantsByJobId from "../applicant/ApplicantsByJobId";
import ApplicationByJobId from "../application/ApplicationByJobId";
import { useParams } from "react-router-dom";
import jobAPI from "../../apis/jobAPI";

function JobDetailsLayout() {
  const { auth } = useContext(AuthContext);
  const roleName = auth.user.roleName;
  const [jobInfo, setJobInfo] = useState();
  const jobId = useParams().jobId;
  
  const getJobById = async () => {
    const response = await jobAPI.getById(jobId);
    setJobInfo(response.data.data.jobInfo);
  };
  useEffect(() => {
    getJobById();
  }, []);

  console.log("jobInfo",jobInfo)
  const items = [
    {
      key: "1",
      label: "Job Description",
      children: <JobDescription />,
    },
    auth.isAuthenticated &&
    jobInfo && {
        key: "2",
        label:
          roleName === "recruiter"
            ? "Applicants"
            : roleName === "applicant" && "My Application",
        children:
          roleName === "recruiter" ? (
            <ApplicantsByJobId />
          ) : (
            roleName === "applicant" && <ApplicationByJobId />
          ),
      },
  ];
  return (
    <div className="p-2">
      {" "}
      <Tabs defaultActiveKey="1" items={items} destroyInactiveTabPane={true} />
    </div>
  );
}

export default JobDetailsLayout;
