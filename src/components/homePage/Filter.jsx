import { Radio, Select } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import jobAPI from "../../apis/jobAPI";
import Recoil from "../../recoilContextProvider";
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
    label: "Amount of applications",
    value: "amount",
  },
];

const Filter = () => {
  const { handleAlertStatus } = useContext(AlertContext);
  const [dataJob, setDataJob] = useRecoilState(Recoil.AtomDataJobs);
  const [searchParams, setSearchParams] = useSearchParams();
  const [dataSectors, setDataSectors] = useState([]);
  const [sectors, setSectors] = useState(
    searchParams.get("sector")?.split("%") || []
  );
  const [sortField, setSortField] = useState(
    searchParams.get("sortField") || ""
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "");
  const [disabled, setDisabled] = useState(
    searchParams.get("sortField") ? false : true
  );
  const checkDisable = (sortFieldValue) => {
    if (!sortFieldValue) {
      setSortBy("");
      setDisabled(true);
    }
    if (sortFieldValue) {
      setSortBy("asc");
      setDisabled(false);
    }
  };

  const handleSortBy = (e) => {
    setSortBy(e.target.value);
  };

  const handleChangeSector = (e) => {
    setSectors(e);
  };
  const handleChangeSortField = (e) => {
    setSortField(e);
    checkDisable(e);
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
    try {
      jobAPI
        .getBySearchAndFilter(newParams)
        .then((response) => {
          console.log(response.data.jobList.jobs);
          if (response.data.jobList.jobs) {
            setDataJob(response.data.jobList.jobs);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
    setSearchParams(newParams);
  };

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
        setDataSectors(res.data.data.businessSectorList);
      } catch (error) {
        handleAlertStatus({ type: "error", message: "Something went wrong" });
      }
    };
    handleGetSectors();
  }, []);

  return (
    <form className="side-filter p-2">
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
        options={dataSectors.map((sector) => ({
          label: sector.name,
          value: sector.name,
        }))}
      />

      <div className="sort-wrapper w-100">
        <Select
          bordered={false}
          style={{
            width: "100%",
            backgroundColor: "white",
            margin: " 4px 0px",
            borderRadius: "4px",
          }}
          placeholder="Sort feilds"
          value={sortField || undefined}
          allowClear={true}
          onClear={() => {
            setSortField("");
            checkDisable("");
          }}
          options={dataSorts}
          onChange={handleChangeSortField}
        />
        <Radio.Group
          className="sort-by-wrapper"
          onChange={handleSortBy}
          value={sortBy}
        >
          <Radio value={"asc"} disabled={disabled}>
            Ascending
          </Radio>
          <Radio value={"desc"} disabled={disabled}>
            Descending
          </Radio>
        </Radio.Group>
      </div>
    </form>
  );
};

export default Filter;
