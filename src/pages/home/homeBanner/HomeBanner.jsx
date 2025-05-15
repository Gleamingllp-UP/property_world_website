import React from "react";
import HomeSearch from "./HomeSearch";
import { banner_home } from "../../../assets/images";

function HomeBanner() {
  return (
    <div className="main_banner">
      <div
        className="banner position-relative"
        style={{ backgroundImage: `url(${banner_home})` }}
      />
      <HomeSearch />
    </div>
  );
}

export default HomeBanner;
