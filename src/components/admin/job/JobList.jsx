import { Button, Col, Input, Pagination, Row, Select, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import React from "react";
import { useState } from "react";
import AlertContext from "../../../contexts/AlertContext/AlertContext";
import { useContext } from "react";
import { useEffect } from "react";
import businessSectorAPI from "../../../apis/businessSectorAPI";
import jobAPI from "../../../apis/jobAPI";
import JobTable from "./JobTable";

const statuses = ["open", "closed", "expired", "extended", "removed"];
const dataSorts = [
  {
    label: "Created Date",
    value: "createdAt",
  },
  {
    label: "Updated Date",
    value: "updatedAt",
  },
  {
    label: "Expired Date",
    value: "deadline",
  },
  {
    label: "Number of applicants",
    value: "amount",
  },
];

const JobList = ({ currentUser }) => {
  const { handleAlertStatus } = useContext(AlertContext);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dataSectors, setDataSectors] = useState([]);
  const [jobList, setJobList] = useState([]);

  const [search, setSearch] = useState("");
  const [sector, setSector] = useState("");
  const [status, setStatus] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortBy, setSortBy] = useState("");

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleSeachChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSectorChange = (value) => {
    setSector(value);
  };
  const handleStatusChange = (value) => {
    setStatus(value);
  };
  const handleChangeSortField = (e) => {
    setSortField(e);
  };
  const handleChangeSortBy = (e) => {
    setSortBy(e);
  };
  const handleClearFilter = () => {
    setCurrentPage(1);
    setSearch("");
    setSector("");
    setStatus("");
    setSortField("");
    setSortBy("");
  };
  const getJob = async (query) => {
    try {
      setLoading(true);
      const res = await jobAPI.getJobByUserId(query);
      setJobList(res.data?.data?.jobList);
    } catch (error) {
      handleAlertStatus({ type: "error", message: "Something went wrong" });
      setErr(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleGetSectors = async () => {
      try {
        setLoading(true);
        const res = await businessSectorAPI.getAll();
        setDataSectors(res.data?.data?.businessSectorList?.sectors);
      } catch (error) {
        setErr(error?.response?.data?.message);
        handleAlertStatus({ type: "error", message: "Something went wrong" });
      } finally {
        setLoading(false);
      }
    };
    handleGetSectors();
  }, []);

  useEffect(() => {
    const deboundFn = setTimeout(() => {
      getJob({
        userId: currentUser,
        search: search,
        sectors: sector,
        status,
        sortField: sortField,
        sortBy: sortBy,
        currentPage: currentPage,
        pageSize: 10,
      });
    }, 500);
    return () => clearTimeout(deboundFn);
  }, [currentUser, search, sector, status, sortField, sortBy, currentPage]);

  if (err) {
    return <p className="m-2 text-red">{err}</p>;
  }

  return (
    <div className="px-5">
      <Row>
        <Col span={6} className="px-2">
          <Input
            className="w-100"
            name="search-job"
            placeholder="Enter title job"
            onChange={handleSeachChange}
            value={search}
            suffix={
              <Tooltip title="Find job by title">
                <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
              </Tooltip>
            }
          />
        </Col>

        <Col span={6} className="px-2">
          <Select
            className="w-100"
            mode="tag"
            showSearch={true}
            allowClear={true}
            placeholder="Select a sector"
            onChange={handleSectorChange}
            value={sector || undefined}
            options={dataSectors.map((sector) => ({
              label: sector.name,
              value: sector.name,
            }))}
          />
        </Col>

        <Col span={6} className="px-2">
          <Select
            className="w-100"
            name="sort-fields"
            placeholder="Sort feilds"
            value={sortField || undefined}
            allowClear={true}
            onChange={handleChangeSortField}
            options={dataSorts}
          />
        </Col>

        <Col span={6} className="px-2">
          <Select
            name="sort-by"
            className="w-100"
            placeholder="Sort by"
            value={sortBy || undefined}
            allowClear={true}
            onChange={handleChangeSortBy}
            options={[
              {
                label: "Acending",
                value: "asc",
              },
              {
                label: "Descending",
                value: "desc",
              },
            ]}
          />
        </Col>
      </Row>
      <Row className="mt-2">
        <Col span={6} className="px-2">
          <Select
            className="w-100"
            mode="tag"
            showSearch={true}
            allowClear={true}
            placeholder="Select status"
            value={status || undefined}
            onChange={handleStatusChange}
            options={statuses.map((status) => ({
              label: status[0].toUpperCase() + status.slice(1),
              value: status,
            }))}
          />
        </Col>

        <Col span={6} className="px-2">
          <Button type="primary" danger onClick={handleClearFilter}>
            Clear Filter
          </Button>
        </Col>
      </Row>
      <Row
        className="hide-scrollbar px-2"
        style={{
          width: "100%",
          margin: "2em 0px",
        }}
      >
        <JobTable
          currentUser={currentUser}
          loading={loading}
          jobs={jobList.jobs}
        />
        <div className="w-100 mt-2 d-flex justify-content-center">
          <Pagination
            defaultCurrent={1}
            current={currentPage}
            total={jobList?.pagination?.totalJobCount || 0}
            pageSize={jobList?.pagination?.pageSize || 10}
            showSizeChanger={false}
            onChange={handlePageChange}
            position="bottom"
            align="center"
            className="pagination"
          />
        </div>
      </Row>
    </div>
  );
};

export default JobList;
