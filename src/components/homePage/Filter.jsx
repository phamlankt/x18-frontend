import { Radio, Select } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import businessSectorAPI from "../../apis/businessSectorAPI";
import { useContext } from "react";
import AlertContext from "../../contexts/AlertContext/AlertContext";

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

const Filter = () => {
  const { handleAlertStatus } = useContext(AlertContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [dataSectors, setDataSectors] = useState([]);
  const [sectors, setSectors] = useState(
    searchParams.get("sector")?.split("%") || []
  );
  const [sortField, setSortField] = useState(
    searchParams.get("sortField") || ""
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "");

  const handleSortBy = (e) => {
    setSortBy(e.target.value);
  };

  const handleChangeSector = (e) => {
    setSectors(e);
  };

  const handleChangeSortField = (e) => {
    setSortField(e);
  };

  const handleSubmit = () => {
    let newParams = {};

    searchParams.forEach((value, key) => {
      newParams = {
        ...newParams,
        [key]: value,
      };
    });

    newParams.sector = sectors.join("%");
    newParams.sortField = sortField;
    newParams.sortBy = sortBy;

    if (!newParams.sector) {
      delete newParams.sector;
    }
    if (!newParams.sortField) {
      delete newParams.sortField;
    }
    if (!newParams.sortBy) {
      delete newParams.sortBy;
    }

    setSearchParams(newParams);
  };

  const data = {};
  searchParams.forEach((value, key) => {
    data[key] = value;
  });

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSubmit();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [sectors, sortField, sortBy]);

  useEffect(() => {
    const handleGetSectors = async () => {
      try {
        const res = await businessSectorAPI.getAll();
        setDataSectors(res.data?.data?.businessSectorList?.sectors);
      } catch (error) {
        handleAlertStatus({ type: "error", message: "Something went wrong" });
      }
    };
    handleGetSectors();
  }, []);

  const clearFilter = (e) => {
    e.preventDefault();
    setSectors([]);
    setSortField("createdAt");
    setSortBy("desc");
    setSearchParams({ sortField: "createdAt", sortBy: "desc" });
  };

  return (
    <form className="side-filter p-2">
      <div className="sort-wrapper w-100">
        <p>Sectors:</p>
        <Select
          mode="tags"
          style={{
            width: "100%",
            backgroundColor: "white",
            margin: " 4px 0px",
            borderRadius: "4px",
          }}
          bordered={false}
          allowClear={true}
          maxTagCount={1}
          placeholder="Choose your sectors"
          onChange={handleChangeSector}
          value={sectors}
          options={
            dataSectors
              ? dataSectors.map((sector) => ({
                  label: sector.name,
                  value: sector.name,
                }))
              : null
          }
        />
      </div>

      <div className="sort-wrapper w-100">
        <p>Sort by:</p>
        <Select
          bordered={false}
          style={{
            width: "100%",
            backgroundColor: "white",
            margin: " 4px 0px",
            borderRadius: "4px",
          }}
          placeholder="Sort feilds"
          value={sortField || "createdAt"}
          allowClear={true}
          onClear={() => {
            setSortField("");
          }}
          options={dataSorts}
          onChange={handleChangeSortField}
        />
        <Radio.Group
          className="sort-by-wrapper"
          onChange={handleSortBy}
          value={sortBy || "desc"}
        >
          <Radio value={"asc"}>Ascending</Radio>
          <Radio value={"desc"}>Descending</Radio>
        </Radio.Group>
      </div>

      <button className="clear-filter-button" onClick={clearFilter}>
        Clear filter
      </button>
    </form>
  );
};

export default Filter;
