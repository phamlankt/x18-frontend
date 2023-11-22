import React, { useContext, useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import { capitalizeFirstLetter, formatDate } from "../../global/common";
import applicationAPI from "../../apis/applicationAPI";
import { useParams } from "react-router-dom";
import AlertContext from "../../contexts/AlertContext/AlertContext";
import AuthContext from "../../contexts/AuthContext/AuthContext";

function ApplicantsByJobId({ jobTitle }) {
  const [loading, setLoading] = useState(false);
  const { handleAlertStatus } = useContext(AlertContext);
  const { auth, socket } = useContext(AuthContext);
  const jobId = useParams().jobId;
  const [errorMessage, setErrorMessage] = useState("");

  const columns = [
    {
      title: "No.",
      dataIndex: "id",
      key: "id",
      render: (id, record, index) => {
        ++index;
        return index;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Applied Date",
      dataIndex: "appliedDate",
      key: "appliedDate",
      render: (_, { appliedDate }) => <span>{formatDate(appliedDate)}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, { status }) => (
        <Tag
          bordered={false}
          color={
            status === "rejected"
              ? "error"
              : status === "cancelled"
              ? "warning"
              : status === "confirmed"
              ? "cyan"
              : "processing"
          }
        >
          <span className="fw-bold">{capitalizeFirstLetter(status)}</span>
        </Tag>
      ),
    },
    {
      title: "Attachments",
      key: "attachments",
      dataIndex: "attachments",
      render: (_, { attachments }) => (
        <>
          {attachments.map((attachment) => {
            return (
              <div key={attachment.name}>
                <a
                  className="link-primary text-decoration-underline"
                  href={attachment.path}
                >
                  {capitalizeFirstLetter(
                    attachment.fileName.substring(
                      attachment.fileName.indexOf("-") + 1
                    )
                  )}
                </a>
              </div>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          {record.status === "sent" && (
            <>
              <button
                className="btn btn-primary fw-bold"
                style={{ fontSize: "0.5vw" }}
                onClick={() =>
                  ConfirmOrRejectApplication(
                    record.applicationId,
                    record.applicantId,
                    "confirmed"
                  )
                }
              >
                Confirm
              </button>
              <button
                className="btn btn-danger fw-bold"
                style={{ fontSize: "0.5vw" }}
                onClick={() =>
                  ConfirmOrRejectApplication(
                    record.applicationId,
                    record.applicantId,
                    "rejected"
                  )
                }
              >
                Reject
              </button>
            </>
          )}
        </Space>
      ),
    },
  ];
  const [data, setData] = useState([]);

  const total = data.length;

  useEffect(() => {
    fetchRecords(1, 10);
  }, []);

  const fetchRecords = async (page, pageSize) => {
    try {
      setLoading(true);
      const response = await applicationAPI.getApplicationsAndApplicants(
        jobId,
        page,
        pageSize
      );
      if (response.status !== 200) setData([]);
      else {
        const result = response.data.data.data;
        if (result.length > 0) {
          const applicantList = result.map((applicant, index) => {
            return {
              key: index + 1,
              name: applicant.applicant.fullName
                ? applicant.applicant.fullName
                : "No name",
              applicationId: applicant.application._id,
              appliedDate: applicant.application.createdAt,
              status: applicant.application.status,
              attachments: applicant.application.documents,
            };
          });
          setData(applicantList);
          setLoading(false);
        }
      }
    } catch (error) {
      setErrorMessage(error.response.data.error);
      setLoading(false);
    }
  };

  const ConfirmOrRejectApplication = async (
    applicationId,
    applicantId,
    status
  ) => {
    // setLoading(true);
    await applicationAPI
      .updatStatusByRecruiter({ jobId, applicationId, status })
      .then((result) => {
        handleAlertStatus({
          type: "success",
          message: `Application is ${status} sucessfully!`,
        });
        socket.emit("sendApplicationEvent", {
          recruiter: auth.user.email,
          applicant: result.data.data.applicationInfo.applicantId,
          jobId,
          jobTitle,
          applicationId,
          status,
        });
        // fetchRecords();
        const updatedData = data.map((application) => {
          if (application.applicationId === applicationId) {
            return { ...application, status };
          }
          return application;
        });
        setData(updatedData);
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

  return (
    <div className="m-4">
      {errorMessage ? (
        <p className="text-danger">{capitalizeFirstLetter(errorMessage)}</p>
      ) : (
        <Table
          loading={loading}
          dataSource={data}
          columns={columns}
          pagination={{
            pageSize: 10,
            position: ["bottomCenter"],
            total: { total },
            onChange: (page, pageSize) => {
              fetchRecords(page, pageSize);
            },
          }}
        />
      )}
    </div>
  );
}

export default ApplicantsByJobId;
