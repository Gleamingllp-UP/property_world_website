import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllActiveCategoryThunk,
  getAllActiveSubCategoryThunk,
  getAllActivesubSubCategoryThunk,
} from "../../../features/activeData/activeDataSlice";
import { formatRange } from "../../../helper/function/formatRange";
import { guestUserLoginThunk } from "../../../features/user/userSlice";
import { generateHandoverOptions } from "../../../helper/function/generateHandoverOptions";
import Form from "react-bootstrap/Form";

function HomeSearch() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState(null);

  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);
  const [selectedSubSubCategoryId, setSelectedSubSubCategoryId] =
    useState(null);

  const [rentDuration, setRentDuration] = useState(null);
  const [buyType, setBuyType] = useState(null);
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState(0);

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isDropDownOpen2, setIsDropDownOpen2] = useState(false);
  const [isDropDownOpen3, setIsDropDownOpen3] = useState(false);
  const [isDropDownOpen4, setIsDropDownOpen4] = useState(false);
  const [isDropDownOpen5, setIsDropDownOpen5] = useState(false);

  const [selectedSubCategoryName, setSelectedSubCategoryName] = useState("");

  const [bedRoom, setBedRoom] = useState([]);
  const [bathRoom, setBathRoom] = useState([]);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const [minArea, setMinArea] = useState(0);
  const [maxArea, setMaxArea] = useState(0);

  const { categories, subCategories, subSubCategories, loading } = useSelector(
    (store) => store?.activeData
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(guestUserLoginThunk());
  }, [dispatch]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await dispatch(getAllActiveCategoryThunk()).unwrap();
        // const firstId = res?.data?.[0]?._id;
        // setSelectedCategoryId(firstId);
      } catch (err) {
        console.error("Error fetching categories", err);
      }
    };
    fetchCategories();
  }, [dispatch]);

  useEffect(() => {
    if (!selectedCategoryId) return;

    const fetchSubCategories = async () => {
      try {
        const res = await dispatch(
          getAllActiveSubCategoryThunk({ categoryId: selectedCategoryId })
        ).unwrap();
        // const firstSubId = res?.data?.[0]?._id;
        // const firstSubName = res?.data?.[0]?.name;
        // setSelectedSubCategoryName(firstSubName);
        // setSelectedSubCategoryId(firstSubId);
      } catch (err) {
        console.error("Error fetching subcategories", err);
      }
    };

    fetchSubCategories();
  }, [selectedCategoryId, dispatch]);

  useEffect(() => {
    if (!selectedSubCategoryId) return;

    dispatch(
      getAllActivesubSubCategoryThunk({
        subCategoryId: selectedSubCategoryId,
      })
    );
  }, [selectedSubCategoryId, dispatch]);

  const handleReset = () => {
    setSelectedCategoryId("");
    setSelectedSubCategoryId("");
    setSelectedSubCategoryName("");
    setSelectedSubSubCategoryId("");
    setIsDropDownOpen(false);
  };
  const handleResetPrice = () => {
    setMinPrice(0);
    setMaxPrice(0);
  };
  const handleResetArea = () => {
    setMaxArea(0);
    setMinArea(0);
  };

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
  };
  return (
    <div className="main_search">
      <div className="padd">
        <div className="row">
          <div className="col-lg-3">
            <div className="buy_rent_search">
              <ul>
                {loading && !selectedCategoryId && !selectedSubCategoryId
                  ? [...Array(2)].map((_, i) => (
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
                  : categories?.map((cat) => (
                      <li key={cat?._id}>
                        <input
                          type="radio"
                          id={`tab_${cat?._id}`}
                          className="radio-input"
                          name="user-type"
                          checked={selectedCategoryId === cat?._id}
                          onChange={() => {
                            hanldeOnCategoryChange(cat);
                          }}
                        />
                        <label
                          htmlFor={`tab_${cat?._id}`}
                          className="radio-label"
                        >
                          <span className="radio-border">{cat?.name}</span>
                        </label>
                      </li>
                    ))}
              </ul>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="mmm_input">
              <div className="big_search">
                <input
                  type="text"
                  name="Search"
                  placeholder="Enter Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="search_bxi"
                />
                <i className="ri-map-pin-line map_iic" />
              </div>
              <div className="search_btn">
                <button>Search</button>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          {selectedCategoryName === "Rent" ? (
            <div className="col-lg-3">
              <div className="enter_loca">
                <div className="form-group">
                  <div className="select-box" style={{ position: "relative" }}>
                    <select
                      onFocus={() => {
                        setIsDropDownOpen(false);
                        setIsDropDownOpen2(false);
                        setIsDropDownOpen3(false);
                        setIsDropDownOpen4(false);
                      }}
                      className="select-box"
                      value={rentDuration || ""}
                      onChange={(e) => {
                        setRentDuration(e.target.value);
                      }}
                    >
                      <option value="" disabled>
                        Select Duration
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
              </div>
            </div>
          ) : (
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

          <div className="col-lg-3">
            <div className="enter_loca">
              <div className="form-group">
                {/* Main select-like box */}
                <div
                  className="select-box"
                  onClick={() => {
                    if (selectedCategoryId) {
                      setIsDropDownOpen(!isDropDownOpen);
                      setIsDropDownOpen2(false);
                      setIsDropDownOpen3(false);
                      setIsDropDownOpen4(false);
                    }
                  }}
                  id="mainSelectBox2"
                >
                  <div className="selected-items" id="selectedItems2">
                    {selectedSubCategoryName
                      ? selectedSubCategoryName
                      : !selectedCategoryId
                      ? "Select Category first"
                      : "Select Property Type"}
                  </div>
                </div>
                {/* Hidden content with checkboxes */}
                <div
                  className={
                    isDropDownOpen
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
                            No Property type found
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
                            onClick={() => setIsDropDownOpen(false)}
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
          {buyType === "offplan" && (
            <div className="col-lg-3">
              <div className="enter_loca">
                <div className="form-group">
                  <div className="select-box" style={{ position: "relative" }}>
                    <select
                      onFocus={() => {
                        setIsDropDownOpen(false);
                        setIsDropDownOpen2(false);
                        setIsDropDownOpen3(false);
                        setIsDropDownOpen4(false);
                      }}
                      className=""
                      value={rentDuration || ""}
                      onChange={(e) => {
                        setRentDuration(e.target.value);
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
              </div>
            </div>
          )}

          {buyType !== "offplan" &&
            (selectedSubCategoryName === "Commercial" ? (
              <div className="col-lg-3">
                <div className="enter_loca ">
                  {/* Main select-like box */}
                  <div
                    className="select-box"
                    onClick={() => {
                      setIsDropDownOpen(false);
                      setIsDropDownOpen3(false);
                      setIsDropDownOpen4(!isDropDownOpen4);
                    }}
                    id="mainSelectBox3"
                  >
                    <div className="selected-items" id="selectedItems3">
                      Area (sqft)
                    </div>
                  </div>
                  {/* Hidden content with input fields */}
                  <div
                    className={
                      isDropDownOpen4
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
                        onClick={() => setIsDropDownOpen4(false)}
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="col-lg-3">
                <div className="enter_loca">
                  <div className="form-group">
                    {/* Main select-like box */}
                    <div
                      className="select-box"
                      onClick={() => {
                        setIsDropDownOpen(false);
                        setIsDropDownOpen3(false);
                        setIsDropDownOpen2(!isDropDownOpen2);
                      }}
                      id="mainSelectBox"
                    >
                      <div className="selected-items" id="selectedItems">
                        {/* Beds &amp; Baths */}
                        {bedRoom.length > 0 || bathRoom.length > 0
                          ? renderSelectedBedsAndBaths()
                          : "Beds & Baths"}
                      </div>
                    </div>
                    {/* Hidden content with checkboxes */}
                    <div
                      className={
                        isDropDownOpen2
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
            ))}

          {buyType === "offplan" && (
            <>
              <div className="col-lg-3">
                <div className="enter_loca ">
                  {/* Main select-like box */}
                  <div
                    className="select-box"
                    onClick={() => {
                      setIsDropDownOpen(false);
                      setIsDropDownOpen2(false);
                      setIsDropDownOpen4(false);
                      setIsDropDownOpen3(false);
                      setIsDropDownOpen5(!isDropDownOpen5);
                    }}
                    id="mainSelectBox3"
                  >
                    <div className="selected-items" id="selectedItems3">
                      Payment Plan (AED)
                    </div>
                  </div>

                  <div
                    className={
                      isDropDownOpen5
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
                          paddingLeft:"0px"
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
                        onClick={() => setIsDropDownOpen3(false)}
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {buyType !== "offplan" && (
            <div className="col-lg-3">
              <div className="enter_loca ">
                {/* Main select-like box */}
                <div
                  className="select-box"
                  onClick={() => {
                    setIsDropDownOpen(false);
                    setIsDropDownOpen2(false);
                    setIsDropDownOpen4(false);
                    setIsDropDownOpen3(!isDropDownOpen3);
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
                    isDropDownOpen3
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
                        value={minPrice}
                        placeholder={0}
                        onChange={(e) => setMinPrice(e.target.value)}
                      />
                    </div>
                    <div className="input-group">
                      <span>Maximum</span>
                      <input
                        type="number"
                        id="maxArea"
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
                      onClick={() => setIsDropDownOpen3(false)}
                    >
                      Done
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="chat_gtp">
        <div>List your property with us - quick, esay, and flexible.</div>
        <div>
          <a
            className="chat_ptb"
            data-bs-toggle="modal"
            data-bs-target="#login_form"
          >
            List with us <i className="ri-arrow-right-up-long-line" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default HomeSearch;
