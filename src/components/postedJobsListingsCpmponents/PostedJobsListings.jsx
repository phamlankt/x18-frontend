import React, { useState } from "react";
import { MapPin } from "lucide-react";
import { Settings } from "lucide-react";
import { XCircle } from "lucide-react";
import { CalendarCheck } from "lucide-react";
import { Link } from "react-router-dom";
import applicationAPI from "../../apis/applicationAPI";

const PostedJobsListings = () => {
  const DeleteRequest = (id) => {
    if (id) {
      console.log(id);
    } else {
      console.log(404);
      return;
    }
  };
  return (
    <div className="listJobRecruiter">
      <div className="list">
        <div className="topic">
          <p>Jobs postings have been created</p>
          <Link to="/createJods">+ Create job postings</Link>
        </div>
        <div className="content">
          <div className="Job">
            <div className="jobIcon">
              {[{ item: 123131 }].map((value) => (
                <div className="job" key={value.item}>
                  <img
                    src="https://static.topcv.vn/v4/image/logo/topcv-logo-6.png"
                    alt=""
                  />
                  <div>
                    <div>
                      <h5>{value.item}</h5>
                      <div>
                        <button
                          className="update"
                          onClick={() => DeleteRequest(value._id)}
                        >
                          <Settings /> Update request
                        </button>
                        <button
                          className="delete"
                          onClick={() => DeleteRequest(value._id)}
                        >
                          <XCircle /> Cancel request
                        </button>
                      </div>
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

export default PostedJobsListings;
