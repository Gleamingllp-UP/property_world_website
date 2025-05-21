import React, { useEffect } from "react";
import { agency_banner } from "../../../assets/images";
import { pageRoutes } from "../../../router/pageRoutes";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBannerByTypeThunk } from "../../../features/banner/bannerSlice";
function AgenciesBanner() {
  const { banners } = useSelector((store) => store?.banner);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBannerByTypeThunk("agency"));
  }, [dispatch]);
  return (
    <>
      <div
        className="inner_banner"
        style={{
          backgroundImage: `url(${banners?.imageUrl || agency_banner})`,
        }}
      >
        <div className="container">
          <div className="buyer_d">
            <h1>{banners?.title || "Find the best real estate companies"}</h1>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="agent_agency">
          <span>
            <Link to={pageRoutes.AGENTS}>
              Agents <i className="ri-arrow-right-up-long-line"></i>
            </Link>
            <Link to={pageRoutes.AGENCIES} className="slt">
              Agencies <i className="ri-arrow-right-up-long-line"></i>
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}

export default AgenciesBanner;
