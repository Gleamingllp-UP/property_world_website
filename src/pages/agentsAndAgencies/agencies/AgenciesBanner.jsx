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
              <div className="search_my_agent">
                <h1>Find the best real <span>estate companies</span></h1>
                <div className="row">
                  <div className="col-lg-8">
                    <div className="big_search_bb2">
                      <input type="text" name="Search" placeholder="Enter location or company name" className="search_bxi" />
                      <i className="ri-search-line map_iic" />
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="sk_box">
                      <select>
                        <option>Service needed</option>
                        <option>Residential For Sale</option>
                        <option>Residential For Rent</option>
                        <option>Commercial For Sale</option>
                        <option>Commercial For Rent</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-1">
                    <div className="search_btn">
                      <button>Search</button>
                    </div>
                  </div>
                </div>
              </div>
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
