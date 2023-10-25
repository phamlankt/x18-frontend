import React, { useContext, useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import { capitalizeFirstLetter } from "../../global/common";
import applicationAPI from "../../apis/applicationAPI";
import { useParams } from "react-router-dom";
import AlertContext from "../../contexts/AlertContext/AlertContext";

function ApplicantsByJobId() {
  const [loading, setLoading] = useState(false);
  const { handleAlertStatus } = useContext(AlertContext);
  const jobId = useParams().jobId;
  //   const dataSource = [
  //     {
  //       key: "1",
  //       name: "Lan Pham",
  //       appliedDate: "15-10-2023",
  //       status: "sent",
  //       attachments: [
  //         { type: "CV", url: "http://localhost/cv.pdf" },
  //         { type: "cover_letter", url: "http://localhost/cover_letter.pdf" },
  //       ],
  //     },
  //     {
  //       key: "2",
  //       name: "Nhan Nguyen",
  //       appliedDate: "16-10-2023",
  //       status: "confirmed",
  //       attachments: [
  //         { type: "CV", url: "" },
  //         { type: "cover_letter", url: "" },
  //       ],
  //     },
  //     {
  //       key: "3",
  //       name: "An Trang Nguyen",
  //       appliedDate: "15-10-2023",
  //       status: "rejected",
  //       attachments: [
  //         { type: "CV", url: "" },
  //         { type: "cover_letter", url: "" },
  //       ],
  //     },
  //   ];

  const columns = [
    {
      title: "ID",
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
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, { status }) => <span>{capitalizeFirstLetter(status)}</span>,
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
                  href={attachment.url}
                >
                  {capitalizeFirstLetter(attachment.name)}
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
                onClick={() => confirmApplicant(record.applicationId)}
              >
                Confirm
              </button>
              <button
                className="btn btn-danger fw-bold"
                style={{ fontSize: "0.5vw" }}
                onClick={() => rejectApplicant(record.applicationId)}
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
    setLoading(true);
    const response = await applicationAPI.getApplicationsAndApplicants(
      jobId,
      page,
      pageSize
    );
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
  };

  const confirmApplicant = async (applicationId) => {
    setLoading(true);
    await applicationAPI.confirm({jobId,applicationId}).then(()=>{
        handleAlertStatus({
            type: "success",
            message: "Confirm application sucessfully!",
          });
          fetchRecords()
    }).catch((error) => {
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

  const rejectApplicant = async (applicationId) => {
    setLoading(true);
    await applicationAPI.reject({jobId,applicationId}).then(()=>{
        handleAlertStatus({
            type: "success",
            message: "Reject application sucessfully!",
          });
          fetchRecords()
    }).catch((error) => {
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
      <Table
        loading={loading}
        onRow={(record, index) => ({
          style: {
            background:
              record.status === "rejected"
                ? "pink"
                : record.status === "confirmed"
                ? "yellow"
                : "default",
          },
        })}
        dataSource={data}
        columns={columns}
        pagination={{
          pageSize: 10,
          position: ["topCenter", "bottomCenter"],
          total: { total },
          onChange: (page, pageSize) => {
            fetchRecords(page, pageSize);
          },
        }}
      />
    </div>
  );
}

export default ApplicantsByJobId;
