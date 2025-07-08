import React, { useCallback, useEffect, useMemo, useState } from "react";
import { agency_banner } from "../../../assets/images";
import { pageRoutes } from "../../../router/pageRoutes";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBannerByTypeThunk } from "../../../features/banner/bannerSlice";
import { fetchAllUserTypes } from "../../../features/userTypes/userTypesSlice";
import { getAllUserForWebThunk } from "../../../features/user/userSlice";
import { debounce, throttle } from "lodash";

function AgenciesBanner({ page, limit }) {
  const dispatch = useDispatch();
  const location = useLocation();

  const { banners } = useSelector((store) => store?.banner);
  const { userTypes } = useSelector((store) => store?.usersType);

  const queryParams = new URLSearchParams(location.search);
  const user_type = queryParams.get("user_type");

  const [activeId, setActiveId] = useState(user_type || "");
  const [search, setSearch] = useState("");
  const [serviceNeed, setServiceNeed] = useState("");

  useEffect(() => {
    dispatch(getBannerByTypeThunk("agency"));
    dispatch(fetchAllUserTypes());
  }, [dispatch]);

  useEffect(() => {
    if (user_type) {
      setActiveId(user_type);
    }
  }, [user_type]);

  useEffect(() => {
    if (!user_type) return;

    const debouncedFn = debounce(() => {
      dispatch(
        getAllUserForWebThunk({
          search,
          service_need: serviceNeed,
          user_type: user_type,
          page,
          limit,
        })
      );
    }, 1000);

    debouncedFn();

    return () => {
      debouncedFn.cancel();
    };
  }, [search, activeId, page, serviceNeed, dispatch, limit, user_type]);

  const throttledSearch = useMemo(() => {
    return throttle(() => {
      if (!activeId) return;
      dispatch(
        getAllUserForWebThunk({
          search,
          service_need: serviceNeed,
          user_type: activeId,
          page,
          limit,
        })
      );
    }, 2000);
  }, [dispatch, search, serviceNeed, activeId, page, limit]);

  const handleSearch = useCallback(() => {
    throttledSearch();
  }, [throttledSearch]);

  return (
    <>
      <div
        className="inner_banner"
        style={{
          backgroundImage: `url(${banners["agency"]?.imageUrl || agency_banner})`,
        }}
      >
        <div className="container">
          <div className="buyer_d">
            <div className="search_my_agent">
              <h1>
                Find the best real <span>estate companies</span>
              </h1>
              <div className="row">
                <div className="col-lg-8">
                  <div className="big_search_bb2">
                    <input
                      type="text"
                      placeholder="Enter location or company name"
                      className="search_bxi"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <i className="ri-search-line map_iic" />
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="sk_box">
                    <select
                      value={serviceNeed}
                      onChange={(e) => setServiceNeed(e.target.value)}
                    >
                      <option value="">Service needed</option>
                      <option>Residential For Sale</option>
                      <option>Residential For Rent</option>
                      <option>Commercial For Sale</option>
                      <option>Commercial For Rent</option>
                    </select>
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
                  key={usertype._id}
                  to={pageRoutes.AGENTS + `/?user_type=${usertype?._id}`}
                  // onClick={() => handleSelectedUserType(usertype?._id)}
                  className={
                    usertype?._id === user_type || usertype?._id === activeId
                      ? "slt"
                      : ""
                  }
                >
                  {usertype.name}{" "}
                  <i className="ri-arrow-right-up-long-line"></i>
                </Link>
              ))}
          </span>
        </div>
      </div>
    </>
  );
}

export default AgenciesBanner;
