import React, { useEffect } from "react";
import { pageRoutes } from "../../../router/pageRoutes";
import { landlord_guide } from "../../../assets/images";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBannerByTypeThunk } from "../../../features/banner/bannerSlice";

function AgentsBanner() {
  const { banners } = useSelector((store) => store?.banner);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBannerByTypeThunk("agent"));
  }, [dispatch]);
  return (
    <>
      <div
        className="inner_banner"
        style={{
          backgroundImage: `url(${banners?.imageUrl || landlord_guide})`,
        }}
      >
        <div className="container">
          <div className="buyer_d">
            <h1>{banners?.title || "Find your agent to find a home"}</h1>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="agent_agency">
          <span>
            <Link to={pageRoutes.AGENTS} className="slt">
              Agents <i className="ri-arrow-right-up-long-line"></i>
            </Link>
            <Link to={pageRoutes.AGENCIES}>
              Agencies <i className="ri-arrow-right-up-long-line"></i>
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}

export default AgentsBanner;
