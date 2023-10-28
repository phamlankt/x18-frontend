import React, { useState, useRef, useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarCheck } from "lucide-react";
import { MapPin } from "lucide-react";
import { Pagination } from "antd";
import { List } from "antd";
import { useRecoilValue } from "recoil";
import Recoil from "../../recoilContextProvider";
import styled from "styled-components";
import jobAPI from "../../apis/jobAPI";
import SearchBar from "./SearchBar";
import AuthContext from "../../contexts/AuthContext/AuthContext";

export default function HomePage() {
  const navigate = useNavigate();
  const ul = useRef(null);
  const job = useRef(null);
  const changeTheFormaOfTheList = useRecoilValue(Recoil.AtomSideBar);
  const [dataJob, setDataJob] = useState([]);
  const [checkDataJob, setCheckDataJob] = useState(true);
  if (checkDataJob) {
    jobAPI
      .getAll()
      .then((response) => {
        console.log(response.data.data);
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

  const StyledUl = styled.ul`
    display: grid;
    gridtemplatecolumns: 50% 50%;
  `;
  useEffect(() => {
    ul.current = document.querySelector(".ant-list-items");
    job.current = document.querySelectorAll(".job");
    console.log(ul.current);
    if (ul.current && job.current) {
      ul.current.style.gridTemplateColumns = !changeTheFormaOfTheList
        ? "100%"
        : "";
      job.current.forEach((j) => {
        j.style.transform = !changeTheFormaOfTheList ? "scale(1)" : "";
      });
    }
  }, [changeTheFormaOfTheList]);

  const toJobDetail = (id) => {
    navigate(`/jobs/${id}`);
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
                <StyledUl>
                  <List
                    className="123"
                    itemLayout="vertical"
                    pagination={{
                      position: "center",
                    }}
                    style={{ gridTemplatecolumns: "50% 50%" }}
                    dataSource={currentItems}
                    component={StyledUl}
                    renderItem={(value) => (
                      <div
                        className="job"
                        style={{ gridTemplatecolumns: "50% 50%" }}
                        onClick={() => toJobDetail(value._id)}
                      >
                        <img
                          src="https://static.topcv.vn/v4/image/logo/topcv-logo-6.png"
                          alt=""
                        />
                        <div>
                          <h4>
                            {value.title.length > 40
                              ? value.title.substr(0, 30) + "..."
                              : value.title}
                          </h4>
                          <h6>Position: {value.position}</h6>
                          <div>
                            <p>
                              Salary:
                              <span>
                                {(() => {
                                  if (value.salary == "Negotiable") {
                                    return "Negotiable";
                                  }
                                  return `${value.salary} USD`;
                                })()}
                              </span>
                            </p>
                            <p>
                              <MapPin />
                              <span>{value.city}</span>
                            </p>
                            <p>
                              <CalendarCheck />
                              Deadline:
                              <span>
                                {(() => {
                                  const dateString = value.deadline;
                                  const date = new Date(dateString);
                                  const year = date.getFullYear();
                                  const month = date.getMonth() + 1;
                                  const day = date.getDate();
                                  return `${day}/${month}/${year}`;
                                })()}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  />
                </StyledUl>
                <Pagination
                  style={{ marginTop: "10px", display: "flex" }}
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
