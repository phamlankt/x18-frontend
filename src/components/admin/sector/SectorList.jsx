import React from "react";
import SectorForm from "./SectorForm";
import { Table } from "antd";

const SectorList = ({ data, loading, setCurrentPage }) => {
  const columns = [
    {
      title: "",
      dataIndex: "_id",
      key: "_id",
      render: (text, data, index) => <p>{index + 1}</p>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 250,
    },
    {
      title: "Action",
      dataIndex: "name",
      key: "name",
      render: (text, data) => <SectorForm type="update" sector={data} />,
    },
  ];

  return (
    <Table
      style={{
        width: 380,
      }}
      dataSource={data}
      columns={columns}
      loading={loading}
      pagination={{
        className: "pagination",
        pageSize: 10,
        total: data.length,
        onChange: (page) => {
          setCurrentPage(page);
        },
      }}
    />
  );
};

export default SectorList;
