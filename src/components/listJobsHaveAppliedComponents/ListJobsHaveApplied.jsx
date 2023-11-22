import React, { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import { Modal } from "antd";
import { useSearchParams } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Pagination } from "antd";
import { List } from "antd";
import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";
import { formatDate } from "../../utils/fomatDate";
import { CalendarCheck } from "lucide-react";
import applicationAPI from "../../apis/applicationAPI";
import { useContext } from "react";
import AlertContext from "../../contexts/AlertContext/AlertContext";
import { getCity } from "../../utils/getCity";
import jobAPI from "../../apis/jobAPI";
import SearchBar from "../homePage/SearchBar";
import Loading from "../layout/Loading";
import AuthContext from "../../contexts/AuthContext/AuthContext";
import { capitalizeFirstLetter } from "../../global/common";

let pageSizeDefault = 1;

const ListJobHaveApplied = () => {
  const navigate = useNavigate();
  const { auth, socket } = useContext(AuthContext);
  const { handleAlertStatus } = useContext(AlertContext);
  const [applicationId, setapplicationId] = useState("");
  const [dataJob, setDataJob] = useState([]);
  const [modalText, setModalText] = useState(
    "Do you really want to cancel this application ?"
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [spinConnect, setSpinConnect] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [checkDataJob, setCheckDataJob] = useState(true);
  const [saveDataApplicant, setSaveDataApplicant] = useState([]);
  const [currentJob, setCurrentJob] = useState();
  const data = {};
  searchParams.forEach((value, key) => {
    data[key] = value;
  });
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 50,
        color: "black",
      }}
      spin
    />
  );

  const showModal = (currentJob) => {
    setOpen(true);
    setCurrentJob(currentJob);
  };
  const handleOk = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
    setSpinConnect(true);
    setOpen(false);
    applicationAPI
      .cancel({ applicationId })
      .then(() => {
        socket.emit("sendApplicationEvent", {
          recruiter: currentJob.creator,
          applicant: auth.user.email,
          jobId: currentJob._id,
          jobTitle: currentJob.title,
          applicationId,
          status: "cancelled",
        });
        applicationAPI
          .getAll()
          .then((res) => {
            setOpen(false);
            setSpinConnect(false);
            if (res.data.data.applicationList.data) {
              setDataJob(res.data.data.applicationList.data);
            } else {
              return;
            }
            setCheckDataJob(false);
          })
          .catch((error) => {
            console.log(error, 15);
          });
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
  // SEARCH AND FILTER
  useEffect(() => {
    const getData = async () => {
      if (
        window.location.href === `${process.env.REACT_APP_BASE_URL}/myListJob`
      ) {
        try {
          const res = await applicationAPI.getAll();
          if (res.data.data.applicationList.data) {
            setDataJob(res.data.data.applicationList.data);
            setSaveDataApplicant(res.data.data.applicationList.data);
            setLoading(false);
            return;
          } else {
            return;
          }
        } catch (error) {
          console.log(error);
          return;
        }
      }
      try {
        const res = await jobAPI.getBySearchAndFilter({
          search: data.search || "",
          sectors: data.sector || "",
          location: data.location || "",
          sortField: data.sortField || "createdAt",
          sortBy: data.sortBy || "desc",
          pageSize: pageSizeDefault,
          currentPage: currentPage,
        });
        const dataFilter = res.data.data.jobList.jobs;
        const filteredArray = saveDataApplicant.filter((obj1) => {
          return dataFilter.some((obj2) => {
            return obj2._id === obj1.job._id;
          });
        });
        setDataJob(filteredArray);
      } catch (error) {
        handleAlertStatus({ type: "error", message: "Something went wrong" });
      } finally {
        return;
      }
    };
    getData();
  }, [data.search, data.sector, data.location, data.sortField, data.sortBy]);

  return (
    <>
      <SearchBar jobCount={dataJob?.pagination?.totalJobCount} />
      <div className="listJobApplicant">
        {spinConnect ? (
          <div
            style={{
              zIndex: "999",
              width: "100%",
              height: "120vh",
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
                      <div className="job">
                        <img src={value.companyLogoUrl} alt="" />
                        <div>
                          <div>
                            <h4
                              onClick={() => navigate(`/jobs/${value.job._id}`)}
                              style={{ cursor: "pointer" }}
                            >
                              <span
                                onMouseEnter={(event) => {
                                  event.target.style.color = "blue";
                                }}
                                onMouseLeave={(event) => {
                                  event.target.style.color = "black";
                                }}
                              >
                                {value.job.title.length > 10
                                  ? value.job.title.substr(0, 10) + "..."
                                  : value.job.title}{" "}
                              </span>
                              <span
                                style={{ fontSize: "15px", color: "red" }}
                                onMouseEnter={(event) => {
                                  event.target.style.color = "blue";
                                }}
                                onMouseLeave={(event) => {
                                  event.target.style.color = "red";
                                }}
                              >
                                | Date Submitted :{" "}
                                {formatDate(value.job.createdAt)}
                              </span>
                            </h4>
                            {value.status === "sent" ? (
                              <div>
                                <button
                                  className="CancelButton"
                                  onClick={() => showModal(value.job)}
                                  onMouseEnter={() =>
                                    setapplicationId(value._id)
                                  }
                                >
                                  <XCircle /> Cancel
                                </button>
                              </div>
                            ) : (
                              <div className="NotificationButton text-info fw-bold">
                                {capitalizeFirstLetter(value.status)}
                              </div>
                            )}
                          </div>
                          <h6>
                            Position: <span>{value.job.position}</span>
                          </h6>
                          <div className="informationJob">
                            <p>
                              Salary:
                              <span>
                                {(() => {
                                  if (value.job.salary == "Negotiable") {
                                    return "Negotiable";
                                  }
                                  return `${value.job.salary} USD`;
                                })()}
                              </span>
                            </p>
                            <p>
                              <MapPin />
                              <span>{getCity(value.job.city)}</span>
                            </p>
                            <p>
                              <CalendarCheck />
                              Deadline:
                              <span>{formatDate(value.job.deadline)}</span>
                            </p>
                            <p style={{ width: "fit-content" }}>
                              Status:
                              <span style={{ color: "red" }}>
                                {value.job.status}
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

export default React.memo(ListJobHaveApplied);
