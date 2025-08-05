import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllActiveLocationThunk } from "../../../features/activeData/activeDataSlice";
import { Link, useLocation } from "react-router-dom";
import { pageRoutes } from "../../../router/pageRoutes";

const ArchiveLocation = () => {
  const { location, isLoadingLocation } = useSelector(
    (store) => store?.activeData
  );
  const [showAll, setShowAll] = useState(false);
  const dispatch = useDispatch();

  const fullListRef = useRef(null);

  const location2 = useLocation();
  const queryParams = new URLSearchParams(location2.search);
  const searchtext = queryParams.get("search");

  useEffect(() => {
    dispatch(getAllActiveLocationThunk());
  }, [dispatch]);

  return (
    <div className="all_location">
      {isLoadingLocation ? (
        <ul id="myList">
          {Array.from({ length: 5 }).map((_, index) => (
            <li key={index} className="mb-2">
              <span className="placeholder-glow d-block">
                <span
                  className="placeholder col-11 bg-secondary-subtle rounded"
                  style={{ height: 16 }}
                ></span>
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <>
          <div
            className={`location-collapse ${showAll ? "expanded" : ""}`}
            ref={fullListRef}
          >
            <ul id="myList">
              {location?.map((loca, index) => (
                <li key={index}>
                  <Link
                    className={`${
                      loca?.name === searchtext ? "bg-danger text-white" : ""
                    }`}
                    to={`${pageRoutes.PROPERTY_LISTING}/?search=${loca?.name}`}
                  >
                    {loca?.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {location?.length > 5 && (
            <button
              id="toggleLocationsBtn"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Less locations" : "View all locations"}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ArchiveLocation;
