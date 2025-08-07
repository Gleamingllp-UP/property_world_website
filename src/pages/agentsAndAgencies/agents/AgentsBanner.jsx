import React, { useState, useEffect, useCallback, useMemo } from "react";
import { pageRoutes } from "../../../router/pageRoutes";
import { landlord_guide } from "../../../assets/images";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBannerByTypeThunk } from "../../../features/banner/bannerSlice";
import { getAllUserForWebThunk } from "../../../features/user/userSlice";
import {
  countries,
  languages,
} from "../../../utils/requiredFormFields/requiredproparty";
import { fetchAllUserTypes } from "../../../features/userTypes/userTypesSlice";
import { debounce, throttle } from "lodash";

function AgentsBanner({ page, limit }) {
  const dispatch = useDispatch();
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
    if (userTypes?.length > 0 && !queryUserType && !activeId) {
      setActiveId(userTypes?.[1]?._id);
    } else if (queryUserType) {
      setActiveId(queryUserType);
    }
  }, [userTypes, queryUserType, activeId]);

  useEffect(() => {
    if (!activeId) return;

    const debouncedFn = debounce(() => {
      dispatch(
        getAllUserForWebThunk({
          search,
          service_need,
          nationality,
          language,
          user_type: activeId,
          page,
          limit,
        })
      );
    }, 1000);

    debouncedFn();

    return () => {
      debouncedFn.cancel();
    };
  }, [
    search,
    activeId,
    page,
    service_need,
    nationality,
    language,
    dispatch,
    limit,
  ]);

  const throttledSearch = useMemo(() => {
    return throttle(() => {
      if (!activeId) return;
      dispatch(
        getAllUserForWebThunk({
          search,
          service_need,
          nationality,
          language,
          user_type: activeId,
          page,
          limit,
        })
      );
    }, 2000);
  }, [
    dispatch,
    search,
    service_need,
    nationality,
    language,
    activeId,
    page,
    limit,
  ]);

  const handleSearch = useCallback(() => {
    throttledSearch();
  }, [throttledSearch]);

  return (
    <>
      <div
        className="inner_banner"
        style={{
          backgroundImage: `url(${banners["agent"]?.imageUrl || landlord_guide})`,
        }}
      >
        <div className="container">
          <div className="buyer_d">
            <div className="search_my_agent">
              <h1 className="h-1">
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
                <div className="col-lg-7 select_box">
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="sk_box">
                        <select
                          value={service_need}
                          onChange={(e) => setServiceNeed(e.target.value)}
                        >
                          <option value="">Service needed</option>
                          <option value="Residential For Sale">
                            Residential For Sale
                          </option>
                          <option value="Residential For Rent">
                            Residential For Rent
                          </option>
                          <option value="Commercial For Sale">
                            Commercial For Sale
                          </option>
                          <option value="Commercial For Rent">
                            Commercial For Rent
                          </option>
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
                          {countries &&
                            countries?.map((country, i) => (
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
              ?.filter(
                (usertype) =>
                  usertype?.name === "Agent" || usertype?.name === "Agency"
              )

              ?.map((usertype) => (
                <Link
                  key={usertype?._id}
                  to={pageRoutes.AGENCIES + `/?user_type=${usertype?._id}`}
                  className={
                    usertype?._id === queryUserType ||
                    usertype?._id === activeId
                      ? "slt"
                      : ""
                  }
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

export default React.memo(AgentsBanner);
