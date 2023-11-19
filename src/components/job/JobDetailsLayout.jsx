import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext/AuthContext";
import JobDescription from "./JobDescription";
import { Tabs } from "antd";
import ApplicantsByJobId from "../applicant/ApplicantsByJobId";
import ApplicationByJobId from "../application/ApplicationByJobId";
import { useParams } from "react-router-dom";
import jobAPI from "../../apis/jobAPI";
import applicationAPI from "../../apis/applicationAPI";

function JobDetailsLayout() {
  const { auth } = useContext(AuthContext);
  const roleName = auth.user.roleName;
  const [jobInfo, setJobInfo] = useState();
  const jobId = useParams().jobId;
  const [application, setApplication] = useState({});
  useEffect(() => {
    getApplicationByJobIdAndApplicantID(1, 10);
    getJobById();
  }, []);
  const onChange = (key) => {
    getJobById();
    getApplicationByJobIdAndApplicantID(1, 10);
  };
  const getApplicationByJobIdAndApplicantID = async () => {
    try {
      const response = await applicationAPI.getApplicationByJobIdForApplicant(
        jobId
      );
      if (response.data.data.applicationInfo)
        setApplication(response.data.data.applicationInfo);
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  const getJobById = async () => {
    const response = await jobAPI.getById(jobId);
    setJobInfo(response.data.data.jobInfo);
  };

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
            ? jobInfo.creator === auth.user._id && "Applicants"
            : roleName === "applicant" &&
              (application && application.jobId
                ? "My Application"
                : "Application Form"),
        children:
          roleName === "recruiter" ? (
            <ApplicantsByJobId jobTitle={jobInfo.title} />
          ) : (
            roleName === "applicant" && (
              <ApplicationByJobId
                application={application}
                setApplication={setApplication}
                jobInfo={jobInfo}
              />
            )
          ),
      },
  ];
  return (
    <div className="p-2">
      {" "}
      <Tabs
        defaultActiveKey="1"
        items={items}
        destroyInactiveTabPane={true}
        onChange={onChange}
      />
    </div>
  );
}

export default JobDetailsLayout;
