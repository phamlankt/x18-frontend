import React, { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import { Settings } from "lucide-react";
import { XCircle } from "lucide-react";
import { History } from "lucide-react";
import { CalendarCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Pagination } from "antd";
import { List } from "antd";
import SearchBar from "../homePage/SearchBar";
import applicationAPI from "../../apis/applicationAPI";
import Loading from "../layout/Loading";
import jobAPI from "../../apis/jobAPI";
import { Dropdown, Menu } from "antd";
import { useSearchParams } from "react-router-dom";
import { useContext } from "react";
import { DownOutlined } from "@ant-design/icons";
import AlertContext from "../../contexts/AlertContext/AlertContext";

const pageSizeDefault = 10;

const PostedJobsListings = () => {
  const navigate = useNavigate();
  const { handleAlertStatus } = useContext(AlertContext);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [spinConnect, setSpinConnect] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [modalText, setModalText] = useState("Do you want to delete this job?");
  const [dataJob, setDataJob] = useState([]);
  const [jobId, setjobId] = useState("");
  const [checkDataJob, setCheckDataJob] = useState(true);
  const [currentPageToFilter, setCurrentPageToFilter] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 50,
        color: "black",
      }}
      spin
    />
  );

  const handleMenuClick = (e) => {
    console.log("Clicked: ", e.key);
  };

  const toUpdate = () => {
    navigate(`/updateJob/${jobId}`);
  };

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
    console.log(jobId);
    try {
      jobAPI
        .remove({ jobId })
        .then((response) => {
          setOpen(false);
          setSpinConnect(false);
          setCheckDataJob(true);
          if (checkDataJob) {
            try {
              jobAPI
                .getListJob()
                .then((response) => {
                  if (response.data.data.undefined.data) {
                    setLoading(false);
                    setSpinConnect(false);
                    setDataJob(response.data.data.undefined.data);
                  } else {
                    return;
                  }
                  setCheckDataJob(false);
                })
                .catch((error) => {
                  console.log(error, 15);
                  setCheckDataJob(false);
                });
            } catch (e) {
              console.log(e);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const data = {};
  searchParams.forEach((value, key) => {
    data[key] = value;
  });

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const res = await jobAPI.getBySearchAndFilter({
  //         search: data.search || "",
  //         sectors: data.sector || "",
  //         location: data.location || "",
  //         sortField: data.sortField || "createdAt",
  //         sortBy: data.sortBy || "desc",
  //         currentPage: currentPageToFilter,
  //         pageSize: pageSizeDefault,
  //       });
  //       console.log(res.data.data.jobList.jobs);
  //       setDataJob(res.data.data.jobList.jobs);
  //     } catch (error) {
  //       setError(error.response.data.message);
  //       handleAlertStatus({ type: "error", message: "Something went wrong" });
  //     } finally {
  //       return;
  //     }
  //   };
  //   getData();
  // }, [
  //   data.search,
  //   data.sector,
  //   data.location,
  //   data.sortField,
  //   data.sortBy,
  //   currentPageToFilter,
  // ]);

  if (checkDataJob) {
    try {
      jobAPI
        .getListJob()
        .then((response) => {
          if (response.data.data.undefined.data) {
            setLoading(false);
            setSpinConnect(false);
            setDataJob(response.data.data.undefined.data);
          } else {
            return;
          }
          setCheckDataJob(false);
        })
        .catch((error) => {
          console.log(error, 15);
          setCheckDataJob(false);
        });
    } catch (e) {
      console.log(e);
    }
  }

  const pageSize = 5; // Số lượng mục trên mỗi trang
  const totalItems = dataJob.length; // Tổng số mục trong danh sách của bạn
  // Tính toán mục trên trang hiện tại
  const startItemIndex = (currentPage - 1) * pageSize;
  const endItemIndex = startItemIndex + pageSize;
  const currentItems = dataJob.slice(startItemIndex, endItemIndex);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const menu = (
    <Menu onClick={handleMenuClick} className="menu">
      <button className="update" onClick={() => toUpdate()}>
        <History /> Update
      </button>
      <button onClick={showModal} className="delete">
        <XCircle /> Delete
      </button>
      <Modal
        title="Notification"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </Menu>
  );

  return (
    <>
      <SearchBar jobCount={dataJob?.pagination?.totalJobCount} />
      <div className="listJobRecruiter">
        {spinConnect ? (
          <div
            style={{
              zIndex: "999",
              width: "100%",
              height: "100vh",
              justifyContent: "center",
              zIndex: 50,
              marginTop: "-30px",
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
        <div className="list">
          <div className="topic">
            <p>Has posted {dataJob.length} jobs</p>
            <Link to="/createJods">+ Create Jobs</Link>
          </div>
          <div className="content">
            <div className="Job">
              {!loading ? (
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
                      <div className="job" key={value.item}>
                        <img
                          src="https://static.topcv.vn/v4/image/logo/topcv-logo-6.png"
                          alt=""
                          className="w-40 h-40"
                        />
                        <div>
                          <div>
                            <h5
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
                            </h5>
                            <div style={{ zIndex: "10" }}>
                              <Dropdown overlay={menu}>
                                <Button
                                  onMouseEnter={() => setjobId(value._id)}
                                >
                                  <Settings />
                                </Button>
                              </Dropdown>
                            </div>
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
                              Hạn Nộp: <span>30/12/2023</span>
                            </p>
                            <p style={{ width: "fit-content" }}>
                              Status:{" "}
                              <span style={{ color: "red" }}>
                                {value.status}
                              </span>
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
              ) : (
                <Loading />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostedJobsListings;
