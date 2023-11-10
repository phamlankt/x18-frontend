import React from "react";
import SectorForm from "./SectorForm";
import { Table } from "antd";

const SectorList = ({
  data,
  loading,
  currentPage,
  setCurrentPage,
  pageSize,
  getData,
  total,
}) => {
  const columns = [
    {
      title: "",
      dataIndex: "_id",
      key: "_id",
      render: (text, data, index) => (
        <p>{pageSize * (currentPage - 1) + index + 1}</p>
      ),
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
      render: (text, data) => (
        <SectorForm
          key={data._id}
          type="update"
          sector={data}
          getData={getData}
        />
      ),
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
        pageSize: pageSize,
        total: total,
        onChange: (page) => {
          setCurrentPage(page);
        },
      }}
    />
  );
};

export default SectorList;
