import { Space, Table, Tag, Tooltip } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/fomatDate";
import DeleteJobModal from "./DeleteJobModal";

const columnsData = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    align: "left",
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
    align: "center",
  },
  {
    title: "Time",
    dataIndex: "deadline",
    key: "deadline",
    align: "center",
    render: (text, record) => (
      <p
        className="text-center m-0"
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px",
        }}
        key={text}
      >
        <span className="text-success m-0">{record.createdAt}</span> -{" "}
        <span className="text-danger m-0">{record.deadline}</span>
      </p>
    ),
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
    align: "left",
  },
  {
    title: "Sector",
    dataIndex: "sectors",
    key: "sectors",
    align: "center",
    render: (sectors, record) => {
      return record.sectors.map((sector, index) => (
        <Tag className="m-1" color="default" key={index}>
          {sector}
        </Tag>
      ));
    },
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    align: "center",
    render: (status, record) => {
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
        return (
          <Tooltip
            placement="topLeft"
            title={record.removeDescription}
            arrow={true}
            style={{ cursor: "pointer" }}
          >
            <Tag style={{ cursor: "pointer" }} color="default">
              {status}
            </Tag>
          </Tooltip>
        );
      }
    },
  },
  {
    title: "Action",
    key: "action",
    align: "center",
    render: (text, record) => (
      <Space size="middle" key={record._id}>
        <DeleteJobModal job={record} />
      </Space>
    ),
  },
];

const JobTable = ({ jobs, loading, currentUser }) => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState(columnsData);

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

    let newColunms = columnsData;

    if (currentUser) {
      newColunms = newColunms.filter((col) => col.key !== "creator");
      newColunms = newColunms.map((col) => {
        if (col.key === "deadline") {
          return {
            ...col,
            width: 200,
          };
        }
        return col;
      });
    }

    setColumns(newColunms);
  }, [jobs]);

  return (
    <Table
      className="w-100"
      style={{ minWidth: "850px" }}
      sticky={{ offsetHeader: 0 }}
      bordered={true}
      columns={columns}
      dataSource={data}
      pagination={false}
      loading={loading}
    />
  );
};

export default JobTable;
