import React, { useEffect } from "react";
import HomeSearch from "./HomeSearch";
import { banner_home } from "../../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { getBannerByTypeThunk } from "../../../features/banner/bannerSlice";

function HomeBanner() {
  const { banners } = useSelector((store) => store?.banner);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBannerByTypeThunk("home_page"));
    window.scrollTo(0, 0);
  }, [dispatch]);

  return (
    <div className="main_banner">
      <div
        className="banner position-relative"
        style={{
          backgroundImage: `url(${
            banners["home_page"]?.imageUrl || banner_home
          })`,
        }}
      />
      <HomeSearch />
    </div>
  );
}

export default HomeBanner;
