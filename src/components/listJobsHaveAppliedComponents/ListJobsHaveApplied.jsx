import React, { useState } from "react";
import { MapPin } from "lucide-react";
import { Pagination } from "antd";
import { List } from "antd";
import { XCircle } from "lucide-react";
import applicationAPI from "../../apis/applicationAPI";
import { CalendarCheck } from "lucide-react";

const ListJobHaveApplied = () => {
  const [dataJob, setDataJob] = useState([]);
  const [checkDataJob, setCheckDataJob] = useState(true);
  if (checkDataJob) {
    applicationAPI
      .getAll()
      .then((response) => {
        console.log(response.data.data, 15);
        if (response.data.data.applicationList.data) {
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
  const DeleteRequest = (id) => {
    if (id) {
      console.log(id);
    } else {
      console.log(404);
      return;
    }
  };

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
    <div className="listJobApplicant">
      <div className="list">
        <p className="topic">Applied Jobs</p>
        <div className="content">
          <div className="Job">
            <div className="jobIcon">
              {[{ item: 123131 }].map((value) => (
                <div className="job">
                  <img
                    src="https://static.topcv.vn/v4/image/logo/topcv-logo-6.png"
                    alt=""
                  />
                  <div>
                    <div>
                      <h4>{value.item}</h4>
                      <button onClick={() => DeleteRequest(value._id)}>
                        <XCircle /> Cancel request
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
                            const salaryText1 = "10000000 VND";
                            console.log(convertSalaryText(salaryText1));
                            return convertSalaryText(salaryText1);
                          })()}
                          {/* {value.salary} */}
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

export default ListJobHaveApplied;
