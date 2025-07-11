import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArchiveLocation from "./ArchiveLocation";
import ArchiveTop from "./ArchiveTop";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import {
  bath,
  bed,
  property_world_logo,
  ruler,
  user,
} from "../../../assets/images";
import { CustomPagination } from "../../../Custom_Components/CustomPagination";
import { pageRoutes } from "../../../router/pageRoutes";
import ImageWithLoader from "./../../../Custom_Components/ImageWithLoader";
import "../../../assets/css/arrow.css";
import { PropertyListingCardSkeleton } from "../../../Custom_Components/Skeleton/PropertySkeleton";
import AdvanceSearch from "./AdvanceSearch";
import { formatPrice } from "../../../helper/function/formatPrice";
import CheckedModal from "./CheckedModal";
import { getUserData, openLoginPrompt } from "../../../features/user/userSlice";
import { addOrRemoveFavouritePropertyThunk } from "../../../features/property/propertySlice";
import { showToast } from "../../../utils/toast/toast";
import { throttle } from "lodash";
import { formatNumberWithCommas } from "../../../helper/function/formatRange";
import NearbyPlaces from "./NearbyPlaces";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PropertyMapView from "../propertyDetails/PropertyMapView";
import { getQuarterFromDate } from "../../../helper/function/generateHandoverOptions";
import PaymentPlanPopover from "./PaymentPlanPopover";
import { getPaymentPlanBreakdown } from "../../../helper/function/getPaymentPlanBreakdown";

const Archive = ({ isMapView, setIsMapView }) => {
  const {
    isLoading,
    propertyData = [],
    pagination = {},
    hoveredProperty,
  } = useSelector((store) => store?.property);

  const innerRef = useRef(null);

  const [modalShow, setModalShow] = useState(false);
  const [isGridView, setIsGridView] = useState(true);

  const propertyRefs = useRef({});

  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [features, setFeatures] = useState("");
  const limit = 5;

  const { userData } = useSelector((store) => store?.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  useEffect(() => {
    if (hoveredProperty?.length) {
      const firstProp = hoveredProperty?.[0];
      const target = propertyRefs?.current[firstProp?.title];
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [hoveredProperty]);

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
      if (userData?.role === "guest") {
        dispatch(openLoginPrompt());
        return;
      }
      showToast("Wait", "loading");
      const resultAction = await dispatch(
        addOrRemoveFavouritePropertyThunk(id)
      );
      if (addOrRemoveFavouritePropertyThunk.fulfilled.match(resultAction)) {
        showToast(resultAction?.payload?.message, "success");
      } else {
        throw new Error(resultAction?.error?.message);
      }
    } catch (error) {
      showToast(error?.message || "Failed to create item.", "error");
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
      {/* Top Search Bar */}
      <div className="top_search">
        <div className="container">
          <div className="row">
            <AdvanceSearch
              page={page}
              limit={limit}
              features={features}
              sortBy={sortBy}
              scrollRef={innerRef}
            />
          </div>
        </div>
      </div>
      <hr />

      {/* Property List */}
      <div className={isMapView ? "col-lg-12" : "col-lg-9"}>
        <div className="pro_keyword">
          <div className="mb-3">
            <h3>Properties for sale in UAE</h3>
          </div>

          {/* Filters */}
          <div className="row">
            <div className="col-lg-6">
              <div className="qust_part">
                <ul>
                  {["All", "Furnished", "Unfurnished"].map((label, index) => (
                    <li key={index}>
                      <input
                        type="radio"
                        id={`rdo2_${index + 1}`}
                        className="radio-input"
                        name="radio-group2"
                        value={label}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFeatures(value === "All" ? "" : value);
                        }}
                        checked={
                          features === label ||
                          (label === "All" && features === "")
                        }
                      />
                      <label
                        htmlFor={`rdo2_${index + 1}`}
                        className="radio-label"
                      >
                        <span className="radio-border">{label}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="pop_area">
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
                <div className="list_map">
                  <a
                    className={!isMapView ? "act_list" : ""}
                    onClick={() => setIsMapView(false)}
                  >
                    <i className="ri-list-check" /> List
                  </a>
                  <a
                    className={isMapView ? "act_list" : ""}
                    onClick={() => setIsMapView(true)}
                  >
                    <i className="ri-map-pin-line" /> Map
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location Filter */}
        <ArchiveLocation />

        {isMapView && (
          <div className="d-flex justify-content-end align-items-center my-3">
            <button
              className="action_btn"
              onClick={() => setIsGridView(!isGridView)}
            >
              {isGridView ? "Switch to List View" : "Switch to Grid View"}
            </button>
          </div>
        )}

        {/* Featured Property Example */}
        {!isMapView && (
          <div className="listing_area position-relative" ref={innerRef}>
            {/* Dynamic Properties List */}
            <div>
              {isLoading ? (
                <PropertyListingCardSkeleton />
              ) : propertyData?.length > 0 ? (
                propertyData?.map((item, index) => {
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
                  const { downPayment, onConstruction, onHandover } =
                    getPaymentPlanBreakdown(item?.payment_plan);

                  return item?.is_featured ? (
                    <div className="list_box" key={index}>
                      <div className="feat_tag">
                        <p>Featured Property</p>
                      </div>
                      <div className="row">
                        <div className="col-lg-5 featured">
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
                              <button>
                                <i
                                  className={
                                    item?.is_liked
                                      ? "ri-heart-fill text-white"
                                      : "ri-heart-line"
                                  }
                                  onClick={() => throttledToggleLike(item?._id)}
                                  style={{
                                    cursor: "pointer",
                                    fontSize: "20px",
                                  }}
                                ></i>
                              </button>
                            </div>

                            <div className="my-slider">
                              <Slider {...sliderSettings}>
                                {[
                                  ...productThumbnailImage,
                                  ...productImages,
                                ]?.map((img, i) => (
                                  <div key={i}>
                                    <Link
                                      to={`${pageRoutes.PROPERTY_DETAILS}?id=${item?._id}`}
                                    >
                                      <ImageWithLoader
                                        src={img?.url}
                                        style={{
                                          height: "210px",
                                        }}
                                      />
                                    </Link>
                                  </div>
                                ))}
                              </Slider>
                            </div>
                          </div>
                          <div className="price_tt">
                            <span>
                              <b>{formatPrice(item?.price)}</b>{" "}
                              {item?.duration || ""}
                            </span>
                            <span className="flex_box">
                              <img
                                src={item?.userData?.agent_photo || user}
                                className="agent_b"
                                alt="agent"
                              />
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
                            <div className="pro_desc sli">
                              {item?.short_description ?? "No description"}
                            </div>
                            <div className="loc pro_desc sli">
                              <i className="ri-map-pin-line" />{" "}
                              {item?.address ?? "No address"}
                            </div>
                            <>
                              <NearbyPlaces
                                {...(item?.lat && item?.lng
                                  ? {
                                      lat: Number(item?.lat),
                                      lng: Number(item?.lng),
                                    }
                                  : {
                                      address: `${item?.building_name || ""} ${
                                        item?.address || ""
                                      }`,
                                    })}
                                // address={
                                //   item?.building_name + ", " + item?.address
                                // }
                                // lat={item?.locationData?.latitude}
                                // lng={item?.locationData?.longitude}
                              />
                            </>
                            {item?.handover_by !== "" &&
                              item?.payment_plan !== "" &&
                              item?.payment_plan !== null &&
                              item?.handover_by !== null && (
                                <div
                                  className="d-flex flex-wrap gap-2"
                                  style={{ width: "70%" }}
                                >
                                  <div
                                    className="bg-light rounded px-3 py-2 text-center flex-fill"
                                    style={{ flex: "0 0 47%" }}
                                  >
                                    <div className="text-uppercase small text-secondary fw-semibold">
                                      Handover
                                    </div>
                                    <div className="fw-bold">
                                      {getQuarterFromDate(item?.handover_by)}
                                    </div>
                                  </div>
                                  <div
                                    className="bg-light rounded px-3 py-2 text-center flex-fill"
                                    style={{ flex: "0 0 47%" }}
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
                    <div className="list_box normal_listing" key={index}>
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
                              <button>
                                <i
                                  className={
                                    item?.is_liked
                                      ? "ri-heart-fill text-white"
                                      : "ri-heart-line"
                                  }
                                  onClick={() => throttledToggleLike(item?._id)}
                                  style={{
                                    cursor: "pointer",
                                    fontSize: "20px",
                                  }}
                                ></i>
                              </button>
                            </div>

                            <div className="my-slider">
                              <Slider {...sliderSettings}>
                                {[
                                  ...productThumbnailImage,
                                  ...productImages,
                                ]?.map((img, i) => (
                                  <div key={i}>
                                    <Link
                                      to={`${pageRoutes.PROPERTY_DETAILS}?id=${item?._id}`}
                                    >
                                      <ImageWithLoader
                                        src={img?.url}
                                        style={{
                                          height: "210px",
                                        }}
                                      />
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
                            <span className="flex_box">
                              <img
                                src={item?.userData?.agent_photo || user}
                                className="agent_b"
                                alt="agent"
                              />
                              <i className="ri-verified-badge-fill" />
                            </span>
                          </div>
                        </div>

                        {/* Right Side */}
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

                            <div className="pro_desc sli">
                              {item?.short_description}
                            </div>
                            <div className="loc">
                              <i className="ri-map-pin-line" />{" "}
                              {item?.locationData?.name}
                            </div>
                            {item?.handover_by !== "" &&
                              item?.payment_plan !== "" &&
                              item?.payment_plan !== null &&
                              item?.handover_by !== null && (
                                <div
                                  className="d-flex flex-wrap gap-2 my-3"
                                  style={{ width: "70%" }}
                                >
                                  <div
                                    className="bg-light rounded px-3 py-2 text-center flex-fill"
                                    style={{ flex: "0 0 48%" }}
                                  >
                                    <div className="text-uppercase small text-secondary fw-semibold">
                                      Handover
                                    </div>
                                    <div className="fw-bold">
                                      {getQuarterFromDate(item?.handover_by)}
                                    </div>
                                  </div>
                                  <div
                                    className="bg-light rounded px-3 py-2 text-center flex-fill"
                                    style={{ flex: "0 0 48%" }}
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

                              <span className="">
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

            {isLoading && (
              <div
                className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                style={{
                  backgroundColor: "rgba(238, 238, 238, 0.6)",
                  zIndex: 10,
                }}
              ></div>
            )}
          </div>
        )}

        {/* Map View */}
        {isMapView && (
          <div className="listing_area position-relative" ref={innerRef}>
            <div className="row mb-4">
              <div
                className="col-lg-5 scrollable-container "
                style={{
                  maxHeight: "600px",
                  overflowY: "auto",
                }}
              >
                <div className="row g-0">
                  {isLoading ? (
                    <PropertyListingCardSkeleton />
                  ) : propertyData?.length > 0 ? (
                    propertyData?.map((item, index) => {
                      const sliderSettings = {
                        dots: false,
                        infinite: true,
                        speed: 1000,
                        slidesToShow: 1,
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
                      const isHovered = hoveredProperty?.some(
                        (hovered) => hovered?.title === item?.title
                      );

                      const { downPayment, onConstruction, onHandover } =
                        getPaymentPlanBreakdown(item?.payment_plan);

                      return item?.is_featured ? (
                        <div
                          key={index}
                          ref={(el) => (propertyRefs.current[item?.title] = el)}
                          className={`${
                            isGridView ? "col-12 col-md-6" : "col-12"
                          } property-item p-2 rounded ${
                            isHovered ? "bg-primary-subtle" : "bg-white"
                          } `}
                        >
                          <div className="list_box mb-0">
                            <div className="feat_tag">
                              <p>Featured Property</p>
                            </div>

                            <div
                              className={`row g-0 ${
                                isGridView ? "flex-column" : "flex-row"
                              }`}
                            >
                              {/* Left Side */}
                              <div
                                className={
                                  isGridView ? "col-12" : "col-md-5 col-5"
                                }
                              >
                                <div className="normal_slider position-relative h-100">
                                  <div
                                    className="agent_d position-absolute"
                                    data-bs-toggle="modal"
                                    data-bs-target="#agency_info"
                                    onClick={() => setModalShow(true)}
                                  >
                                    <i className="ri-checkbox-circle-fill" />{" "}
                                    Checked
                                  </div>

                                  <div className="save_p position-absolute top-0 end-0">
                                    <button className="bg-transparent border-0">
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
                                  </div>

                                  <div className="my-slider">
                                    <Slider {...sliderSettings}>
                                      {[
                                        ...productThumbnailImage,
                                        ...productImages,
                                      ]?.map((img, i) => (
                                        <div key={i}>
                                          <Link
                                            to={`${pageRoutes.PROPERTY_DETAILS}?id=${item?._id}`}
                                          >
                                            <ImageWithLoader
                                              src={img?.url}
                                              style={{
                                                height: "210px",
                                              }}
                                            />
                                          </Link>
                                        </div>
                                      ))}
                                    </Slider>
                                  </div>

                                  <div className="price_tt">
                                    <span>
                                      <b>{formatPrice(item?.price)}</b>{" "}
                                      {item?.duration || ""}
                                    </span>
                                    <span className="flex_box">
                                      <img
                                        src={
                                          item?.userData?.agent_photo || user
                                        }
                                        className="agent_b"
                                        alt="agent"
                                      />
                                      <i className="ri-verified-badge-fill" />
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Right Side */}
                              <div
                                className={
                                  isGridView
                                    ? "col-12 p-3 py-1"
                                    : "col-lg-7 col-7 p-3 py-1"
                                }
                              >
                                <div className="property_data_area">
                                  <h2 className="pro_desc sli">
                                    <Link
                                      to={`${pageRoutes.PROPERTY_DETAILS}?id=${item?._id}`}
                                    >
                                      {item?.title}
                                    </Link>
                                  </h2>

                                  <div className="p_info">
                                    <ul className=" ">
                                      {/* <li>{item?.subSubCategoryData?.name}</li> */}
                                      {(item?.bedrooms != null &&
                                        item?.bedrooms !== "") ||
                                      item?.bathrooms ? (
                                        <>
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
                                          </li>
                                          <li>
                                            {item?.bathrooms ? (
                                              <span>
                                                <img src={bath} alt="bath" />{" "}
                                                {item?.bathrooms}
                                              </span>
                                            ) : null}
                                          </li>
                                        </>
                                      ) : null}

                                      {item?.area && (
                                        <li>
                                          <img src={ruler} alt="area" />{" "}
                                          {formatNumberWithCommas(item?.area)}
                                        </li>
                                      )}
                                    </ul>
                                  </div>
                                  <div className="pro_desc sli">
                                    {item?.short_description ??
                                      "No description"}
                                  </div>
                                  <div className="loc pro_desc sli">
                                    <i className="ri-map-pin-line" />{" "}
                                    {item?.address ?? "No address"}
                                  </div>
                                  {
                                    // !isGridView &&
                                    item?.handover_by !== "" &&
                                      item?.payment_plan !== "" &&
                                      item?.payment_plan !== null &&
                                      item?.handover_by !== null && (
                                        <div
                                          className="d-flex flex-wrap gap-2"
                                          style={{ width: "100%" }}
                                        >
                                          <div
                                            className="bg-light rounded px-3 py-2 text-center flex-fill"
                                            style={{ flex: "0 0 40%" }}
                                          >
                                            <div className="text-uppercase small text-secondary fw-semibold">
                                              Handover
                                            </div>
                                            <div className="fw-bold">
                                              {getQuarterFromDate(
                                                item?.handover_by
                                              )}
                                            </div>
                                          </div>
                                          <div
                                            className="bg-light rounded px-3 py-2 text-center flex-fill"
                                            style={{ flex: "0 0 40%" }}
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
                                      )
                                  }

                                  {!isGridView && (
                                    <>
                                      <div className="call_action justify-content-end">
                                        <span className="h-50">
                                          <ImageWithLoader
                                            src={
                                              item?.userData?.agency_logo ||
                                              property_world_logo
                                            }
                                            alt="logo"
                                          />
                                        </span>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div
                          ref={(el) => (propertyRefs.current[item?.title] = el)}
                          className={`${
                            isGridView ? "col-12 col-md-6" : "col-12"
                          } property-item p-2 rounded ${
                            isHovered ? "bg-primary-subtle" : "bg-white"
                          } `}
                        >
                          <div className="card h-100">
                            <div
                              className={`row g-0 ${
                                isGridView ? "flex-column" : "flex-row"
                              }`}
                            >
                              {/* Left Side: Image Slider */}
                              <div
                                className={
                                  isGridView ? "col-12" : "col-md-5 col-5"
                                }
                              >
                                <div className="normal_slider position-relative h-100">
                                  <div
                                    className="agent_d position-absolute"
                                    data-bs-toggle="modal"
                                    data-bs-target="#agency_info"
                                    onClick={() => setModalShow(true)}
                                  >
                                    <i className="ri-checkbox-circle-fill" />{" "}
                                    Checked
                                  </div>

                                  <div className="save_p position-absolute top-0 end-0">
                                    <button className="bg-transparent border-0">
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
                                  </div>

                                  <div className="my-slider">
                                    <Slider {...sliderSettings}>
                                      {[
                                        ...productThumbnailImage,
                                        ...productImages,
                                      ]?.map((img, i) => (
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

                                  <div className="price_tt normal d-flex justify-content-between p-2">
                                    <span>
                                      <b>{formatPrice(item?.price)}</b>{" "}
                                      {item?.duration || ""}
                                    </span>
                                    <span className="flex_box">
                                      <img
                                        src={
                                          item?.userData?.agent_photo || user
                                        }
                                        className="agent_b"
                                        alt="agent"
                                      />
                                      <i className="ri-verified-badge-fill" />
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Right Side: Content */}
                              <div
                                className={
                                  isGridView ? "col-12" : "col-md-7 col-7"
                                }
                              >
                                <div className="property_data_area p-3 py-1">
                                  <h2 className="mb-2 pro_desc sli">
                                    <Link
                                      to={`${pageRoutes.PROPERTY_DETAILS}?id=${item?._id}`}
                                    >
                                      {item?.title}
                                    </Link>
                                  </h2>

                                  <div className="p_info mb-2">
                                    <ul className="">
                                      {/* {item?.subSubCategoryData?.name && (
                                        <li>
                                          {item?.subSubCategoryData?.name}
                                        </li>
                                      )} */}
                                      {(item?.bedrooms !== null ||
                                        item?.bathrooms) && (
                                        <>
                                          <li>
                                            {item?.bedrooms !== null && (
                                              <span>
                                                <img src={bed} alt="bed" />{" "}
                                                {item?.bedrooms === 0
                                                  ? "Studio"
                                                  : item?.bedrooms}
                                              </span>
                                            )}
                                          </li>
                                          <li>
                                            {item?.bathrooms && (
                                              <span className="">
                                                <img src={bath} alt="bath" />{" "}
                                                {item?.bathrooms}
                                              </span>
                                            )}
                                          </li>
                                        </>
                                      )}
                                      {item?.area && (
                                        <li>
                                          <img src={ruler} alt="area" />{" "}
                                          {formatNumberWithCommas(item?.area)}
                                        </li>
                                      )}
                                    </ul>
                                  </div>

                                  {item?.amenitiesAndFacilitiesData?.length >
                                  0 ? (
                                    <div className="key_property mb-2">
                                      <a href="#">
                                        {item?.amenitiesAndFacilitiesData
                                          .slice(0, 4)
                                          .map((af) => af?.name)
                                          .join(" | ")}
                                      </a>
                                    </div>
                                  ) : item?.building_facilities?.length > 0 ? (
                                    <div className="key_property mb-2">
                                      <a href="#">
                                        {item?.building_facilities
                                          .slice(0, 4)
                                          .join(" | ")}
                                      </a>
                                    </div>
                                  ) : null}

                                  <div className="loc pro_desc sli">
                                    <i className="ri-map-pin-line" />{" "}
                                    {item?.address ?? "No Address"}
                                  </div>
                                  {
                                    //  !isGridView &&
                                    item?.handover_by !== "" &&
                                      item?.payment_plan !== "" &&
                                      item?.payment_plan !== null &&
                                      item?.handover_by !== null && (
                                        <div
                                          className="d-flex flex-wrap gap-2"
                                          style={{ width: "100%" }}
                                        >
                                          <div
                                            className="bg-light rounded px-3 py-2 text-center flex-fill"
                                            style={{ flex: "0 0 40%" }}
                                          >
                                            <div className="text-uppercase small text-secondary fw-semibold">
                                              Handover
                                            </div>
                                            <div className="fw-bold">
                                              {getQuarterFromDate(
                                                item?.handover_by
                                              )}
                                            </div>
                                          </div>
                                          <div
                                            className="bg-light rounded px-3 py-2 text-center flex-fill"
                                            style={{ flex: "0 0 40%" }}
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
                                      )
                                  }
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
                  {propertyData?.length > 0 && (
                    <CustomPagination
                      total={pagination?.total}
                      page={page}
                      limit={limit}
                      onPageChange={(newPage) => setPage(newPage)}
                    />
                  )}
                </div>
              </div>
              <div className="col-lg-7 p-0 py-2">
                <PropertyMapView />
              </div>
            </div>

            {isLoading && (
              <div
                className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                style={{
                  backgroundColor: "rgba(214, 214, 214, 0.6)",
                  zIndex: 10,
                }}
              ></div>
            )}
          </div>
        )}
        {/* Pagination */}
        {!isMapView && propertyData?.length > 0 && (
          <CustomPagination
            total={pagination?.total}
            page={page}
            limit={limit}
            onPageChange={(newPage) => setPage(newPage)}
          />
        )}
        {!isMapView && <ArchiveTop />}
        <CheckedModal show={modalShow} onHide={() => setModalShow(false)} />
      </div>
    </>
  );
};

export default React.memo(Archive);
