import React, { useState } from "react";
import { MapPin } from "lucide-react";
import { Button, Modal } from "antd";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Pagination } from "antd";
import { List } from "antd";
import jobAPI from "../../apis/jobAPI";
import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";
import applicationAPI from "../../apis/applicationAPI";
import { CalendarCheck } from "lucide-react";
import SearchBar from "../homePage/SearchBar";

const ListJobHaveApplied = () => {
  const navigate = useNavigate();
  const [idToUpdate, setIdToUpdate] = useState("");
  const [dataJob, setDataJob] = useState([]);
  const [modalText, setModalText] = useState("Do you want to delete this job?");
  const [open, setOpen] = useState(false);
  const [spinConnect, setSpinConnect] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [checkDataJob, setCheckDataJob] = useState(true);
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 50,
        color: "black",
      }}
      spin
    />
  );
  if (checkDataJob) {
    applicationAPI
      .getAll()
      .then((response) => {
        if (response.data.applicationList.data) {
          setDataJob(response.data.data.applicationList.data);
        } else {
          return;
        }
        setCheckDataJob(false);
      })
      .catch((error) => {
        console.log(error, 15);
      });
  }

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
    setSpinConnect(true);
    setOpen(false);
    jobAPI
      .remove(idToUpdate)
      .then((response) => {
        console.log(response.data);
        setOpen(false);
        setSpinConnect(false);
      })
      .catch((error) => {
        console.log(error);
        setSpinConnect(false);
      });
  };
  const handleCancel = () => {
    setOpen(false);
  };

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
    <>
      <SearchBar jobCount={dataJob?.pagination?.totalJobCount} />
      <div className="listJobApplicant">
        {spinConnect ? (
          <div
            style={{
              zIndex: "999",
              width: "100%",
              height: "100vh",
              justifyContent: "center",
              zIndex: 50,
              marginTop: "20px",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              zIndex: 2,
              position: "absolute",
              right: "0px",
              top: 0,
            }}
          >
            <Spin indicator={antIcon} className="relative" />
          </div>
        ) : null}
        <Modal
          title="Notification"
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <p>{modalText}</p>
        </Modal>
        <div className="list">
          <p className="topic">
            Has {dataJob.length} job postings have applied
          </p>
          <div className="content">
            <div className="Job">
              <div className="jobIcon">
                <List
                  className="123"
                  itemLayout="vertical"
                  pagination={{
                    position: "center",
                  }}
                  style={{ gridTemplatecolumns: "50% 50%" }}
                  dataSource={currentItems}
                  renderItem={(value) => (
                    <div className="job">
                      <img
                        src="https://static.topcv.vn/v4/image/logo/topcv-logo-6.png"
                        alt=""
                      />
                      <div>
                        <div>
                          <h4
                            onClick={() => navigate(`/jobs/${value._id}`)}
                            style={{ cursor: "pointer" }}
                            onMouseEnter={(event) => {
                              event.target.style.color = "blue";
                            }}
                            onMouseLeave={(event) => {
                              event.target.style.color = "black";
                            }}
                          >
                            {value.title.length > 40
                              ? value.title.substr(0, 30) + "..."
                              : value.title}
                          </h4>
                          <button
                            onClick={() => showModal()}
                            onMouseEnter={() => setIdToUpdate(value._id)}
                          >
                            <XCircle /> Delete
                          </button>
                        </div>
                        <h6>
                          Position: <span>Full time</span>
                        </h6>
                        <div className="informationJob">
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
                            <span>Thành phố HCM</span>
                          </p>
                          <p>
                            <CalendarCheck />
                            Deadline: <span>30/12/2023</span>
                          </p>
                          <p style={{ width: "fit-content" }}>
                            Status:{" "}
                            <span style={{ color: "red" }}>{value.status}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                />
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
    </>
  );
};

export default ListJobHaveApplied;
