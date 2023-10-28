import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import jobAPI from "../../apis/jobAPI";
import {
  BookOpen,
  Briefcase,
  Calendar,
  CircleDollarSign,
  Clock,
  Factory,
  MapPin,
  Share2,
  User,
} from "lucide-react";
import { capitalizeFirstLetter, formatDate, getCityNameFromSlug } from "../../global/common";
import { Spin, Tag } from "antd";

function JobDescription() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const jobId = useParams().jobId;
  const [jobInfo, setJobInfo] = useState();
  //   const { auth } = useContext(AuthContext);
  useEffect(() => {
    getJobById();
  }, []);
  const getJobById = async () => {
    try {
      setLoading(true);
      const response = await jobAPI.getById(jobId);
      if (response.data.data.jobInfo) {
        setJobInfo(response.data.data.jobInfo);
      }
      setLoading(false);
    } catch (error) {
      setErrorMessage(error.response.data.error);
      setLoading(false);
    }
  };

  return loading ? (
    <Spin />
  ) : (
    <div className="m-4 p-4">
      {!jobInfo ? (
        <p className="text-danger">Job Not Found</p>
      ) : (
        <>
          <div className="general_info">
            <h5 className="fw-600">{jobInfo.title.toUpperCase()}</h5>
            <div className="d-flex w-75 mt-4">
              <span className="w-25">
                <MapPin className="me-1" style={{ color: "orange" }} />
                <a>{getCityNameFromSlug(jobInfo.city)}</a>
              </span>
              <span className="w-25">
                <Briefcase className="me-1" style={{ color: "orange" }} />
                <a>{jobInfo.position}</a>
              </span>
              <span className="w-25">
                <Calendar className="me-1" style={{ color: "orange" }} />
                Created: {formatDate(jobInfo.createdAt)}
              </span>
              <span className="w-25">
                <Calendar className="me-1" style={{ color: "orange" }} />
                Deadline: {formatDate(jobInfo.deadline)}
              </span>
            </div>
            <div className="mt-3 d-flex w-75">
              <span className="w-25">
                <User className="me-1" style={{ color: "orange" }} />
                Amount: {jobInfo.amount}
              </span>
              <span className="w-25">
                <CircleDollarSign
                  className="me-1"
                  style={{ color: "orange" }}
                />
                Salary: {jobInfo.salary}
              </span>
              <span className="w-25">
                <Factory className="me-1" style={{ color: "orange" }} />
                Sectors:{" "}
                {jobInfo.sectors.map(
                  (sector, index) =>
                    sector + (index !== jobInfo.sectors.length - 1 ? ", " : "")
                )}
              </span>
              <span>
                <BookOpen className="me-1" style={{ color: "orange" }} />
                Status:{" "}
                <span className="fw-bold">
                  {capitalizeFirstLetter(jobInfo.status)}
                </span>
              </span>
            </div>
          </div>
          {/* {auth.user.roleName === "applicant" && ( */}
          <div className="text-center mt-5">
            {/* <button className="btn btn-primary fw-bold w-50 me-4">
                Apply Now
              </button> */}
            {/* <button className="btn btn-info btn-gradient ms-4" ><Share2 className="me-1" /></button> */}
          </div>
          {/* )} */}
          <div className="job_description my-4">
            <div
              dangerouslySetInnerHTML={{ __html: jobInfo.description }}
            ></div>
          </div>
        </>
      )}
    </div>
  );
}

export default JobDescription;
