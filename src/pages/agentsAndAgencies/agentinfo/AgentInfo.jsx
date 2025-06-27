import React, { useCallback, useEffect, useState } from "react";
import AgentInfoside from "./AgentInfoside";
import { Link, useLocation } from "react-router-dom";
import {
  bath,
  bed,
  property_world_logo,
  ruler,
} from "../../../assets/images";
import "../../../assets/css/arrow.css";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { PropertyListingCardSkeleton } from "../../../Custom_Components/Skeleton/PropertySkeleton";
import { pageRoutes } from "../../../router/pageRoutes";
import ImageWithLoader from "../../../Custom_Components/ImageWithLoader";
import { formatPrice } from "../../../helper/function/formatPrice";
import { formatNumberWithCommas } from "../../../helper/function/formatRange";
import CheckedModal from "../../property/categoryWiseList/CheckedModal";
import { getUserAllDetailsForWebWithPropertiesThunk } from "../../../features/user/userSlice";
import { CustomPagination } from "./../../../Custom_Components/CustomPagination";
import { throttle } from "lodash";
import { showToast } from "../../../utils/toast/toast";
import { addOrRemoveFavouritePropertyThunk } from "../../../features/property/propertySlice";
import NearbyPlaces from "../../property/categoryWiseList/NearbyPlaces";
import { ChevronLeft, ChevronRight } from "lucide-react";
const AgentInfo = () => {
  const [modalShow, setModalShow] = useState(false);

  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const limit = 6;
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("user_id");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getUserAllDetailsForWebWithPropertiesThunk({
        id,
        page,
        limit,
        sort_by: sortBy,
      })
    );
  }, [dispatch, id, page, limit, sortBy]);
  const {
    isLoading,
    agentOrAgencyDetails,
    pagination = {},
  } = useSelector((store) => store?.user);

  const { userData } = useSelector((store) => store?.user);

  // Custom arrow components
  const NextArrow = ({ onClick }) => (
    <div className="custom-arrow next" onClick={onClick}>
      <ChevronRight strokeWidth={2} size={15} />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div className="custom-arrow prev" onClick={onClick}>
      <ChevronLeft strokeWidth={2} size={15} />
    </div>
  );

  const handleLikeToggle = async (id) => {
    try {
      showToast("Wait", "loading");
      const resultAction = await dispatch(
        addOrRemoveFavouritePropertyThunk(id)
      );
      if (addOrRemoveFavouritePropertyThunk.fulfilled.match(resultAction)) {
        showToast(resultAction?.payload?.message, "success");
        dispatch(
          getUserAllDetailsForWebWithPropertiesThunk({
            id: queryParams.get("user_id"),
            page,
            limit,
            sort_by: sortBy,
          })
        );
      } else {
        throw new Error(resultAction?.error?.message);
      }
    } catch (error) {
      showToast(error?.message || "Failed to create property.", "error");
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const throttledToggleLike = useCallback(
    throttle((propertyId) => {
      handleLikeToggle(propertyId);
    }, 2000),
    []
  );

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-9">
            <div className="pro_keyword">
              <div>
                <h3>Active Properties</h3>
              </div>
              <div>
                <select
                  className="pop_c"
                  onChange={(e) => {
                    setSortBy(e.target.value);
                  }}
                >
                  {[
                    {
                      id: 1,
                      name: "Popularity",
                      value: "popular",
                    },
                    {
                      id: 2,
                      name: "Newest Listings",
                      value: "new_listing",
                    },
                    {
                      id: 3,
                      name: "Lowest Price",
                      value: "lowest_price",
                    },
                    {
                      id: 4,
                      name: "Highest Price",
                      value: "highest_price",
                    },
                  ]?.map((option, index) => {
                    return (
                      <option key={index} value={option?.value}>
                        {option?.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            {isLoading ? (
              <p className="text-center placeholder-glow">
                <span
                  className="placeholder bg-secondary-subtle col-4"
                  style={{ height: "20px", display: "inline-block" }}
                />
              </p>
            ) : agentOrAgencyDetails?.verified_properties?.length > 0 ? (
              <p className="text-start mt-2">
                Showing {(page - 1) * limit + 1} -{" "}
                {Math.min(page * limit, pagination?.total)} of{" "}
                {pagination?.total}{" "}
              </p>
            ) : (
              <></>
            )}
            <div className="listing_area position-relative">
              {/* Dynamic Properties List */}
              {isLoading ? (
                <PropertyListingCardSkeleton />
              ) : agentOrAgencyDetails?.verified_properties?.length > 0 ? (
                agentOrAgencyDetails?.verified_properties?.map((item) => {
                  const sliderSettings = {
                    dots: false,
                    infinite: true,
                    speed: 1000,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: true,
                    variableWidth: false,
                    nextArrow: <NextArrow />,
                    prevArrow: <PrevArrow />,
                    responsive: [
                      {
                        breakpoint: 1024,
                        settings: {
                          slidesToShow: 2,
                        },
                      },
                      {
                        breakpoint: 768,
                        settings: {
                          slidesToShow: 1,
                        },
                      },
                      {
                        breakpoint: 480,
                        settings: {
                          slidesToShow: 1,
                        },
                      },
                    ],
                  };

                  const productImages = item?.images?.filter(
                    (item) => item?.name !== "Thumbnail Image"
                  );
                  const productThumbnailImage = item?.images?.filter(
                    (item) => item?.name === "Thumbnail Image"
                  );

                  return item?.is_featured ? (
                    <div className="list_box">
                      <div className="feat_tag">
                        <p>Featured Property</p>
                      </div>
                      <div className="row">
                        <div className="col-lg-5">
                          <div className="property_images">
                            <div className="save_p">
                              {userData?.role !== "guest" && (
                                <button>
                                  <i
                                    className={
                                      item?.is_liked
                                        ? "ri-heart-fill text-white"
                                        : "ri-heart-line"
                                    }
                                    onClick={() =>
                                      throttledToggleLike(item?._id)
                                    }
                                    style={{
                                      cursor: "pointer",
                                      fontSize: "20px",
                                    }}
                                  ></i>
                                </button>
                              )}
                            </div>
                            <div className="big_photo">
                              <Link
                                to={`${pageRoutes.PROPERTY_DETAILS}?id=${item?._id}`}
                              >
                                <ImageWithLoader
                                  src={productThumbnailImage?.[0]?.url}
                                  className="img-fluid"
                                />
                              </Link>
                            </div>
                            <div className="small_photo">
                              <Link
                                to={`${pageRoutes.PROPERTY_DETAILS}?id=${item?._id}`}
                              >
                                {productImages?.slice(0, 2)?.map((img, ind) => {
                                  return (
                                    <ImageWithLoader
                                      key={ind}
                                      src={img?.url}
                                      className={ind !== 0 ? "mb-0" : ""}
                                    />
                                  );
                                })}
                              </Link>
                            </div>
                          </div>
                          <div className="price_tt">
                            <span>
                              <b>{formatPrice(item?.price)}</b>{" "}
                              {item?.duration || ""}
                            </span>
                            <span className="flex_box">
                              Verified
                              <i className="ri-verified-badge-fill" />
                            </span>
                          </div>
                        </div>

                        <div className="col-lg-7">
                          <div className="property_data_area">
                            <h2>
                              <Link
                                to={`${pageRoutes.PROPERTY_DETAILS}?id=${item?._id}`}
                              >
                                {item?.title}
                              </Link>
                            </h2>
                            <div className="p_info">
                              <ul>
                                <li>{item?.subSubCategoryData?.name}</li>
                                {(item?.bedrooms != null &&
                                  item?.bedrooms !== "") ||
                                item?.bathrooms ? (
                                  <li>
                                    {item?.bedrooms != null &&
                                      item?.bedrooms !== "" && (
                                        <span>
                                          <img src={bed} alt="bed" />{" "}
                                          {item?.bedrooms === 0
                                            ? "Studio"
                                            : item?.bedrooms}{" "}
                                        </span>
                                      )}
                                    {item?.bathrooms ? (
                                      <span>
                                        <img src={bath} alt="bath" />{" "}
                                        {item?.bathrooms}
                                      </span>
                                    ) : null}
                                  </li>
                                ) : null}

                                {item?.area && (
                                  <li>
                                    <img src={ruler} alt="area" />{" "}
                                    {formatNumberWithCommas(item?.area)}
                                  </li>
                                )}
                              </ul>
                            </div>
                            {/* <div className="pro_desc sli">
                              {item?.short_description ?? "No description"}
                            </div> */}
                            <div className="loc">
                              <i className="ri-map-pin-line" />
                              {item?.address ?? "No address"}
                            </div>
                            <>
                              <NearbyPlaces
                                address={
                                  item?.building_name + ", " + item?.address
                                }
                                lat={item?.locationData?.latitude}
                                lng={item?.locationData?.longitude}
                                name={"agent"}
                              />
                            </>
                            <div className="call_action">
                              <ul className="mb-0">
                                <li>
                                  <a
                                    href={`tel:${
                                      item?.userData?.phone_number ||
                                      "97143533229"
                                    }`}
                                  >
                                    <i className="ri-phone-line" /> Call
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={`mailto:${
                                      item?.userData?.email ||
                                      "info@propertyworld.ae"
                                    }`}
                                  >
                                    <i className="ri-mail-open-line" /> Email
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={`https://wa.me/${
                                      item?.userData?.whatsapp_number ||
                                      "97143533229"
                                    }`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <i className="ri-whatsapp-line" /> WhatsApp
                                  </a>
                                </li>
                              </ul>
                              <span>
                                <ImageWithLoader
                                  src={
                                    item?.userData?.agency_logo ||
                                    property_world_logo
                                  }
                                  alt="logo"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="list_box normal_listing" key={item?._id}>
                      <div className="row">
                        {/* Left Side */}
                        <div className="col-lg-5">
                          <div className="normal_slider">
                            <div
                              className="agent_d"
                              data-bs-toggle="modal"
                              data-bs-target="#agency_info"
                              onClick={() => setModalShow(true)}
                            >
                              <i className="ri-checkbox-circle-fill" /> Checked
                            </div>
                            <div className="save_p">
                              {userData?.role !== "guest" && (
                                <button>
                                  <i
                                    className={
                                      item?.is_liked
                                        ? "ri-heart-fill text-white"
                                        : "ri-heart-line"
                                    }
                                    onClick={() =>
                                      throttledToggleLike(item?._id)
                                    }
                                    style={{
                                      cursor: "pointer",
                                      fontSize: "20px",
                                    }}
                                  ></i>
                                </button>
                              )}
                            </div>

                            <div className="my-slider">
                              <Slider {...sliderSettings}>
                                {item?.images?.map((img, i) => (
                                  <div key={i}>
                                    <Link
                                      to={`${pageRoutes.PROPERTY_DETAILS}?id=${item?._id}`}
                                    >
                                      <ImageWithLoader src={img?.url} />
                                    </Link>
                                  </div>
                                ))}
                              </Slider>
                            </div>
                          </div>

                          <div className="price_tt normal">
                            <span>
                              <b>{formatPrice(item?.price)}</b>{" "}
                              {item?.duration || ""}
                            </span>
                            {item?.is_verified === 1 && (
                              <span className="flex_box">
                                Verified
                                <i className="ri-verified-badge-fill" />
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Right Side */}
                        <div className="col-lg-7">
                          <div className="property_data_area">
                            <h2 className="pro_desc sli">
                              <Link
                                to={`${pageRoutes.PROPERTY_DETAILS}?id=${item?._id}`}
                              >
                                {item?.title}
                              </Link>
                            </h2>

                            <div className="p_info">
                              <ul>
                                <li>{item?.subSubCategoryData?.name}</li>
                                {(item?.bedrooms != null &&
                                  item?.bedrooms !== "") ||
                                item?.bathrooms ? (
                                  <li>
                                    {item?.bedrooms != null &&
                                      item?.bedrooms !== "" && (
                                        <span>
                                          <img src={bed} alt="bed" />{" "}
                                          {item?.bedrooms === 0
                                            ? "Studio"
                                            : item?.bedrooms}{" "}
                                        </span>
                                      )}
                                    {item?.bathrooms ? (
                                      <span>
                                        <img src={bath} alt="bath" />{" "}
                                        {item?.bathrooms}
                                      </span>
                                    ) : null}
                                  </li>
                                ) : null}

                                {item?.area && (
                                  <li>
                                    <img src={ruler} alt="area" />{" "}
                                    {formatNumberWithCommas(item?.area)}
                                  </li>
                                )}
                              </ul>
                            </div>

                            {item?.amenitiesAndFacilitiesData?.length > 0 ? (
                              <div className="key_property">
                                <a href="#">
                                  {item?.amenitiesAndFacilitiesData
                                    ?.slice(0, 4)
                                    .map((af) => af?.name)
                                    .join(" | ")}
                                </a>
                              </div>
                            ) : (
                              item?.building_facilities?.length > 0 && (
                                <div className="key_property">
                                  <a href="#">
                                    {item?.building_facilities
                                      ?.slice(0, 4)
                                      .join(" | ")}
                                  </a>
                                </div>
                              )
                            )}

                            {/* <div className="pro_desc sli">
                              {item?.short_description}
                            </div> */}
                            <div className="loc">
                              <i className="ri-map-pin-line" />{" "}
                              {item?.locationData?.name}
                            </div>

                            <div className="call_action">
                              <ul>
                                <li>
                                  <a
                                    href={`tel:${
                                      item?.userData?.phone_number ||
                                      "97143533229"
                                    }`}
                                  >
                                    <i className="ri-phone-line" /> Call
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={`mailto:${
                                      item?.userData?.email ||
                                      "info@propertyworld.ae"
                                    }`}
                                  >
                                    <i className="ri-mail-open-line" /> Email
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={`https://wa.me/${
                                      item?.userData?.whatsapp_number ||
                                      "97143533229"
                                    }`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <i className="ri-whatsapp-line" /> WhatsApp
                                  </a>
                                </li>
                              </ul>

                              <span>
                                <img
                                  src={
                                    item?.userData?.agency_logo ||
                                    property_world_logo
                                  }
                                  alt="logo"
                                />
                              </span>
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
                    No Property Available
                  </div>
                </div>
              )}
            </div>
            {/* Pagination */}
            {agentOrAgencyDetails?.verified_properties?.length > 0 && (
              <CustomPagination
                total={pagination?.total}
                page={page}
                limit={limit}
                onPageChange={(newPage) => setPage(newPage)}
              />
            )}
          </div>
          <AgentInfoside />
        </div>
        <CheckedModal show={modalShow} onHide={() => setModalShow(false)} />
      </div>
    </>
  );
};

export default AgentInfo;
