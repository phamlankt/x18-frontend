import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import { capitalizeFirstLetter } from "../../global/common";

function ApplicantsByJobId() {
  const [loading, setLoading] = useState(false);
  const dataSource = [
    {
      key: "1",
      name: "Lan Pham",
      appliedDate: "15-10-2023",
      status: "sent",
      attachments: [
        { type: "CV", url: "http://localhost/cv.pdf" },
        { type: "cover_letter", url: "http://localhost/cover_letter.pdf" },
      ],
    },
    {
      key: "2",
      name: "Nhan Nguyen",
      appliedDate: "16-10-2023",
      status: "confirmed",
      attachments: [
        { type: "CV", url: "" },
        { type: "cover_letter", url: "" },
      ],
    },
    {
      key: "3",
      name: "An Trang Nguyen",
      appliedDate: "15-10-2023",
      status: "rejected",
      attachments: [
        { type: "CV", url: "" },
        { type: "cover_letter", url: "" },
      ],
    },
  ];

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
              <div key={attachment.type}>
                <a
                  className="link-primary text-decoration-underline"
                  href={attachment.url}
                >
                  {capitalizeFirstLetter(attachment.type)}
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
              >
                Confirm
              </button>
              <button
                className="btn btn-danger fw-bold"
                style={{ fontSize: "0.5vw" }}
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
  useEffect(() => {
    fetchRecords(1, 10);
  }, []);
  const total = data.length;
  const fetchRecords = (page, pageSize) => {
    setLoading(true);
    console.log(page, pageSize);
    setData(dataSource);
    setLoading(false);
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
      ;
    </div>
  );
}

export default ApplicantsByJobId;
