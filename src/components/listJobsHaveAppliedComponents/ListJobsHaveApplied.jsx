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
  return (
    <div className="listJobApplicant">
      <div className="list">
        <p className="topic">Job postings have applied</p>
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
                      <h5>{value.item}</h5>
                      <button onClick={() => DeleteRequest(value._id)}>
                        <XCircle /> Cancel request
                      </button>
                    </div>
                    <h6>Công ty cổ phần BALA BALA</h6>
                    <div className="informationJob">
                      <p>Mức Lương : 10 - 15 triệu</p>
                      <p>
                        <MapPin />
                        Thành phố HCM
                      </p>
                      <p>
                        <CalendarCheck />
                        Hạn Nộp: 30/12/2023
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
