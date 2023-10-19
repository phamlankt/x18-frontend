import React from "react";
import HomePage from "../components/homePage/HomePage";
import SearchBar from "../components/homePage/SearchBar";
import HeaderComponent from "../components/layout/Header";
import FooterComponent from "../components/layout/Footer";

function Home() {
  return (
    <div className="homePage">
      <SearchBar />
      <HomePage />
    </div>
  );
}

export default Home;
