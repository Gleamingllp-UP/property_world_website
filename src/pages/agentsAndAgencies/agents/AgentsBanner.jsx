import React, { useState, useEffect } from "react";
import { pageRoutes } from "../../../router/pageRoutes";
import { landlord_guide } from "../../../assets/images";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBannerByTypeThunk } from "../../../features/banner/bannerSlice";
import { getAllUserForWebThunk } from "../../../features/user/userSlice";
import { countries, languages } from "../../../utils/requiredFormFields/requiredproparty";
import { fetchAllUserTypes } from "../../../features/userTypes/userTypesSlice";

function AgentsBanner() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const queryUserType = queryParams.get("user_type");

  const [search, setSearch] = useState("");
  const [service_need, setServiceNeed] = useState("");
  const [nationality, setNationality] = useState("");
  const [language, setLanguage] = useState("");
  const [activeId, setActiveId] = useState(queryUserType || "");

  const { banners } = useSelector((store) => store?.banner);
  const { userTypes } = useSelector((store) => store?.usersType);

  useEffect(() => {
    dispatch(getBannerByTypeThunk("agent"));
    dispatch(fetchAllUserTypes());
  }, [dispatch]);

  useEffect(() => {
    if (queryUserType) {
      setActiveId(queryUserType);
      dispatch(
        getAllUserForWebThunk({
          search,
          service_need,
          nationality,
          language,
          user_type: queryUserType,
          page: 1,
          limit: 8,
        })
      );
    }
  }, [queryUserType]);

  const handleSearch = () => {
    dispatch(
      getAllUserForWebThunk({
        search,
        service_need,
        nationality,
        language,
        user_type: activeId,
        page: 1,
        limit: 8,
      })
    );
    navigate(`${location.pathname}?user_type=${activeId}`);
  };

  const handleSelectedUserType = (userTypeId, name) => {
    setActiveId(userTypeId);

    const route =
      name === "Agent"
        ? `${pageRoutes.AGENTS}?user_type=${userTypeId}`
        : `${pageRoutes.AGENCIES}?user_type=${userTypeId}`;

    dispatch(
      getAllUserForWebThunk({
        search,
        service_need,
        nationality,
        language,
        user_type: userTypeId,
        page: 1,
        limit: 8,
      })
    );

    navigate(route);
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
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      type="text"
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
                        <select
                          value={service_need}
                          onChange={(e) => setServiceNeed(e.target.value)}
                        >
                          <option value="">Service needed</option>
                          <option value="Residential For Sale">Residential For Sale</option>
                          <option value="Residential For Rent">Residential For Rent</option>
                          <option value="Commercial For Sale">Commercial For Sale</option>
                          <option value="Commercial For Rent">Commercial For Rent</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="sk_box">
                        <select
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                        >
                          <option value="">Language</option>
                          {languages.map((lang, i) => (
                            <option key={i} value={lang}>
                              {lang}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="sk_box">
                        <select
                          value={nationality}
                          onChange={(e) => setNationality(e.target.value)}
                        >
                          <option value="">Nationality</option>
                          {countries.map((country, i) => (
                            <option key={i} value={country}>
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
                    <button onClick={handleSearch}>Search</button>
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
              ?.filter((usertype) => usertype?.name === "Agent" || usertype?.name === "Agency")
              ?.map((usertype) => (
                <Link
                  key={usertype?._id}
                  to="#"
                  className={usertype?._id === activeId ? "slt" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSelectedUserType(usertype?._id, usertype?.name);
                  }}
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
