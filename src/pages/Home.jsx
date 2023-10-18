import React from "react";
import Header from "../components/header/Header";
import HomePage from "../components/homePage/HomePage";
import SearchBar from "../components/home/SearchBar";
import Footer from "../components/footer/Footer";

function Home() {
  return (
    <div className="homePage">
      <Header />
      <SearchBar />
      <HomePage />
      <Footer />
    </div>
  );
}

export default Home;
