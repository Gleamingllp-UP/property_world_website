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
import { bath } from "../../../assets/images";
import { getQuarterFromDate } from "../../../helper/function/generateHandoverOptions";
import PaymentPlanPopover from "../../property/categoryWiseList/PaymentPlanPopover";
import { getPaymentPlanBreakdown } from "../../../helper/function/getPaymentPlanBreakdown";

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
  const limit = 7;

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
          searchFilters: { category: selectedId, is_featured: "false" },
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
              <div className="row align-items-stretch">
                {isLoading ? (
                  <HomeCategoryPropertySkeleton />
                ) : propertyData?.length > 0 ? (
                  propertyData?.slice(0, 6)?.map((item, index) => {
                    const { downPayment, onConstruction, onHandover } =
                      getPaymentPlanBreakdown(item?.payment_plan);

                    return (
                      <div
                        className="col-lg-4 col-md-6 col-sm-4 d-flex"
                        key={index + 1}
                      >
                        <div className="my_property w-100">
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
                              {item?.bathrooms != null &&
                                item?.bathrooms !== "" && (
                                  <div>
                                    <img src={bath} alt="bed" />{" "}
                                    {item?.bathrooms}{" "}
                                  </div>
                                )}
                              {item?.bedrooms != null &&
                                item?.bedrooms !== "" && (
                                  <div>
                                    <img src={bed} alt="bed" />{" "}
                                    {item?.bedrooms === 0
                                      ? "Studio"
                                      : item?.bedrooms}{" "}
                                  </div>
                                )}

                              {item?.area != null && item?.area !== "" && (
                                <div>
                                  <img src={ruler} alt="area" />{" "}
                                  {formatNumberWithCommas(item?.area)} Sq Ft
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="property_data">
                            {item?.duration && (
                              <div className="lease">
                                <span>{item?.duration ?? "N/A"}</span>
                              </div>
                            )}

                            <h4>{item?.title ?? "N/A"}</h4>
                            <div className="pro_diss">
                              <p>{item?.short_description ?? "N/A"}</p>
                            </div>
                            <div className="other_data_list">
                              <div className="loction_c">
                                <i className="ri-map-pin-line" /> UAE
                              </div>
                              <div>
                                <i className="ri-eye-line" />{" "}
                                {item?.address ?? "N/A"}
                              </div>
                            </div>
                            {item?.handover_by !== "" &&
                              item?.payment_plan !== "" &&
                              item?.payment_plan !== null &&
                              item?.handover_by !== null && (
                                <div
                                  className="payment_plan d-flex bg-light rounded border my-2 flex-wrap align-items-center"
                                  style={{ width: "100%" }}
                                >
                                  <div
                                    className="rounded px-3 py-2 text-center child_payment_plan"
                                    style={{ flex: "0 0 40%" }}
                                  >
                                    <div className="text-uppercase small text-secondary fw-semibold">
                                      Handover
                                    </div>
                                    <div className="fw-bold">
                                      {getQuarterFromDate(item?.handover_by)}
                                    </div>
                                  </div>

                                  {/* Divider */}
                                  <div
                                    className="d-none d-md-block"
                                    style={{
                                      width: "1px",
                                      height: "40px",
                                      backgroundColor: "#ccc",
                                      margin: "0 8px",
                                    }}
                                  />

                                  <div
                                    className=" rounded px-3 py-2 text-center child_payment_plan"
                                    style={{ flex: "0 0 53%" }}
                                  >
                                    <div className="text-uppercase small text-secondary fw-semibold d-flex justify-content-center align-items-center gap-1">
                                      <span>Payment Plan</span>
                                      <PaymentPlanPopover
                                        payment={item?.payment_plan}
                                      />
                                    </div>
                                    <div className="fw-bold">
                                      {downPayment + onConstruction}/
                                      {onHandover}
                                    </div>
                                  </div>
                                </div>
                              )}
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
                    );
                  })
                ) : (
                  <div className="col-12">
                    <div className="text-center border border-light-subtle rounded py-3 bg-light text-muted fw-medium">
                      No Data Available
                    </div>
                  </div>
                )}
              </div>

              {propertyData && propertyData?.length > 6 && (
                <div className="col-12 text-center">
                  <Link
                    to={
                      pageRoutes.PROPERTY_LISTING + `/?category=${selectedId}`
                    }
                    className="action_btn mt20"
                  >
                    View All Properties{" "}
                    <i className="ri-arrow-right-up-long-line" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeCategoryWiseList;
