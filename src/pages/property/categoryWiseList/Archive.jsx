import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArchiveLocation from "./ArchiveLocation";
import ArchiveTop from "./ArchiveTop";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import {
  bath,
  bed,
  pro_comm3,
  pro_comm4,
  propert2,
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
import { getUserData } from "../../../features/user/userSlice";
import { addOrRemoveFavouritePropertyThunk } from "../../../features/property/propertySlice";
import { showToast } from "../../../utils/toast/toast";
import { throttle } from "lodash";
import { formatNumberWithCommas } from "../../../helper/function/formatRange";

const Archive = () => {
  const {
    isLoading,
    propertyData = [],
    pagination = {},
  } = useSelector((store) => store?.property);

  const innerRef = useRef(null);

  const [modalShow, setModalShow] = useState(false);

  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [features, setFeatures] = useState("");
  const limit = 5;

  const { userData } = useSelector((store) => store?.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  // Custom arrow components
  const NextArrow = ({ onClick }) => (
    <div className="custom-arrow next" onClick={onClick}>
      <i className="ri-arrow-right-s-line"></i>
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div className="custom-arrow prev" onClick={onClick}>
      <i className="ri-arrow-left-s-line"></i>
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
      } else {
        throw new Error(resultAction?.error?.message);
      }
    } catch (error) {
      showToast(error?.message || "Failed to create property.", "error");
    }
  };

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
      <div className="col-lg-9">
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
                  <button className="act_list">
                    <i className="ri-list-check" /> List
                  </button>
                  <button>
                    <i className="ri-map-pin-line" /> Map
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location Filter */}
        <ArchiveLocation />

        {/* Featured Property Example */}
        <div className="listing_area position-relative" ref={innerRef}>
          <div className="list_box">
            <div className="feat_tag">
              <p>Featured Property</p>
            </div>
            <div className="row">
              <div className="col-lg-5">
                <div className="property_images">
                  <div className="save_p">
                    <button>
                      <i className="ri-heart-line" />
                    </button>
                  </div>
                  <div className="big_photo">
                    <Link to="/property-details">
                      <img src={propert2} className="img-fluid" />
                    </Link>
                  </div>
                  <div className="small_photo">
                    <Link to="/property-details">
                      <img src={pro_comm3} className="img-fluid" />
                      <img src={pro_comm4} className="img-fluid" />
                    </Link>
                  </div>
                </div>
                <div className="price_tt">
                  <span>
                    AED <b>850,000</b> Yearly
                  </span>
                  <span className="flex_box">
                    <img src={user} className="agent_b" />{" "}
                    <i className="ri-verified-badge-fill" />
                  </span>
                </div>
              </div>

              <div className="col-lg-7">
                <div className="property_data_area">
                  <h2>
                    <Link to="/property-details">
                      The Community Sports Arena
                    </Link>
                  </h2>
                  <div className="p_info">
                    <ul>
                      <li>Apartment</li>
                      <li>
                        <span>
                          <img src={bed} /> Studio
                        </span>
                        <span>
                          <img src={bath} />1
                        </span>
                      </li>
                      <li>
                        <img src={ruler} /> 396
                      </li>
                    </ul>
                  </div>
                  <div className="pro_desc">
                    At vero eos et accusamus et iusto odio dignissimos
                    ducimus...
                  </div>
                  <div className="loc">
                    <i className="ri-map-pin-line" /> Dubai Sports City
                  </div>
                  <div className="nearst_location">
                    <p>
                      <b>Nearest Location</b>
                    </p>
                    <ul>
                      <li>School: 1.2 km</li>
                      <li>Hospital: 1.5 km</li>
                      <li>Metro Station: 800 m</li>
                      <li>Supermarket: 600 m</li>
                    </ul>
                  </div>
                  <div className="call_action">
                    <ul>
                      <li>
                        <a href="#">
                          <i className="ri-phone-line" /> Call
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="ri-mail-open-line" /> Email
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="ri-whatsapp-line" /> WhatsApp
                        </a>
                      </li>
                    </ul>
                    <span>
                      <img src={property_world_logo} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Properties List */}
          <div>
            {isLoading ? (
              <PropertyListingCardSkeleton />
            ) : propertyData?.length > 0 ? (
              propertyData.map((item) => {
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

                return (
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
                                  onClick={() => throttledToggleLike(item?._id)}
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

        {/* Pagination */}
        {propertyData?.length > 0 && (
          <CustomPagination
            total={pagination?.total}
            page={page}
            limit={limit}
            onPageChange={(newPage) => setPage(newPage)}
          />
        )}
        <ArchiveTop />
        <CheckedModal show={modalShow} onHide={() => setModalShow(false)} />
      </div>
    </>
  );
};

export default Archive;
