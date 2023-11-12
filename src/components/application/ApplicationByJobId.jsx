import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import applicationAPI from "../../apis/applicationAPI";
import AlertContext from "../../contexts/AlertContext/AlertContext";
import { capitalizeFirstLetter } from "../../global/common";
import { Spin } from "antd";
import ApplicationForm from "./ApplicationForm";
import {
  LoadingOutlined,
  SmileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Steps } from "antd";
import { FrownIcon } from "lucide-react";

function ApplicationByJobId({ application, setApplication, jobInfo }) {
  const { handleAlertStatus } = useContext(AlertContext);
  const jobId = useParams().jobId;
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
    <div className="ms-4 mt-4">
      <div className="d-flex align-items-center justify-content-center">
        <div className="w-50">
          {application.status === "sent" ? (
            <Steps
              items={[
                {
                  title: "Sent",
                  status: "finish",
                  icon: <UserOutlined />,
                },
                {
                  title: "Processing",
                  status: "process",
                  icon: <LoadingOutlined />,
                },
                {
                  title: "Done",
                  status: "wait",
                  icon: <SmileOutlined />,
                },
              ]}
            />
          ) : application.status === "confirmed" ? (
            <Steps
              items={[
                {
                  title: "Sent",
                  status: "finish",
                  icon: <UserOutlined />,
                },
                {
                  title: "Proccessed",
                  status: "finish",
                },
                {
                  title: "Confirmed",
                  status: "finish",
                  icon: <SmileOutlined />,
                },
              ]}
            />
          ) : application.status === "rejected" ? (
            <Steps
              items={[
                {
                  title: "Sent",
                  status: "finish",
                  icon: <UserOutlined />,
                },
                {
                  title: "Proccessed",
                  status: "finish",
                },
                {
                  title: "Rejected",
                  status: "finish",
                  icon: <FrownIcon />,
                },
              ]}
            />
          ) : (
            application.status === "cancelled" && (
              <Steps
                current={1}
                status="error"
                items={[
                  {
                    title: "Sent",
                    icon: <UserOutlined />,
                  },
                  {
                    title: "Cancelled",
                  },
                ]}
              />
            )
          )}
        </div>
      </div>

      <h6 className="fst-italic fw-light mt-4">My Documents:</h6>

      {application.documents.map((document, index) => {
        return (
          <div key={index}>
            <a
              href={document.path}
              className="text-danger text-decoration-underline"
            >
              {capitalizeFirstLetter(
                document.fileName &&
                  document.fileName.substring(
                    document.fileName.indexOf("-") + 1
                  )
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
    <ApplicationForm setApplication={setApplication} jobInfo={jobInfo} />
  );
}

export default ApplicationByJobId;
