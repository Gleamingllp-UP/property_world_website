import { bed, ruler } from "@/assets/images";
import { Link } from "react-router-dom";
import { pageRoutes } from "../../../router/pageRoutes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageWithLoader from "./../../../Custom_Components/ImageWithLoader";
import { getAllPropertyThunk } from "../../../features/property/propertySlice";
import { HomeCategoryPropertySkeleton } from "../../../Custom_Components/Skeleton/PropertySkeleton";
import { formatNumberWithCommas } from "../../../helper/function/formatRange";
import { formatPrice } from "../../../helper/function/formatPrice";

function HomeCategoryWiseList() {
  const { categories } = useSelector((store) => store?.activeData);
  const [selectedId, setSelectedId] = useState(null);

  const handleClick = (id) => {
    setSelectedId(id);
  };

  const dispatch = useDispatch();
  const { isLoading, propertyData = [] } = useSelector(
    (store) => store?.property
  );

  const page = 1;
  const limit = 6;

  useEffect(() => {
    if (!selectedId && categories?.length > 0) {
      const firstId = categories[0]?._id;
      setSelectedId(firstId);
    }
  }, [categories, selectedId]);

  useEffect(() => {
    if (selectedId) {
      dispatch(
        getAllPropertyThunk({
          page,
          limit,
          searchFilters: { category: selectedId },
        })
      );
    }
  }, [dispatch, selectedId]);

  return (
    <section className="buy_rent">
      <div className="container">
        <div className="text-center title_area">
          <h2>Buy - Rent</h2>
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
                {isLoading ? (
                  <HomeCategoryPropertySkeleton />
                ) : (
                  propertyData &&
                  propertyData?.map((item, index) => {
                    return (
                      <>
                        <div className="col-sm-4" key={index + 1}>
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
                              <Link
                                to={`${pageRoutes.PROPERTY_DETAILS}?id=${item?._id}`}
                              >
                                <ImageWithLoader
                                  src={item?.images?.[0]?.url}
                                  className="img-fluid"
                                />
                              </Link>
                              <div className="new_listng">
                                <div>
                                  {item?.bedrooms != null &&
                                    item?.bedrooms !== "" && (
                                      <>
                                        <img src={bed} alt="bed" />{" "}
                                        {item?.bedrooms === 0
                                          ? "Studio"
                                          : item?.bedrooms}{" "}
                                      </>
                                    )}
                                </div>
                                <div>
                                  {item?.area != null && item?.area !== "" && (
                                    <>
                                      <img src={ruler} alt="area" />{" "}
                                      {formatNumberWithCommas(item?.area)} Sq Ft
                                    </>
                                  )}
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
                                  <i className="ri-eye-line" /> {item?.address}
                                </div>
                              </div>
                              <div className="action_p">
                                <div className="list_ppc">
                                  {" "}
                                  {formatPrice(item?.price)}
                                </div>
                                <div>
                                  <Link
                                    to={`${pageRoutes.PROPERTY_DETAILS}?id=${item?._id}`}
                                  >
                                    Read More{" "}
                                    <i className="ri-arrow-right-up-long-line" />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })
                )}
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
