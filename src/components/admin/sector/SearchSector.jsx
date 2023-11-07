import { Button, Input } from "antd";
import React from "react";

const SearchSector = ({ search, setSearch, getData }) => {
  return (
    <form
      style={{
        display: "flex",
        gap: "12px",
        width: 380,
      }}
    >
      <Input
        style={{
          flex: "1 1 auto",
        }}
        placeholder="Type your key word"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button type="primary" onClick={getData}>
        Search
      </Button>
    </form>
  );
};

export default SearchSector;
