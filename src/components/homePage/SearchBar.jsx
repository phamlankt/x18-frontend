import React, { useEffect } from "react";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import cities from "../../global/data/VNLocaion.json";
import { useSearchParams } from "react-router-dom";
import { Select } from "antd";

const SearchBar = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [locations, setLocations] = useState(
    searchParams.get("location")?.split("%") || []
  );

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleChangeLocation = (e) => {
    setLocations(e);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    let newParams = {};

    searchParams.forEach((value, key) => {
      newParams = {
        ...newParams,
        [key]: value,
      };
    });

    newParams.search = search;
    newParams.location = locations.join("%");

    if (!newParams.search) {
      delete newParams.search;
    }
    if (!newParams.location) {
      delete newParams.location;
    }

    setSearchParams(newParams);
  };

  const data = {};
  searchParams.forEach((value, key) => {
    data[key] = value;
  });
  useEffect(() => {
    setSearch(data?.search || "");
    setLocations(data?.location?.split("%") || []);
  }, [data.search, data.location]);

  return (
    <div className="search-bar">
      <form className="search-bar-form" action="submit" onSubmit={handleSubmit}>
        <label className="search-bar-wrapper">
          <BsSearch className="text-form" />
          <input
            value={search}
            onChange={handleChangeSearch}
            type="text"
            placeholder="Enter the title job or your key words"
          />
        </label>
        <div className="search-bar-wrapper">
          <HiOutlineLocationMarker className="text-form" />

          <Select
            mode="tags"
            style={{
              width: "100%",
            }}
            bordered={false}
            allowClear={true}
            maxTagCount={2}
            placeholder="Choose your location"
            value={locations}
            onChange={handleChangeLocation}
            options={cities.map((location) => ({
              label: location.name,
              value: location.slug,
            }))}
          />
        </div>
        <button className="search-bar-submit-button">Search</button>
      </form>

      <div className="d-flex justify-content-between">
        <h5
          className="job-quantity"
          style={{ opacity: props.jobCount ? "1" : "0" }}
        >
          There are {props.jobCount} opportunities for you
        </h5>
      </div>
    </div>
  );
};

export default SearchBar;
