import React, { useState, useEffect } from "react";
import { pageRoutes } from "../../../router/pageRoutes";
import { landlord_guide } from "../../../assets/images";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBannerByTypeThunk } from "../../../features/banner/bannerSlice";
import { countries, languages } from "../../../utils/requiredFormFields/requiredproparty";

function AgentsBanner() {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const { banners } = useSelector((store) => store?.banner);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBannerByTypeThunk("agent"));
  }, [dispatch]);

 

  const handleChange = (e) => {
    setSelectedLanguage(e.target.value);
  };
const [nationality, setNationality] = useState("");

  const handleCountry = (e) => {
    setNationality(e.target.value);
  };
  return (
    <>
      <div className="inner_banner" style={{ backgroundImage: `url(${banners?.imageUrl || landlord_guide})` }}>
        <div className="container">
          <div className="buyer_d">
            <div className="search_my_agent">
              <h1>Find your agent to <span>find a home</span></h1>
              <div className="row">
                <div className="col-lg-4">
                  <div className="big_search_bb2">
                    <input type="text" name="Search" placeholder="Enter location or agent name" className="search_bxi" />
                    <i className="ri-search-line map_iic" />
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="row">
                    <div className="col-lg-4">
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
                    <div className="col-lg-4">
                      <div className="sk_box">
                        <select value={selectedLanguage} onChange={handleChange}>
                          {languages && languages?.map((lang, index) => (
                            <option key={index} value={lang === "Language" ? "" : lang}>
                              {lang}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="sk_box">
          <select id="nationality" name="nationality" value={nationality} onChange={handleCountry}>
      <option value="">Nationality</option>
      {countries && countries?.map((country) => (
        <option key={country} value={country}>
          {country}
        </option>
      ))}
    </select>
                      </div>
                    </div>
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
