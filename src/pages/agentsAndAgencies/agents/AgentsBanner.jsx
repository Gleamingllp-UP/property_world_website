import React, { useState, useEffect } from "react";
import { pageRoutes } from "../../../router/pageRoutes";
import { landlord_guide } from "../../../assets/images";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBannerByTypeThunk } from "../../../features/banner/bannerSlice";
import {
  countries,
  languages,
} from "../../../utils/requiredFormFields/requiredproparty";
import { fetchAllUserTypes } from "./../../../features/userTypes/userTypesSlice";

function AgentsBanner() {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [activeId, setActiveId] = useState(null);
  const { userTypes } = useSelector((store) => store?.usersType);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const user_type = queryParams.get("user_type");

  const { banners } = useSelector((store) => store?.banner);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBannerByTypeThunk("agent"));
    dispatch(fetchAllUserTypes());
  }, [dispatch]);

  useEffect(() => {
    if (userTypes?.length > 0 && !activeId) {
      setActiveId(userTypes?.[0]._id);
    }
  }, [userTypes, activeId]);

  const handleChange = (e) => {
    setSelectedLanguage(e.target.value);
  };
  const [nationality, setNationality] = useState("");

  const handleCountry = (e) => {
    setNationality(e.target.value);
  };

  const handleSelectedUserType = (userType) => {
    console.log(userType);

    setActiveId(userType);
  };

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
            <div className="search_my_agent">
              <h1>
                Find your agent to <span>find a home</span>
              </h1>
              <div className="row">
                <div className="col-lg-4">
                  <div className="big_search_bb2">
                    <input
                      type="text"
                      name="Search"
                      placeholder="Enter location or agent name"
                      className="search_bxi"
                    />
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
                        <select
                          value={selectedLanguage}
                          onChange={handleChange}
                        >
                          {languages &&
                            languages?.map((lang, index) => (
                              <option
                                key={index}
                                value={lang === "Language" ? "" : lang}
                              >
                                {lang}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="sk_box">
                        <select
                          id="nationality"
                          name="nationality"
                          value={nationality}
                          onChange={handleCountry}
                        >
                          <option value="">Nationality</option>
                          {countries &&
                            countries?.map((country) => (
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
            {userTypes
              ?.filter(
                (usertype) =>
                  usertype?.name === "Agent" || usertype?.name === "Agency"
              )
              ?.map((usertype, index) => (
                <Link
                  to={
                    usertype?.name === "Agent"
                      ? pageRoutes.AGENTS + `/?user_type=${usertype?._id}`
                      : pageRoutes.AGENCIES + `/?user_type=${usertype?._id}`
                  }
                  onClick={() => handleSelectedUserType(usertype?._id)}
                  className={
                    usertype?._id ===  user_type ? "slt" : ""
                  }
                  key={index}
                >
                  {usertype?.name}{" "}
                  <i className="ri-arrow-right-up-long-line"></i>
                </Link>
              ))}
          </span>
        </div>
      </div>
    </>
  );
}

export default AgentsBanner;
