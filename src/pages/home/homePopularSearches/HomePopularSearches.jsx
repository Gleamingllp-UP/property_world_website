import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPopularSearchPropertiesThunk } from "../../../features/property/propertySlice";
import { Link } from "react-router-dom";
import ImageWithLoader from "../../../Custom_Components/ImageWithLoader";
import { pageRoutes } from "../../../router/pageRoutes";

function HomePopularSearches() {
  const { popularPropertyData, isLoadingForPopular } = useSelector(
    (store) => store?.property
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPopularSearchPropertiesThunk());
  }, [dispatch]);

  return (
    <section className="popular_searches">
      <div className="container">
        <div className="text-center title_area">
          <h2>Popular Searches</h2>
        </div>
        <div className="row">
          {isLoadingForPopular ? (
            Array.from({ length: 4 })?.map((_, i) => {
              return (
                <div className="col-lg-4 mb-4" key={i}>
                  <div className="pop_search placeholder-glow border rounded h-100 m-0">
                    <div className="pop_photo m-0">
                      <div
                        className="placeholder w-100 rounded"
                        style={{ height: "140px" }}
                      ></div>
                    </div>
                    <div className="pop_data">
                      <h3 className="placeholder col-12 mb-2"></h3>
                      <p className="placeholder col-5 mb-3"></p>
                      <span className="placeholder w-100">
                        Explore Now{" "}
                        <i className="ri-arrow-right-up-long-line" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : popularPropertyData?.length > 0 ? (
            popularPropertyData?.map((item, index) => {
              return (
                <div className="col-lg-4" key={index}>
                  <div className="pop_search">
                    <div className="pop_photo">
                      <ImageWithLoader
                        src={item?.image}
                        className="img-fluid"
                      />
                    </div>
                    <div className="pop_data">
                      <h3>{item?.title ?? "N/A"}</h3>
                      <p>
                        {item?.count || 0}{" "}
                        {`Propert${item?.count > 1 ? "ies" : "y"}`}
                      </p>
                      <Link to={pageRoutes.PROPERTY_LISTING + item?.link}>
                        Explore Now{" "}
                        <i className="ri-arrow-right-up-long-line" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-12">
              <div className="text-center border border-light-subtle rounded py-3 bg-light text-muted fw-medium">
                No Popular Search Available
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default HomePopularSearches;
