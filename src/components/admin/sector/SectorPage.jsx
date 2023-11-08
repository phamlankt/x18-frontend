import React, { useEffect } from "react";
import SearchSector from "./SearchSector";
import SectorList from "./SectorList";
import { useState } from "react";
import SectorForm from "./SectorForm";
import businessSectorAPI from "../../../apis/businessSectorAPI";

const SectorPage = () => {
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getData = async (e) => {
    e?.preventDefault();
    try {
      setLoading(true);
      const query = {
        search,
        currentPage,
        pageSize,
      };
      const res = await businessSectorAPI.getAll(query);

      setData(res.data?.data?.businessSectorList.sectors);
      setPageSize(res.data?.data?.businessSectorList?.pagination?.pageSize);
      setTotal(
        res.data?.data?.businessSectorList?.pagination?.totalSectorCount
      );
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    getData();
  }, [currentPage]);

  const props = {
    pageSize,
    total,
    data,
    setData,
    search,
    setSearch,
    loading,
    setLoading,
    error,
    setError,
    currentPage,
    setCurrentPage,
    getData,
  };

  if (error) {
    return <h5 className="text-center text-danger">{error}</h5>;
  }

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        gap: "8px",
        alignItems: "center",
      }}
    >
      <h1 className="text-center fs-5">Sector List</h1>
      <SearchSector {...props} />
      <SectorForm type="add" {...props} />
      <SectorList {...props} />
    </div>
  );
};

export default SectorPage;
