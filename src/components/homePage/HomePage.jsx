import React, { useState, useEffect } from "react";
import { List } from "antd";
import { useRecoilValue, useRecoilState } from "recoil";
import Recoil from "../../recoilContextProvider";
import jobAPI from "../../apis/jobAPI";
import SearchBar from "./SearchBar";
import JobItem from "./JobItem";
import AlertContext from "../../contexts/AlertContext/AlertContext";
import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import Loading from "../layout/Loading";
import Error from "../layout/Error";

const pageSizeDefault = 10;

export default function HomePage() {
  const { handleAlertStatus } = useContext(AlertContext);
  const openFilterBar = useRecoilValue(Recoil.AtomSideBar);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [dataJob, setDataJob] = useRecoilState(Recoil.AtomDataJobs);
  const dataJobs = useRecoilValue(Recoil.AtomDataJobs);
  const [currentPage, setCurrentPage] = useState(1);
  

  const data = {};
  searchParams.forEach((value, key) => {
    data[key] = value;
  });

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const res = await jobAPI.getBySearchAndFilter({
          search: data.search || "",
          sectors: data.sector || "",
          location: data.location || "",
          sortField: data.sortField || "createdAt",
          sortBy: data.sortBy || "desc",
          currentPage: currentPage,
          pageSize: pageSizeDefault,
        });
        setDataJob(res.data.data.jobList);
      } catch (error) {
        handleAlertStatus({ type: "error", message: "Something went wrong" });
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [
    data.search,
    data.sector,
    data.location,
    data.sortField,
    data.sortBy,
    currentPage,
  ]);

  const handlePageChange = (page) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="homePage">
        <SearchBar jobCount={dataJobs?.pagination?.totalJobCount} />
        <div className="main">
          <Loading />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="homePage">
        <SearchBar jobCount={dataJobs?.pagination?.totalJobCount} />
        <div className="main">
          <Error error={error} />
        </div>
      </div>
    );
  }

  return (
    <div className="homePage">
      <SearchBar jobCount={dataJobs?.pagination?.totalJobCount} />

      <div className="main">
        <List
          className="list"
          pagination={{
            position: "bottom",
            align: "center",
            className: "pagination",
            onChange: handlePageChange,
            current: currentPage,
            pageSize: dataJobs?.pagination?.pageSize || pageSizeDefault,
            total: dataJobs?.pagination?.totalJobCount || 0,
          }}
          grid={{ column: openFilterBar ? 1 : 2 }}
          dataSource={dataJobs.jobs}
          renderItem={(value) => <JobItem job={value} />}
        />
      </div>
    </div>
  );
}
