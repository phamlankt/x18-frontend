import React from "react";
import HomePage from "../components/homePage/HomePage";
import SearchBar from "../components/homePage/SearchBar";

function Home() {
  return (
    <div className="homePage">
      <SearchBar />
      <HomePage />
    </div>
  );
}

export default Home;
