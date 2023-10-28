import React, { useState, useEffect } from "react";
import { List } from "antd";
import { useRecoilValue } from "recoil";
import Recoil from "../../recoilContextProvider";
import jobAPI from "../../apis/jobAPI";
import SearchBar from "./SearchBar";
import JobItem from "./JobItem";

export default function HomePage() {
  const openFilterBar = useRecoilValue(Recoil.AtomSideBar);
  const [dataJob, setDataJob] = useState([]);
  const [checkDataJob, setCheckDataJob] = useState(true);
  if (checkDataJob) {
    jobAPI
      .getAll()
      .then((response) => {
        setDataJob(response.data.data);
        setCheckDataJob(false);
      })
      .catch((error) => {
        console.log(error, 15);
      });
  }
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8; // Số lượng mục trên mỗi trang
  const totalItems = dataJob.length; // Tổng số mục trong danh sách của bạn
  // Tính toán mục trên trang hiện tại
  const startItemIndex = (currentPage - 1) * pageSize;
  const endItemIndex = startItemIndex + pageSize;
  const currentItems = dataJob.slice(startItemIndex, endItemIndex);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="homePage">
      <SearchBar jobCount={dataJob.length} />

      <div className="main">
        <List
          className="list"
          pagination={{
            position: "bottom",
            align: "center",
            className: "pagination",
            onChange: handlePageChange,
            pageSize,
            total: totalItems,
          }}
          grid={{ column: openFilterBar ? 1 : 2 }}
          dataSource={currentItems}
          renderItem={(value) => <JobItem job={value} />}
        />
      </div>
    </div>
  );
}
