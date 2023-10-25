import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import MasterLayout from "../components/layout/MasterLayout";
import JobForm from "../components/creatJob/JobForm";
import AlertContext from "../contexts/AlertContext/AlertContext";
import { useContext } from "react";
import jobAPI from "../apis/jobAPI";
import { useParams } from "react-router-dom";

const UpdateJob = () => {
  const { handleAlertStatus } = useContext(AlertContext);
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleGetJob = async () => {
      try {
        setLoading(true);
        const res = await jobAPI.getById(jobId);

        const jobInfo = {
          ...res.data.data.jobInfo,
          deadline: new Date(res.data.data.jobInfo.deadline),
        };

        setJob(jobInfo);
      } catch (error) {
        console.log(error);
        handleAlertStatus({
          type: "error",
          message: error.response?.data?.message || "Something went wrong",
        });
        setError(error.response);
      } finally {
        setLoading(false);
      }
    };
    handleGetJob();
  }, []);

  if (loading) {
    return (
      <div
        className="job-form-container container-sm d-flex justify-content-center align-items-center"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.5)",
        }}
      >
        <Spinner animation="border" variant="info" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="job-form-container container-sm d-flex justify-content-center align-items-center"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.5)",
        }}
      >
        <h5 className="text-danger text-center">
          {error || "Something went wrong"}
        </h5>
      </div>
    );
  }

  return (
    <MasterLayout
      ContentComponent={<JobForm type="update" job={job} />}
      hasSideBar={false}
      hasFooter={false}
    />
  );
};

export default UpdateJob;
