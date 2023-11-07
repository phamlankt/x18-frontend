import React, { useEffect } from "react";
import SearchSector from "./SearchSector";
import SectorList from "./SectorList";
import { useState } from "react";
import { async } from "rxjs";
import SectorForm from "./SectorForm";

const dataSource = [
  {
    _id: "1",
    name: "IT",
  },
  {
    _id: "2",
    name: "HR",
  },
  {
    _id: "3",
    name: "Marketing",
  },
  {
    _id: "4",
    name: "Finance",
  },
  {
    _id: "5",
    name: "Art",
  },
  {
    _id: "6",
    name: "Education",
  },
];

const SectorPage = () => {
  const [data, setData] = useState(dataSource);
  const [Search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const getData = async (e) => {
    e?.preventDefault();
    try {
      setLoading(true);
      ///// call api
      if (Search === "") {
        setData(dataSource);
        return;
      }
      const res = data.filter((el) =>
        el.name.toLowerCase().includes(Search.toLowerCase())
      );
      setData(res);
      //////
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const props = {
    data,
    setData,
    Search,
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
    return <h1>{error}</h1>;
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
      <SectorForm type="add" />
      <SectorList {...props} />
    </div>
  );
};

export default SectorPage;
