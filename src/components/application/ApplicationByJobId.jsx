import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import applicationAPI from "../../apis/applicationAPI";
import AlertContext from "../../contexts/AlertContext/AlertContext";
import { capitalizeFirstLetter, formatDate } from "../../global/common";
import { Spin } from "antd";
import ApplicationForm from "./ApplicationForm";

function ApplicationByJobId() {
  const { handleAlertStatus } = useContext(AlertContext);
  const jobId = useParams().jobId;
  const [loading, setLoading] = useState(false);
  const [application, setApplication] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

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
  const withdrawApplication = async (applicationId) => {
    // setLoading(true);
    await applicationAPI
      .cancel({ applicationId })
      .then(() => {
        setApplication({ ...application, status: "cancelled" });
        handleAlertStatus({
          type: "success",
          message: "Withdraw application sucessfully!",
        });
      })
      .catch((error) => {
        handleAlertStatus({
          type: "error",
          message: error.response.data.message,
        });
        console.log(error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return loading ? (
    <Spin />
  ) : application && application.jobId ? (
    <div className="ms-4">
      <div className="d-flex">
        <h6 className="fst-italic fw-light">Status: </h6>
        <span className="ms-1">{application.status}</span>
      </div>
      <h6 className="fst-italic fw-light">My Documents:</h6>

      {application.documents.map((document) => {
        return (
          <div>
            <a
              href={document.path}
              className="text-danger text-decoration-underline"
            >
              {capitalizeFirstLetter(
                document.fileName.substring(document.fileName.indexOf("-") + 1)
              )}
            </a>
          </div>
        );
      })}
      {application.status === "sent" && (
        <div className="mt-4">
          <button
            onClick={() => withdrawApplication(application._id)}
            className="btn btn-primary"
          >
            Withdraw Application
          </button>
        </div>
      )}
    </div>
  ) : (
    <ApplicationForm setApplication={setApplication} />
  );
}

export default ApplicationByJobId;
