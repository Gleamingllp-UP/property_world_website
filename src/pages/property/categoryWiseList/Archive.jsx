import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPropertyThunk } from "../../../features/property/propertySlice";
import ArchiveLocation from "./ArchiveLocation";
import ArchiveTop from "./ArchiveTop";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
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
const Archive = () => {
  const dispatch = useDispatch();
  const {
    isLoading,
    propertyData = [],
    pagination = {},
  } = useSelector((store) => store?.property);

  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const limit = 5;

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const searchFilters = {
    category: queryParams.get("category"),
    subCategory: queryParams.get("subCategory"),
    subSubCategory: queryParams.get("subSubCategory"),
    duration: queryParams.get("duration"),
    bedrooms: queryParams.get("bedrooms"),
    bathrooms: queryParams.get("bathrooms"),
    min_price: queryParams.get("min_price"),
    max_price: queryParams.get("max_price"),
    min_area: queryParams.get("min_area"),
    max_area: queryParams.get("max_area"),
    payment_plan: queryParams.get("payment_plan"),
    handover_by: queryParams.get("handover_by"),
    search: queryParams.get("search"),
  };

  useEffect(() => {
    dispatch(
      getAllPropertyThunk({
        page,
        limit,
        searchFilters,
        sort_by:sortBy
      })
    );
  }, [dispatch, page, location.search, sortBy]);
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
  return (
    <>
      {/* Top Search Bar */}
      <div className="top_search">
        <div className="container">
          <div className="row">
            <div className="col-lg-1"></div>
            <div className="col-lg-3">
              <div className="loc_area">
                <input
                  type="text"
                  name="location"
                  className="box_search"
                  placeholder="Enter location"
                />
                <i className="ri-map-pin-line" />
              </div>
            </div>
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
        <div className="listing_area">
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
          {propertyData &&
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
                        >
                          <i className="ri-checkbox-circle-fill" /> Checked
                        </div>
                        <div className="save_p">
                          <button>
                            <i className="ri-heart-line" />
                          </button>
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
                          AED <b>{item?.price}</b> {item?.duration}
                        </span>
                        <span className="flex_box">
                          <img src={user} className="agent_b" alt="agent" />
                          <i className="ri-verified-badge-fill" />
                        </span>
                      </div>
                    </div>

                    {/* Right Side */}
                    <div className="col-lg-7">
                      <div className="property_data_area">
                        <h2>
                          <Link to="/property-details">{item?.title}</Link>
                        </h2>

                        <div className="p_info">
                          <ul>
                            <li>{item?.subSubCategoryData?.name}</li>
                            <li>
                              {item?.bedrooms && (
                                <span>
                                  <img src={bed} alt="bed" /> {item?.bedrooms}
                                </span>
                              )}
                              {item?.bathrooms && (
                                <span>
                                  <img src={bath} alt="bath" />{" "}
                                  {item?.bathrooms}
                                </span>
                              )}
                            </li>
                            {item?.area && (
                              <li>
                                <img src={ruler} alt="area" /> {item?.area}
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
                              <a href={`tel:${item?.phone || "97143533229"}`}>
                                <i className="ri-phone-line" /> Call
                              </a>
                            </li>
                            <li>
                              <a
                                href={`mailto:${
                                  item?.email || "info@propertyworld.ae"
                                }`}
                              >
                                <i className="ri-mail-open-line" /> Email
                              </a>
                            </li>
                            <li>
                              <a
                                href={`https://wa.me/${
                                  item?.whatsapp || "97143533229"
                                }`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <i className="ri-whatsapp-line" /> WhatsApp
                              </a>
                            </li>
                          </ul>

                          <span>
                            <img src={property_world_logo} alt="logo" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Pagination */}
        <CustomPagination
          total={pagination?.total}
          page={page}
          limit={limit}
          onPageChange={(newPage) => setPage(newPage)}
        />

        <ArchiveTop />
      </div>
    </>
  );
};

export default Archive;
