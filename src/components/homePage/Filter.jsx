import { Radio, Select } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const dataSectors = [
  "IT",
  "Marketing",
  "Sales",
  "Finance",
  "HR",
  "Engineering",
  "Design",
];
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [sectors, setSectors] = useState([]);

  const [sortField, setSortField] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [disabled, setDisabled] = useState(true);
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
    console.log(newParams);
    setSearchParams(newParams);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSubmit();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [sectors, sortField, sortBy]);

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
        options={dataSectors.map((sector) => ({
          label: sector,
          value: sector,
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
          optionFilterProp="children"
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
