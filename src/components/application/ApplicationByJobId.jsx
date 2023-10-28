import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import applicationAPI from "../../apis/applicationAPI";
import AlertContext from "../../contexts/AlertContext/AlertContext";
import { capitalizeFirstLetter, formatDate } from "../../global/common";
import { Spin } from "antd";
import ApplicationForm from "./ApplicationForm";

function ApplicationByJobId() {
  const jobId = useParams().jobId;
  const [loading, setLoading] = useState(false);
  const [application, setApplication] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const { handleAlertStatus } = useContext(AlertContext);
  useEffect(() => {
    getApplicationByJobIdAndApplicantID(1, 10);
  }, []);

  const getApplicationByJobIdAndApplicantID = async () => {
    try {
      setLoading(true);
      const response = await applicationAPI.getApplicationByJobIdForApplicant(
        jobId
      );
      if (response.data.data.applicationInfo)
        setApplication(response.data.data.applicationInfo);
      setLoading(false);
    } catch (error) {
      setErrorMessage(error.response.data.error);
      setLoading(false);
    }
  };

  return loading ? (
    <Spin />
  ) : application && application.jobId ? (
    <div>
      <h6 className="fw-bold">My Documents:</h6>
      {application.documents.map((document) => {
        return (
          <div>
            <a
              href={document.path}
              className="text-danger text-decoration-underline"
            >
              {capitalizeFirstLetter(document.name)}
            </a>
          </div>
        );
      })}
      <div className="mt-4">
        <button className="btn btn-primary">Withdraw Application</button>
      </div>
    </div>
  ) : (
    <ApplicationForm />
  );
}

export default ApplicationByJobId;
