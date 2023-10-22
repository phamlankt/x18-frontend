import React, { useState } from "react";
import { MapPin } from "lucide-react";
import { Pagination } from "antd";
import { List } from "antd";
import applicationAPI from "../../apis/applicationAPI";
import SearchBar from "./SearchBar";

export default function HomePage() {
  const [dataJob, setDataJob] = useState([]);
  const [checkDataJob, setCheckDataJob] = useState(true);
  if (checkDataJob) {
    applicationAPI
      .getAll()
      .then((response) => {
        console.log(response, 15);
        setDataJob(response.data.data.applicationList.data);
        setCheckDataJob(false);
      })
      .catch((error) => {
        console.log(error, 15);
      });
  }
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4; // Số lượng mục trên mỗi trang
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
      <SearchBar />
      <div
        style={{ display: "grid", justifyContent: "center", height: "700px" }}
      >
        <div className="homePage">
          <div className="main">
            <div className="Job">
              <div className="jobIcon">
                <List
                  pagination={{ position: "center" }}
                  dataSource={currentItems}
                  renderItem={(value) => (
                    <div className="job">
                      <img
                        src="https://static.topcv.vn/v4/image/logo/topcv-logo-6.png"
                        alt=""
                      />
                      <div>
                        <h5>{value.item}</h5>
                        <h6>Công ty cổ phần BALA BALA</h6>
                        <div>
                          <p>Mức Lương : 10 - 15 triệu</p>
                          <p>
                            <MapPin />
                            Thành phố HCM
                          </p>
                          <p>Hạn Nộp: 30/12/2023</p>
                        </div>
                      </div>
                    </div>
                  )}
                />
                <Pagination
                  style={{ marginTop: "10px" }}
                  current={currentPage}
                  pageSize={pageSize}
                  total={totalItems}
                  onChange={handlePageChange}
                  position="center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
