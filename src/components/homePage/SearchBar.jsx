import React from "react";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import cities from "../../global/data/VNLocaion.json";
import { useSearchParams } from "react-router-dom";
import { Select } from "antd";

const SearchBar = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [locations, setLocations] = useState([]);

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
    console.log(newParams);
    setSearchParams(newParams);
  };
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
            onChange={handleChangeLocation}
            options={cities.map((location) => ({
              label: location.name,
              value: location.slug,
            }))}
          />
        </div>
        <button className="search-bar-submit-button">Search</button>
      </form>
      {props.jobCount && (
        <h5 className="job-quantity">
          There are {props.jobCount} opportunities for you
        </h5>
      )}
    </div>
  );
};

export default SearchBar;
