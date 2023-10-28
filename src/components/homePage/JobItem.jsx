import React from "react";
import { formatDate, getPastTime } from "../../utils/fomatDate";
import { IoLocationOutline } from "react-icons/io5";
import { BiWindowClose } from "react-icons/bi";
import { getCity } from "../../utils/getCity";
import Recoil from "../../recoilContextProvider";
import { useRecoilValue } from "recoil";
import { BsChevronDoubleRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const JobItem = ({ job }) => {
  const openFilterBar = useRecoilValue(Recoil.AtomSideBar);
  const navigate = useNavigate();
  return (
    <div className="p-2">
      <div className="job" onClick={() => navigate(`/jobs/${job._id}`)}>
        <div className="logo">
          <img
            src="https://static.topcv.vn/v4/image/logo/topcv-logo-6.png"
            alt=""
          />
        </div>

        <div className="job-info">
          <h5>{job.title}</h5>
          <h6>
            <span>
              {(() => {
                if (job.salary === "Negotiable") {
                  return "Negotiable";
                }
                return `$${job.salary}`;
              })()}
            </span>{" "}
            | {job.position}
          </h6>
          <div>
            <p>
              <IoLocationOutline /> <span>{getCity(job.city)}</span>
            </p>
            <p>
              <BiWindowClose /> <span>{formatDate(job.deadline)}</span>
            </p>
          </div>
        </div>

        {openFilterBar && (
          <div className="added-infor">
            <p> Posted at {getPastTime(job.createdAt)}</p>
          </div>
        )}

        <div
          className="hover-info"
          onClick={() => navigate(`/jobs/${job._id}`)}
        >
          <p>
            <span>See more</span> <BsChevronDoubleRight />
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobItem;
