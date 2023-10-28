import React, { useState } from "react";
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
import applicationAPI from "../../apis/applicationAPI";
import jobAPI from "../../apis/jobAPI";
import { Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";

const PostedJobsListings = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [spinConnect, setSpinConnect] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Do you want to delete this job?");
  const [dataJob, setDataJob] = useState([]);
  const [idToUpdate, setIdToUpdate] = useState("");
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
    jobAPI
      .getListJob()
      .then((response) => {
        console.log(response.data.data.undefined.data, 15);
        if (response.data.data.undefined.data) {
          setDataJob(response.data.data.undefined.data);
        } else {
          return;
        }
        setCheckDataJob(false);
      })
      .catch((error) => {
        console.log(error, 15);
      });
  }

  const handleMenuClick = (e) => {
    console.log("Clicked: ", e.key);
  };

  const toUpdate = () => {
    navigate(`/updateJob/${idToUpdate}`);
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
    console.log(idToUpdate);
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
      });
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
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
    <div className="listJobRecruiter">
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
      <div className="list">
        <div className="topic">
          <p>Job postings posted</p>
          <Link to="/createJods">+ Create Jobs</Link>
        </div>
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
                dataSource={dataJob}
                renderItem={(value) => (
                  <div className="job" key={value.item}>
                    <img
                      src="https://static.topcv.vn/v4/image/logo/topcv-logo-6.png"
                      alt=""
                    />
                    <div>
                      <div>
                        <h5 onClick={() => navigate(`/jobs/${value._id}`)}>
                          {value.title.length > 40
                            ? value.title.substr(0, 30) + "..."
                            : value.title}
                        </h5>
                        <div style={{ zIndex: "10" }}>
                          <Dropdown overlay={menu}>
                            <Button
                              onMouseEnter={() => setIdToUpdate(value._id)}
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
                          Status: <span>{value.status}</span>
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
  );
};

export default PostedJobsListings;
