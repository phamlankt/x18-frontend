import React, { useState } from "react";
import { MapPin } from "lucide-react";
import { Settings } from "lucide-react";
import { XCircle } from "lucide-react";
import { History } from "lucide-react";
import { CalendarCheck } from "lucide-react";
import { Link } from "react-router-dom";
import applicationAPI from "../../apis/applicationAPI";
import jobAPI from "../../apis/jobAPI";
import { Dropdown, Button, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";

const PostedJobsListings = () => {
  const [dataJob, setDataJob] = useState([]);
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

  const menu = (
    <Menu onClick={handleMenuClick} className="menu">
      <button className="update">
        <History /> Update
      </button>
      <button className="delete" onClick={() => DeleteRequest(11)}>
        <XCircle /> Delete
      </button>
    </Menu>
  );

  function convertSalaryText(salaryText) {
    if (salaryText.endsWith(" USD")) {
      // Xóa đuôi ' USD' để chỉ lấy số
      const numberPart = salaryText.replace(" USD", "");

      // Nếu giá trị chứa dấu '-' thì chuyển đổi thành dạng 'X-Y thousand USD'
      if (numberPart.includes("-")) {
        const [start, end] = numberPart.split("-");
        return `${start / 1000}-${end / 1000} thousand USD`;
      } else {
        // Nếu không, chuyển đổi thành dạng 'X thousand USD'
        return `${numberPart / 1000} thousand USD`;
      }
    }
    // Kiểm tra nếu salaryText có dạng '5000000-7000000 VND'
    if (salaryText.includes("-")) {
      const [min, max] = salaryText.split("-");
      const formattedMin = formatNumber(min);
      const formattedMax = formatNumber(max);
      return `${formattedMin} - ${formattedMax} VND`;
    }
    // Kiểm tra nếu salaryText có dạng '7000000 VND'
    if (!isNaN(parseInt(salaryText))) {
      const formattedSalary = formatNumber(salaryText);
      return `${formattedSalary} VND`;
    }
    // Trả về salaryText không thay đổi nếu không áp dụng được quy tắc
    return salaryText;
  }

  function formatNumber(number) {
    let formattedNumber = "";
    formattedNumber = (parseFloat(number) / 1000000).toFixed(1);
    formattedNumber += " million";
    return formattedNumber;
  }

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
                      <h5>{value.item}</h5>
                      <div>
                        <Dropdown overlay={menu}>
                          <Button>
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
