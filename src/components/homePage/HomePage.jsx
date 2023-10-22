import React, { useState } from "react";
import { MapPin } from "lucide-react";
import { Pagination } from "antd";
import { List } from "antd";
import jobAPI from "../../apis/jobAPI";
import SearchBar from "./SearchBar";

export default function HomePage() {
  const [dataJob, setDataJob] = useState([]);
  const [checkDataJob, setCheckDataJob] = useState(true);
  if (checkDataJob) {
    jobAPI
      .getAll()
      .then((response) => {
        console.log(response, 15);
        setDataJob(response.data.data);
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

  // "_id": "6534e9393fb81b7da9e61c97",
  // "title": "Designer",
  // "deadline": "2023-11-20T17:00:00.000Z",
  // "creator": "65290357dd680640c60dacc9",
  // "salary": "7500000 VND",
  // "location": "HCM",
  // "city": "HCM",
  // "position": "Part time",
  // "amount": 1,
  // "description": "Test job 2 from Lan",

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
                        <h5>{value.title}</h5>
                        <h6>Position: {value.position}</h6>
                        <div>
                          <p>Salary: {value.salary}</p>
                          <p>
                            <MapPin />
                            {value.city}
                          </p>
                          <p>Deadline: {value.deadline}</p>
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
