import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPropertyThunk } from "../../../features/property/propertySlice";
import ArchiveLocation from "./ArchiveLocation";
import ArchiveTop from "./ArchiveTop";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import {
  bath,
  bed,
  pro_comm1,
  pro_comm2,
  pro_comm3,
  pro_comm4,
  propert2,
  property_world_logo,
  ruler,
  user,
} from "../../../assets/images";
import { CustomPagination } from "../../../Custom_Components/CustomPagination";

const Archive = () => {
  const dispatch = useDispatch();
  const {
    isLoading,
    propertyData = [],
    pagination = {},
  } = useSelector((store) => store?.property);

  const [page, setPage] = useState(1);
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
      })
    );
  }, [dispatch, page, location.search]);

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
                <select className="pop_c">
                  <option>Popularity</option>
                  <option>Newest Listings</option>
                  <option>Lowest Price</option>
                  <option>Highest Price</option>
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
          {propertyData?.map((item) => (
            <div className="list_box normal_listing" key={item?._id}>
              <div className="row">
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
                      {[pro_comm1, pro_comm2, pro_comm3, pro_comm4].map(
                        (src, i) => (
                          <div key={i}>
                            <Link to="/property-details">
                              <img src={src} className="img-fluid" />
                            </Link>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  <div className="price_tt normal">
                    <span>
                      AED <b>{item?.price}</b> {item?.duration}
                    </span>
                    <span className="flex_box">
                      <img src={user} className="agent_b" />
                      <i className="ri-verified-badge-fill" />
                    </span>
                  </div>
                </div>

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
                              <img src={bed} /> {item?.bedrooms}
                            </span>
                          )}
                          {item?.bathrooms && (
                            <span>
                              <img src={bath} /> {item?.bathrooms}
                            </span>
                          )}
                        </li>
                        {item?.area && (
                          <li>
                            <img src={ruler} /> {item?.area}
                          </li>
                        )}
                      </ul>
                    </div>
                    {item?.building_facilities?.length > 0 && (
                      <div className="key_property">
                        <a href="#">
                          {item?.building_facilities?.slice(0, 4).join(" | ")}
                        </a>
                      </div>
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
          ))}
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
