import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetActiveData } from "../../../features/activeData/activeDataSlice";
import { formatRange } from "../../../helper/function/formatRange";

import {
  generateHandoverOptions,
  generateRangeOptions,
} from "../../../helper/function/generateHandoverOptions";
import Form from "react-bootstrap/Form";
import CategoryFetcher from "../../home/homeBanner/CategoryFetcher";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { getAllPropertyThunk } from "../../../features/property/propertySlice";
import { useSearchParams } from "react-router-dom";
import { debounce } from "lodash";
import LocationSearch from "./LocationSearch";

function AdvanceSearch({ page, limit, sortBy, features, scrollRef }) {
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedCategoryName, setSelectedCategoryName] = useState("");

  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState("");
  const [selectedSubSubCategoryId, setSelectedSubSubCategoryId] = useState("");

  const [openDropDown, setOpenDropDown] = useState("");
  const [rentDuration, setRentDuration] = useState("");
  const [handOverBy, setHandOverBy] = useState("");
  const [completion, setCompletion] = useState("");

  const [buyType, setBuyType] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const [selectedSubCategoryName, setSelectedSubCategoryName] = useState("");

  const [bedRoom, setBedRoom] = useState([]);
  const [bathRoom, setBathRoom] = useState([]);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [minArea, setMinArea] = useState("");
  const [maxArea, setMaxArea] = useState("");

  const [agentOrAgency, setAgentOrAgency] = useState("");
  const [developer, setDeveloper] = useState("");
  const [keyword, setKeyword] = useState("");
  const [selectedTour, setSelectedTour] = useState("");

  const locationRef = useRef();

  const { categories, subCategories, subSubCategories, loading } = useSelector(
    (store) => store?.activeData
  );

  const scroll = useCallback(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [scrollRef]);

  const dispatch = useDispatch();

  const debouncedDispatch = useMemo(() => debounce(dispatch, 500), []);

  const handleReset = () => {
    setSelectedCategoryId("");
    setSelectedCategoryName("");
    setSelectedSubCategoryId("");
    setSelectedSubCategoryName("");
    setSelectedSubSubCategoryId("");
    setOpenDropDown("");
  };

  const handleResetPrice = () => {
    setMinPrice(0);
    setMaxPrice(0);
  };
  const handleResetArea = () => {
    setMaxArea(0);
    setMinArea(0);
  };

  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpenDropDown("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCheckboxChangeBedroom = (e, value) => {
    const checked = e.target.checked;
    setBedRoom((prev) => {
      const updated = checked
        ? [...prev, value]
        : prev.filter((v) => v !== value);

      return [...new Set(updated)].sort((a, b) => a - b);
    });
  };

  const handleCheckboxChangeBathroom = (e, value) => {
    const checked = e.target.checked;
    setBathRoom((prev) => {
      const updated = checked
        ? [...prev, value]
        : prev.filter((v) => v !== value);

      return [...new Set(updated)].sort((a, b) => a - b);
    });
  };

  const renderSelectedBedsAndBaths = () => {
    const bedText = formatRange(bedRoom, "Bed", true);
    const bathText = formatRange(bathRoom, "Bath");
    return `${bedText} | ${bathText}`;
  };

  const options = [
    {
      label: "Yearly",
      value: "yearly",
    },
    {
      label: "Monthly",
      value: "monthly",
    },
    {
      label: "Weekly",
      value: "weekly",
    },
    {
      label: "Daily",
      value: "daily",
    },
    {
      label: "Any",
      value: "any",
    },
  ];

  const options2 = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Ready",
      value: "ready",
    },
    {
      label: "Off-plan",
      value: "offplan",
    },
  ];

  const hanldeOnCategoryChange = (cat) => {
    setSelectedCategoryId(cat?._id);
    setSelectedCategoryName(cat?.name);

    setSelectedSubCategoryName("");
    setSelectedSubCategoryId(null);

    setSelectedSubSubCategoryId(null);
    dispatch(resetActiveData());

    setRentDuration("");
  };

  const [queryParams] = useSearchParams();

  const queryString = queryParams.toString();

  const searchFilters = useMemo(
    () => ({
      category: queryParams.get("category") || selectedCategoryId,
      subCategory: queryParams.get("subCategory") || selectedSubCategoryId,
      subSubCategory:
        queryParams.get("subSubCategory") || selectedSubSubCategoryId,
      duration: queryParams.get("duration") || rentDuration,
      construction_status: queryParams.get("construction_status") || buyType,
      bedrooms: queryParams.get("bedrooms") || bedRoom,
      bathrooms: queryParams.get("bathrooms") || bathRoom,
      min_price: queryParams.get("min_price") || minPrice,
      max_price: queryParams.get("max_price") || maxPrice,
      min_area: queryParams.get("min_area") || minArea,
      max_area: queryParams.get("max_area") || maxArea,
      payment_plan: queryParams.get("payment_plan") || priceRange,
      handover_by: queryParams.get("handover_by") || handOverBy,
      search: queryParams.get("search") || location,
      tour_types: queryParams.get("tour_types") || selectedTour,
      agent_agency: queryParams.get("agent_agency") || agentOrAgency,
      developer: queryParams.get("developer") || developer,
      keyword: queryParams.get("keyword") || keyword,
      completion: queryParams.get("completion") || completion,
    }),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      queryString,
      selectedCategoryId,
      selectedSubCategoryId,
      selectedSubSubCategoryId,
      rentDuration,
      buyType,
      bedRoom,
      bathRoom,
      minPrice,
      maxPrice,
      minArea,
      maxArea,
      priceRange,
      handOverBy,
      location,
      selectedTour,
      agentOrAgency,
      developer,
      keyword,
      completion,
    ]
  );

  useEffect(() => {
    debouncedDispatch(
      getAllPropertyThunk({
        page,
        limit,
        searchFilters,
        sort_by: sortBy,
        features,
      })
    );
    scroll();
  }, [page, sortBy, features, searchFilters, limit, debouncedDispatch, scroll]);

  function haldelSearch() {
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
  const handleMoreFilterReset = () => {
    setMinPrice("");
    setMaxPrice("");
    setMinArea("");
    setMaxArea("");
    setAgentOrAgency("");
    setDeveloper("");
    setKeyword("");
    setSelectedTour("");
    setOpenDropDown("");
  };

  useEffect(() => {
    if (selectedCategoryName === "Rent") {
      setBuyType("");
      setHandOverBy("");
      setPriceRange("");
      setCompletion("");
    } else if (selectedSubCategoryName === "Commercial") {
      setBedRoom([]);
      setBathRoom([]);
    }
  }, [selectedCategoryName, selectedSubCategoryName, buyType]);

  return (
    <div
      className="main_search m-0 w-100 my-4 p-0 shadow-none"
      ref={dropdownRef}
    >
      <CategoryFetcher
        selectedCategoryId={selectedCategoryId}
        selectedSubCategoryId={selectedSubCategoryId}
      />
      <div className="padd p-0">
        <div className="row">
          <div className="col-lg-1">
            <div className="enter_loca hide_content">
              {loading && !selectedCategoryId && !selectedSubCategoryId ? (
                [...Array(1)].map((_, i) => (
                  <li key={i}>
                    <div
                      className="placeholder-glow"
                      style={{ width: "100px", height: "38px" }}
                    >
                      <span
                        className="placeholder col-12 rounded-pill"
                        style={{
                          height: "30px",
                        }}
                      >
                        &nbsp;
                      </span>
                    </div>
                  </li>
                ))
              ) : (
                <>
                  {/* Main select-like box */}
                  <div
                    className="select-box"
                    onClick={() => {
                      setOpenDropDown((prev) =>
                        prev === "category" ? "" : "category"
                      );
                      locationRef.current.closeDropdown();
                    }}
                    id="mainSelectBox3"
                  >
                    <div
                      className="selected-items d-flex justify-content-between align-items-center"
                      id="selectedItems3"
                    >
                      <span>
                        {" "}
                        {selectedCategoryName
                          ? selectedCategoryName
                          : "Category"}
                      </span>
                      <ChevronDown
                        strokeWidth={3}
                        size={"15px"}
                        className={`rotate-transition ${
                          openDropDown === "category" ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>
                  {/* Hidden content with input fields */}
                  <div
                    className={
                      openDropDown === "category"
                        ? "content-wrapper d-block"
                        : "content-wrapper "
                    }
                    style={{
                      width: "200px",
                    }}
                    id="areaOptions"
                  >
                    <div className="fxx w-100">
                      {categories?.map((cat, i) => (
                        <>
                          <div className="res_done w-100 gap-1" key={i}>
                            <button
                              className={`btn w-100 ${
                                cat?._id === selectedCategoryId ? "done_b" : ""
                              }`}
                              onClick={() => {
                                hanldeOnCategoryChange(cat);
                              }}
                            >
                              {cat?.name}
                            </button>
                          </div>
                        </>
                      ))}
                    </div>
                    {categories?.length > 0 && (
                      <div className="res_done gap-1">
                        <button
                          className="btn"
                          onClick={() => {
                            handleReset();
                          }}
                        >
                          Reset
                        </button>
                        <button
                          className="btn done_b"
                          onClick={() => setOpenDropDown("")}
                        >
                          Done
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          <div
            className={
              selectedCategoryName === "Buy" || selectedCategoryName === ""
                ? "col-lg-2"
                : "col-lg-3"
            }
          >
            {/* <div className="mmm_input d-block ">
              <div className="big_search">
                <input
                  type="text"
                  name="Search"
                  placeholder="Enter Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)
                    // debouncedSearch(e.target.value)
                  }
                  className="search_bxi rounded"
                />
                <i className="ri-map-pin-line map_iic" />
              </div>
            </div> */}
            <LocationSearch
              ref={locationRef}
              setLocation={setLocation}
              location={location}
              setOpenDropdown={setOpenDropDown}
              openDropDown={openDropDown}
            />
          </div>

          {selectedCategoryName !== "Rent" && (
            <div className="col-lg-3">
              <div className="all_cta">
                <ul>
                  {options2?.map((option, index) => (
                    <li key={option?.value || index}>
                      <input
                        type="radio"
                        id={`radio_${option?.value || index}`}
                        className="radio-input"
                        name="radio-group02"
                        value={option?.value}
                        checked={buyType === String(option?.value)}
                        onChange={() => setBuyType(String(option?.value))}
                      />
                      <label
                        htmlFor={`radio_${option?.value || index}`}
                        className="radio-label"
                      >
                        <span className="radio-border">{option?.label}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="col-lg-2">
            <div className="enter_loca hide_content">
              <div className="form-group">
                {/* Main select-like box */}
                <div
                  className="select-box"
                  onClick={() => {
                    if (selectedCategoryId) {
                      setOpenDropDown((prev) =>
                        prev === "sub_category" ? "" : "sub_category"
                      );
                    }
                  }}
                  id="mainSelectBox2"
                >
                  <div
                    className="selected-items d-flex justify-content-between align-items-center"
                    id="selectedItems2"
                  >
                    <span>
                      {" "}
                      {selectedSubCategoryName
                        ? selectedSubCategoryName
                        : !selectedCategoryId
                        ? "Select Category first"
                        : "Select Property Type"}
                    </span>
                    <ChevronDown
                      strokeWidth={3}
                      size={"15px"}
                      className={`rotate-transition ${
                        openDropDown === "sub_category" ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>
                {/* Hidden content with checkboxes */}
                <div
                  className={
                    openDropDown === "sub_category"
                      ? "content-wrapper d-block"
                      : "content-wrapper"
                  }
                  id="roomOptions2"
                >
                  <div className="room-section" id="bedroomSection2">
                    <div className="res_comm">
                      {subCategories &&
                        subCategories?.map((subCat, index) => {
                          return (
                            <div
                              className={
                                selectedSubCategoryId === subCat?._id
                                  ? "b1 selet"
                                  : "b1"
                              }
                              key={index}
                            >
                              <span
                                id="res_b"
                                onClick={() => {
                                  setSelectedSubCategoryName(subCat?.name);
                                  setSelectedSubCategoryId(subCat?._id);
                                }}
                              >
                                {subCat?.name}
                              </span>
                            </div>
                          );
                        })}
                    </div>

                    <div className="residential_list">
                      <div className="button_class">
                        {subSubCategories?.length > 0 ? (
                          subSubCategories?.map((item, index) => {
                            return (
                              <button
                                key={index}
                                className={
                                  selectedSubSubCategoryId === item?._id
                                    ? "selet"
                                    : ""
                                }
                                onClick={() =>
                                  setSelectedSubSubCategoryId(item?._id)
                                }
                              >
                                {" "}
                                {item?.name}
                              </button>
                            );
                          })
                        ) : (
                          <span className="small d-flex text-center">
                            {selectedSubCategoryId
                              ? " No Property type found "
                              : "Select Sub Category"}
                          </span>
                        )}
                      </div>
                      {subSubCategories?.length > 0 && (
                        <div className="res_done">
                          <button className="btn" onClick={handleReset}>
                            Reset
                          </button>
                          <button
                            className="btn done_b"
                            onClick={() => haldelSearch()}
                          >
                            Done
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {selectedSubCategoryName === "Commercial" ? (
            <div className="col-lg-2">
              <div className="enter_loca hide_content">
                {/* Main select-like box */}
                <div
                  className="select-box"
                  onClick={() => {
                    setOpenDropDown((prev) =>
                      prev === "area2" ? "" : "area2"
                    );
                  }}
                  id="mainSelectBox3"
                >
                  <div
                    className="selected-items d-flex justify-content-between align-items-center"
                    id="selectedItems3"
                  >
                    <span>Area (sqft)</span>
                    <ChevronDown
                      strokeWidth={3}
                      size={"15px"}
                      className={`rotate-transition ${
                        openDropDown === "area2" ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>
                {/* Hidden content with input fields */}
                <div
                  className={
                    openDropDown === "area2"
                      ? "content-wrapper width_space d-block"
                      : "content-wrapper width_space"
                  }
                  id="areaOptions"
                >
                  <div className="fxx">
                    <div className="input-group">
                      <span>Minimum</span>
                      <input
                        type="number"
                        id="minArea"
                        min={0}
                        value={minArea}
                        placeholder={0}
                        onChange={(e) => setMaxArea(e.target.value)}
                      />
                    </div>
                    <div className="input-group">
                      <span>Maximum</span>
                      <input
                        type="number"
                        id="maxArea"
                        value={maxArea}
                        disabled={!minArea}
                        placeholder="Any"
                        min={minArea}
                        onChange={(e) => setMaxArea(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="res_done">
                    <button
                      className="btn"
                      type="button"
                      onClick={handleResetArea}
                    >
                      Reset
                    </button>
                    <button
                      className="btn done_b"
                      onClick={() => haldelSearch()}
                    >
                      Done
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="col-lg-2">
              <div className="enter_loca hide_content">
                <div className="form-group">
                  {/* Main select-like box */}
                  <div
                    className="select-box"
                    onClick={() => {
                      setOpenDropDown((prev) =>
                        prev === "bed_bath" ? "" : "bed_bath"
                      );
                    }}
                    id="mainSelectBox"
                  >
                    <div
                      className="selected-items d-flex justify-content-between align-items-center"
                      id="selectedItems3"
                    >
                      <span>
                        {" "}
                        {bedRoom?.length > 0 || bathRoom?.length > 0
                          ? renderSelectedBedsAndBaths()
                          : "Beds & Baths"}
                      </span>
                      <ChevronDown
                        strokeWidth={3}
                        size={"15px"}
                        className={`rotate-transition ${
                          openDropDown === "bed_bath" ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>
                  {/* Hidden content with checkboxes */}
                  <div
                    className={
                      openDropDown === "bed_bath"
                        ? "content-wrapper d-block"
                        : "content-wrapper"
                    }
                    id="roomOptions"
                  >
                    <div className="room-section" id="bedroomSection">
                      <div className="room-title">Bedroom</div>
                      <div className="checkbox-group">
                        <input
                          type="checkbox"
                          id="studio"
                          value={0}
                          checked={bedRoom?.includes(0)}
                          onChange={(e) => handleCheckboxChangeBedroom(e, 0)}
                        />
                        <label htmlFor="studio">Studio</label>

                        {[...Array(8)].map((_, i) => {
                          const value = i + 1;
                          const labelText = value === 8 ? "7+" : value;

                          return (
                            <React.Fragment key={i}>
                              <input
                                type="checkbox"
                                id={`bedroom-${value}`}
                                value={value}
                                checked={bedRoom?.includes(value)}
                                onChange={(e) =>
                                  handleCheckboxChangeBedroom(e, value)
                                }
                              />
                              <label htmlFor={`bedroom-${value}`}>
                                {labelText}
                              </label>
                            </React.Fragment>
                          );
                        })}
                      </div>
                    </div>
                    <div className="room-section" id="bathroomSection">
                      <div className="room-title">Bathroom</div>
                      <div className="checkbox-group">
                        {[...Array(8)].map((_, i) => {
                          const value = i + 1;
                          const labelText = value === 8 ? "7+" : value;

                          return (
                            <React.Fragment key={i}>
                              <input
                                type="checkbox"
                                id={`bathRoom-${value}`}
                                value={value}
                                checked={bathRoom?.includes(value)}
                                onChange={(e) =>
                                  handleCheckboxChangeBathroom(e, value)
                                }
                              />
                              <label htmlFor={`bathRoom-${value}`}>
                                {labelText}
                              </label>
                            </React.Fragment>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedCategoryName === "Rent" && (
            <div className="col-lg-2">
              <div className="enter_loca ">
                {/* Main select-like box */}
                <div
                  className="select-box"
                  onClick={() => {
                    setOpenDropDown((prev) =>
                      prev === "price" ? "" : "price"
                    );
                  }}
                  id="mainSelectBox3"
                >
                  <div className="selected-items" id="selectedItems3">
                    Price (AED)
                  </div>
                </div>
                {/* Hidden content with input fields */}
                <div
                  className={
                    openDropDown === "price"
                      ? "content-wrapper width_space d-block"
                      : "content-wrapper width_space"
                  }
                  id="areaOptions"
                >
                  <div className="fxx">
                    <div className="input-group">
                      <span>Minimum</span>
                      <input
                        type="number"
                        id="minPrice"
                        min={0}
                        value={minPrice}
                        placeholder={0}
                        onChange={(e) => setMinPrice(e.target.value)}
                      />
                    </div>
                    <div className="input-group">
                      <span>Maximum</span>
                      <input
                        type="number"
                        id="maxPrice"
                        value={maxPrice}
                        disabled={!minPrice}
                        placeholder="Any"
                        min={minPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="res_done">
                    <button
                      className="btn"
                      type="button"
                      onClick={handleResetPrice}
                    >
                      Reset
                    </button>
                    <button
                      className="btn done_b"
                      onClick={() => haldelSearch()}
                    >
                      Done
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div
            className={`${
              selectedCategoryName === "Buy" || selectedCategoryName === ""
                ? "col-lg-2"
                : "col-lg-2"
            }`}
          >
            <div className="enter_loca hide_content">
              <div
                className="select-box "
                onClick={() => {
                  setOpenDropDown((prev) =>
                    prev === "more_filter" ? "" : "more_filter"
                  );
                }}
                id="mainSelectBox3"
              >
                <div
                  className="selected-items d-flex justify-content-between align-items-center"
                  id="selectedItems3"
                >
                  <span>More Filters</span>
                  <SlidersHorizontal
                    strokeWidth={3}
                    size={"15px"}
                    className="cursor-pointer"
                  />
                </div>
              </div>
              {/* Hidden content with input fields */}
              <div
                className={
                  openDropDown === "more_filter"
                    ? "content-wrapper d-block"
                    : "content-wrapper "
                }
                style={{
                  width: "300px",
                  maxHeight: "350px",
                  overflowY: "auto",
                  right: "0px",
                }}
                id="areaOptions"
              >
                {selectedCategoryName !== "Rent" && (
                  <div className="fxx p-2 w-100">
                    <div className="">
                      <p className="fw-semibold my-1">Price (AED)</p>
                      <div className="d-flex gap-1 justify-content-center align-items-center">
                        <div className="input-group">
                          <span>Minimum</span>
                          <input
                            type="number"
                            id="minPrice"
                            min={0}
                            value={minPrice}
                            placeholder={0}
                            onChange={(e) => setMinPrice(e.target.value)}
                          />
                        </div>
                        <div className="input-group">
                          <span>Maximum</span>
                          <input
                            type="number"
                            id="maxPrice"
                            value={maxPrice}
                            disabled={!minPrice}
                            placeholder="Any"
                            min={minPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedSubCategoryName !== "Commercial" && (
                  <div className="fxx p-2 w-100">
                    <div className="">
                      <p className="fw-semibold my-1"> Area (sqft)</p>
                      <div className="d-flex gap-1 justify-content-center align-items-center">
                        <div className="input-group">
                          <span>Minimum</span>
                          <input
                            type="number"
                            id="minArea"
                            min={0}
                            value={minArea}
                            placeholder={0}
                            onChange={(e) => setMinArea(e.target.value)}
                          />
                        </div>
                        <div className="input-group">
                          <span>Maximum</span>
                          <input
                            type="number"
                            id="maxArea"
                            value={maxArea}
                            disabled={!minArea}
                            placeholder="Any"
                            min={minArea}
                            onChange={(e) => setMaxArea(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="input-group p-2">
                  <p className="fw-semibold my-1">Keyword</p>
                  <input
                    type="text"
                    id="minArea"
                    className="more_filter_input"
                    placeholder="Add relevant keywo"
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                </div>
                <div className="input-group p-2">
                  <p className="fw-semibold my-1">Agency or Agent</p>
                  <input
                    type="text"
                    id="minArea"
                    className="more_filter_input"
                    placeholder="Add relevant keywo"
                    onChange={(e) => setAgentOrAgency(e.target.value)}
                  />
                </div>
                <div className="input-group p-2">
                  <p className="fw-semibold my-1">Developers</p>
                  <input
                    type="text"
                    id="minArea"
                    className="more_filter_input"
                    placeholder="Add relevant keywo"
                    onChange={(e) => setDeveloper(e.target.value)}
                  />
                </div>
                <div className="input-group p-2">
                  <p className="fw-semibold my-1">Tour Types</p>
                  <div className=" d-flex flex-wrap gap-2 w-100">
                    {["Floor Plans", "Video Tour", "360 Tours"]?.map(
                      (item, i) => (
                        <>
                          <div className="res_done gap-1" key={i}>
                            <button
                              className={`btn w-100 ${
                                item === selectedTour ? "done_b" : ""
                              }`}
                              onClick={() => {
                                setSelectedTour(item);
                              }}
                            >
                              {item}
                            </button>
                          </div>
                        </>
                      )
                    )}
                  </div>
                </div>
                <div className="res_done gap-1">
                  <button
                    className="btn"
                    onClick={() => {
                      handleMoreFilterReset();
                    }}
                  >
                    Reset
                  </button>
                  <button className="btn done_b" onClick={() => haldelSearch()}>
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          {selectedCategoryName === "Buy" && (
            <>
              {buyType === "offplan" && (
                <div className="col-lg-2">
                  <div
                    className="enter_loca enter_loca2 d-flex align-items-center"
                    style={{
                      height: "34px",
                    }}
                  >
                    <select
                      onFocus={() => {
                        setOpenDropDown("");
                      }}
                      className=""
                      value={handOverBy || ""}
                      onChange={(e) => {
                        setHandOverBy(e.target.value);
                      }}
                    >
                      <option value="" disabled>
                        Handover By
                      </option>
                      {generateHandoverOptions() &&
                        generateHandoverOptions()?.map((option, index) => {
                          return (
                            <>
                              <option key={index} value={option?.value}>
                                {option?.label}
                              </option>
                            </>
                          );
                        })}
                    </select>
                  </div>
                </div>
              )}

              {buyType === "offplan" && (
                <>
                  <div className="col-lg-2">
                    <div className="enter_loca ">
                      {/* Main select-like box */}
                      <div
                        className="select-box2 d-flex align-items-center"
                        style={{
                          height: "32px",
                        }}
                        onClick={() => {
                          setOpenDropDown((prev) =>
                            prev === "payment_plan" ? "" : "payment_plan"
                          );
                        }}
                        id="mainSelectBox3"
                      >
                        <div
                          className="selected-items d-flex justify-content-between align-items-center"
                          id="selectedItems3"
                        >
                          <span>Payment Plan (AED)</span>
                          <ChevronDown
                            strokeWidth={3}
                            size={"15px"}
                            className={`rotate-transition ${
                              openDropDown === "payment_plan"
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </div>
                      </div>

                      <div
                        className={
                          openDropDown === "payment_plan"
                            ? "content-wrapper width_space d-block"
                            : "content-wrapper width_space"
                        }
                        id="areaOptions"
                      >
                        <div className="my-2">
                          <div className="d-flex justify-content-between align-items-center mb-1">
                            <Form.Label className="mb-0 fw-medium">
                              Pre-handover Payment
                            </Form.Label>
                            <span className="badge bg-primary-subtle text-primary fw-semibold">
                              {priceRange}%
                            </span>
                          </div>

                          {/* 0% and 100% labels ABOVE the slider */}
                          <div className="d-flex justify-content-between text-muted small mb-1 px-1">
                            <span>0%</span>
                            <span>100%</span>
                          </div>

                          <Form.Range
                            min={0}
                            max={100}
                            step={1}
                            value={priceRange}
                            onChange={(e) => setPriceRange(e.target.value)}
                            className="custom-range"
                            style={{
                              paddingLeft: "0px",
                            }}
                          />
                        </div>
                        <div className="res_done">
                          <button
                            className="btn"
                            type="button"
                            onClick={handleResetPrice}
                          >
                            Reset
                          </button>
                          <button
                            className="btn done_b"
                            onClick={() => haldelSearch()}
                          >
                            Done
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {buyType === "offplan" && (
                <div className="col-lg-2">
                  <div
                    className="enter_loca enter_loca2 d-flex align-items-center"
                    style={{
                      height: "34px",
                    }}
                  >
                    <select
                      onFocus={() => {
                        setOpenDropDown("");
                      }}
                      className=""
                      value={handOverBy || ""}
                      onChange={(e) => {
                        setCompletion(e.target.value);
                      }}
                    >
                      <option value="" disabled>
                        % Completion
                      </option>
                      {generateRangeOptions() &&
                        generateRangeOptions()?.map((option, index) => {
                          return (
                            <>
                              <option key={index} value={option?.value}>
                                {option?.label}
                              </option>
                            </>
                          );
                        })}
                    </select>
                  </div>
                </div>
              )}
            </>
          )}

          {selectedCategoryName === "Rent" && (
            <div className="col-lg-2">
              <div
                className="enter_loca enter_loca2 d-flex align-items-center"
                style={{
                  height: "34px",
                }}
              >
                <select
                  onFocus={() => {
                    setOpenDropDown("");
                  }}
                  className="select-box"
                  value={rentDuration || ""}
                  onChange={(e) => {
                    setRentDuration(e.target.value);
                  }}
                >
                  <option value="" disabled>
                    Yearly Rent
                  </option>
                  {options &&
                    options?.map((option, index) => {
                      return (
                        <>
                          <option key={index} value={option?.value}>
                            {option?.label}
                          </option>
                        </>
                      );
                    })}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(AdvanceSearch);
