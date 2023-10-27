import React, { useState } from "react";
import { MapPin } from "lucide-react";
import { Settings } from "lucide-react";
import { XCircle } from "lucide-react";
import { History } from "lucide-react";
import { CalendarCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";
import applicationAPI from "../../apis/applicationAPI";
import jobAPI from "../../apis/jobAPI";
import { Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";

const PostedJobsListings = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Do you want to delete this job?");
  const [dataJob, setDataJob] = useState([]);
  const [idToUpdate, setIdToUpdate] = useState("");
  const [checkDataJob, setCheckDataJob] = useState(true);
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
  const DeleteRequest = (id) => {
    if (id) {
      console.log(id);
    } else {
      console.log(404);
      return;
    }
  };

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
    jobAPI
      .remove(idToUpdate)
      .then((response) => {
        console.log(response.data);
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
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
      <div className="list">
        <div className="topic">
          <p>Job postings posted</p>
          <Link to="/createJods">+ Create Jobs</Link>
        </div>
        <div className="content">
          <div className="Job">
            <div className="jobIcon">
              {dataJob.map((value) => (
                <div className="job" key={value.item}>
                  <img
                    src="https://static.topcv.vn/v4/image/logo/topcv-logo-6.png"
                    alt=""
                  />
                  <div>
                    <div>
                      <h5>{value.title}</h5>
                      <div style={{ zIndex: "10" }}>
                        <Dropdown overlay={menu}>
                          <Button onMouseEnter={() => setIdToUpdate(value._id)}>
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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostedJobsListings;
