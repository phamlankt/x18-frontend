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
              {dataJob.map((value) => (
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
