import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import MasterLayout from "../components/layout/MasterLayout";
import JobForm from "../components/creatJob/JobForm";
import AlertContext from "../contexts/AlertContext/AlertContext";
import { useContext } from "react";
import jobAPI from "../apis/jobAPI";
import { useParams } from "react-router-dom";
import Loading from "../components/layout/Loading";
import Error from "../components/layout/Error";

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
      <MasterLayout
        ContentComponent={<Loading />}
        hasSideBar={false}
        hasFooter={false}
      />
    );
  }

  if (error) {
    return (
      <MasterLayout
        ContentComponent={<Error error={error} />}
        hasSideBar={false}
        hasFooter={false}
      />
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
