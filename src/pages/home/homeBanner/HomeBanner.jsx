import React from "react";
import HomeSearch from "./HomeSearch";
import { home_banner } from "@/assets/images";

function HomeBanner() {
  return (
    <div className="main_banner">
      <div
        className="banner position-relative"
        style={{ backgroundImage: `url(${home_banner})` }}
      />
      <HomeSearch />
    </div>
  );
}

export default HomeBanner;
