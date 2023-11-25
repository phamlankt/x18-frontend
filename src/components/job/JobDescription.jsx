import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import {
  capitalizeFirstLetter,
  formatDate,
  getCityNameFromSlug,
} from "../../global/common";
import { Spin, Tag } from "antd";
import AuthContext from "../../contexts/AuthContext/AuthContext";
import AppContext from "../../contexts/AppContext/AppContext";

function JobDescription() {
  const { handlePreviousPage } = useContext(AppContext);
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const jobId = useParams().jobId;
  const [jobInfo, setJobInfo] = useState();

  useEffect(() => {
    getJobById();
  }, [jobId]);
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
                <a>Position: {jobInfo.position}</a>
              </span>
              <span className="w-25">
                <Calendar className="me-1" style={{ color: "orange" }} />
                Created: {formatDate(jobInfo.createdAt)}
              </span>
              <span className="w-25">
                <Calendar className="me-1" style={{ color: "orange" }} />
                Closing Date: {formatDate(jobInfo.deadline)}
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

          {!auth.isAuthenticated && (
            <div className="text-center mt-5 w-75">
              <button
                className="btn btn-primary fw-bold me-4 w-25"
                onClick={() => {
                  handlePreviousPage(window.location.pathname);
                  navigate("/login");
                }}
              >
                Apply Now
              </button>
              {/* <button className="btn btn-info btn-gradient ms-4" ><Share2 className="me-1" /></button> */}
            </div>
          )}
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
