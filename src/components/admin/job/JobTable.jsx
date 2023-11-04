import { Button, Space, Table, Tag } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/fomatDate";
import DeleteJobModal from "./DeleteJobModal";

const columns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    render: (text, record) => (
      <Link to={`/jobs/${record._id}`}>
        <span className="fw-bold">{text}</span>
      </Link>
    ),
  },
  {
    title: "Creator",
    dataIndex: ["creator", "companyName"],
    key: "creator",
  },
  {
    title: "Time",
    dataIndex: "deadline",
    key: "deadline",
    render: (text, record) => (
      <div className="text-center">
        <p className="text-success m-0">{record.createdAt}</p> -{" "}
        <p className="text-danger m-0">{record.deadline}</p>
      </div>
    ),
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "Sector",
    dataIndex: "sectors",
    key: "sectors",
    render: (sectors, record) => {
      return record.sectors.map((sector) => (
        <Tag className="m-1" color="default">
          {sector}
        </Tag>
      ));
    },
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: (status) => {
      if (status === "open") {
        return <Tag color="success">{status}</Tag>;
      }
      if (status === "closed") {
        return <Tag color="red">{status}</Tag>;
      }
      if (status === "expired") {
        return <Tag color="warning">{status}</Tag>;
      }
      if (status === "extended") {
        return <Tag color="processing">{status}</Tag>;
      }
      if (status === "removed") {
        return <Tag color="default">{status}</Tag>;
      }
    },
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <DeleteJobModal job={record} />
      </Space>
    ),
  },
];

const JobTable = ({ jobs }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const dataToRender = jobs?.map((job) => {
      return {
        ...job,
        deadline: formatDate(job.deadline),
        createdAt: formatDate(job.createdAt),
        updateDataFn: setData,
      };
    });
    setData(dataToRender);
  }, [jobs]);

  return (
    <Table
      className="w-100"
      bordered={true}
      columns={columns}
      dataSource={data}
      pagination={false}
    />
  );
};

export default JobTable;
