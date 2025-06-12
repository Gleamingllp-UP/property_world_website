import {
  bed,
  propert1,
  ruler,
  propert2,
  propert3,
  propert4,
  propert5,
  propert6,
  pro_comm1,
  pro_comm2,
  pro_comm3,
  pro_comm4,
  pro_comm5,
  pro_comm6,
} from "@/assets/images";
import { Link } from "react-router-dom";
import { pageRoutes } from "../../../router/pageRoutes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageWithLoader from "./../../../Custom_Components/ImageWithLoader";
import { getAllPropertyThunk } from "../../../features/property/propertySlice";

function HomeCategoryWiseList() {
  const { categories, location } = useSelector((store) => store?.activeData);
  const [selectedId, setSelectedId] = useState(null);

  const handleClick = (id) => {
    setSelectedId(id);
  };
  const dispatch = useDispatch();
  const { isLoading, propertyData = [] } = useSelector(
    (store) => store?.property
  );

  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [features, setFeatures] = useState("");
  const limit = 6;

  const searchFilters = {
    category: selectedId,
  };

  useEffect(() => {
    if (selectedId) {
      dispatch(
        getAllPropertyThunk({
          page,
          limit,
          searchFilters,
          sort_by: sortBy,
          features,
        })
      );
    }
  }, [dispatch, page, location.search, sortBy, features, selectedId]);

  useEffect(() => {
    if (categories && categories.length > 0) {
      const ids = categories.map((item) => item?._id);
      setSelectedId(ids?.[0]);
    }
  }, [categories]);

  return (
    <section className="buy_rent">
      <div className="container">
        <div className="text-center title_area">
          <h2>Buy - Rent - Commercial </h2>
        </div>
        <div className="">
          <nav className="list_ui">
            <div className="nav nav-tabs mb-3" id="nav-tab" role="tablist">
              {categories &&
                categories?.map((item) => (
                  <button
                    key={item?._id}
                    className={`nav-link ${
                      item?._id === selectedId ? "active" : ""
                    }`}
                    id="nav-commercial -tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-commercial "
                    type="button"
                    role="tab"
                    aria-controls="nav-rent"
                    aria-selected="false"
                    onClick={() => handleClick(item._id)}
                  >
                    {item?.name}{" "}
                  </button>
                ))}
            </div>
          </nav>
          <div className="tab-content " id="nav-tabContent">
            <div
              className="tab-pane fade active show"
              id="nav-buy"
              role="tabpanel"
              aria-labelledby="nav-buy-tab"
            >
              <div className="row">
                {propertyData &&
                  propertyData?.map((item) => {
                    return (
                      <>
                        <div className="col-sm-4">
                          <div className="my_property">
                            <div className="photo_my_photo">
                              <span
                                className="buy"
                                style={{
                                  backgroundColor:
                                    item?.categoryData?.name === "Rent"
                                      ? "#e9012b"
                                      : "#8BC34A",
                                }}
                              >
                                {item?.categoryData?.name}
                              </span>
                              <a href="property-details.php">
                                <img
                                  src={item?.images?.[0]?.url}
                                  className="img-fluid"
                                />
                              </a>
                              <div className="new_listng">
                                <div>
                                  <img src={bed} /> Studio{" "}
                                </div>
                                <div>
                                  <img src={ruler} /> 481Sq Ft{" "}
                                </div>
                              </div>
                            </div>
                            <div className="property_data">
                              <div className="lease">
                                <span>{item?.duration} Years</span>
                              </div>
                              <h4>{item?.title}</h4>
                              <div className="pro_diss">
                                <p>{item?.short_description}</p>
                              </div>
                              <div className="other_data_list">
                                <div className="loction_c">
                                  <i className="ri-map-pin-line" /> UAE
                                </div>
                                <div>
                                  <i className="ri-eye-line" /> Dubai Sports
                                  City
                                </div>
                              </div>
                              <div className="action_p">
                                <div className="list_ppc">
                                  {" "}
                                  AED {item?.price}{" "}
                                </div>
                                <div>
                                  <a href="property-details.php">
                                    Read More{" "}
                                    <i className="ri-arrow-right-up-long-line" />
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>
              <div className="col-12 text-center">
                <Link
                  to={pageRoutes.PROPERTY_LISTING}
                  className="action_btn mt20"
                >
                  View All Properties{" "}
                  <i className="ri-arrow-right-up-long-line" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeCategoryWiseList;
