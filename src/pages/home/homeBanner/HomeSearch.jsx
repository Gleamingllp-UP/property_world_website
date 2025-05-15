import React from "react";

function HomeSearch() {
  return (
    <div className="main_search">
      <div className="padd">
        <div className="row">
          <div className="col-lg-3">
            <div className="buy_rent_search">
              <ul>
                <li>
                  <input
                    type="radio"
                    id="rdo2_1"
                    className="radio-input"
                    name="radio-group2"
                    defaultValue=""
                    defaultChecked=""
                  />
                  <label htmlFor="rdo2_1" className="radio-label">
                    <span className="radio-border">Buy</span>
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="rdo2_2"
                    className="radio-input"
                    name="radio-group2"
                    defaultValue=""
                  />
                  <label htmlFor="rdo2_2" className="radio-label">
                    <span className="radio-border">Rent</span>
                  </label>
                </li>
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
          <div className="col-lg-3">
            <div className="all_cta">
              <ul>
                <li>
                  <input
                    type="radio"
                    id="crdo2_1"
                    className="radio-input"
                    name="radio-group02"
                    defaultValue=""
                    defaultChecked=""
                  />
                  <label htmlFor="crdo2_1" className="radio-label">
                    <span className="radio-border">All</span>
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="brdo2_2"
                    className="radio-input"
                    name="radio-group02"
                    defaultValue=""
                  />
                  <label htmlFor="brdo2_2" className="radio-label">
                    <span className="radio-border">Ready</span>
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="ardo2_3"
                    className="radio-input"
                    name="radio-group02"
                    defaultValue=""
                  />
                  <label htmlFor="ardo2_3" className="radio-label">
                    <span className="radio-border">Off-plan</span>
                  </label>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="enter_loca">
              <div className="form-group">
                {/* Main select-like box */}
                <div
                  className="select-box"
                  onclick="toggleOptions2()"
                  id="mainSelectBox2"
                >
                  <div className="selected-items" id="selectedItems2">
                    Residential
                  </div>
                </div>
                {/* Hidden content with checkboxes */}
                <div className="content-wrapper" id="roomOptions2">
                  <div className="room-section" id="bedroomSection2">
                    <div className="res_comm">
                      <div className="b1 selet">
                        <span id="res_b">Residential</span>
                      </div>
                      <div className="b2 ">
                        <span id="comm_b">Commercial</span>
                      </div>
                    </div>
                    <div className="residential_list">
                      <div className="button_class">
                        <button> Apartment</button>
                        <button> Townhouse</button>
                        <button> Villa Compound</button>
                        <button> Land</button>
                        <button> Building</button>
                        <button> Villa</button>
                        <button> Penthouse</button>
                        <button> Hotel Apartment</button>
                        <button> Floor</button>
                      </div>
                      <div className="res_done">
                        <button className="btn">Reset</button>
                        <button className="btn done_b">Done</button>
                      </div>
                    </div>
                    <div className="commercial_list ">
                      <div className="button_class">
                        <button> Office</button>
                        <button> Warehouse</button>
                        <button> Villa</button>
                        <button> Land</button>
                        <button> Building</button>
                        <button> Industrial Land</button>
                        <button> Showroom</button>
                        <button> Shop</button>
                        <button> Labour Camp</button>
                        <button> Bulk Unit</button>
                        <button> Floor</button>
                        <button> Factory</button>
                        <button> Mixed Use Land</button>
                        <button> Other Commercial</button>
                      </div>
                      <div className="res_done">
                        <button className="btn">Reset</button>
                        <button className="btn done_b">Done</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="enter_loca">
              <div className="form-group">
                {/* Main select-like box */}
                <div
                  className="select-box"
                  onclick="toggleOptions()"
                  id="mainSelectBox"
                >
                  <div className="selected-items" id="selectedItems">
                    Beds &amp; Baths
                  </div>
                </div>
                {/* Hidden content with checkboxes */}
                <div className="content-wrapper" id="roomOptions">
                  <div className="room-section" id="bedroomSection">
                    <div className="room-title">Bedroom</div>
                    <div className="checkbox-group">
                      <input
                        type="checkbox"
                        id="studio"
                        defaultValue="Studio"
                        onchange="updateSelected()"
                      />
                      <label htmlFor="studio">Studio</label>
                      <input
                        type="checkbox"
                        id={1}
                        defaultValue={1}
                        onchange="updateSelected()"
                      />
                      <label htmlFor={1}>1</label>
                      <input
                        type="checkbox"
                        id={2}
                        defaultValue={2}
                        onchange="updateSelected()"
                      />
                      <label htmlFor={2}>2</label>
                      <input
                        type="checkbox"
                        id={3}
                        defaultValue={3}
                        onchange="updateSelected()"
                      />
                      <label htmlFor={3}>3</label>
                      <input
                        type="checkbox"
                        id={4}
                        defaultValue={4}
                        onchange="updateSelected()"
                      />
                      <label htmlFor={4}>4</label>
                      <input
                        type="checkbox"
                        id={5}
                        defaultValue={5}
                        onchange="updateSelected()"
                      />
                      <label htmlFor={5}>5</label>
                      <input
                        type="checkbox"
                        id={6}
                        defaultValue={6}
                        onchange="updateSelected()"
                      />
                      <label htmlFor={6}>6</label>
                      <input
                        type="checkbox"
                        id={7}
                        defaultValue={7}
                        onchange="updateSelected()"
                      />
                      <label htmlFor={7}>7</label>
                      <input
                        type="checkbox"
                        id="7+"
                        defaultValue="7+"
                        onchange="updateSelected()"
                      />
                      <label htmlFor="7+">7+</label>
                    </div>
                  </div>
                  <div className="room-section" id="bathroomSection">
                    <div className="room-title">Bathroom</div>
                    <div className="checkbox-group">
                      <input
                        type="checkbox"
                        id="bath1"
                        defaultValue={1}
                        onchange="updateSelected()"
                      />
                      <label htmlFor="bath1">1</label>
                      <input
                        type="checkbox"
                        id="bath2"
                        defaultValue={2}
                        onchange="updateSelected()"
                      />
                      <label htmlFor="bath2">2</label>
                      <input
                        type="checkbox"
                        id="bath3"
                        defaultValue={3}
                        onchange="updateSelected()"
                      />
                      <label htmlFor="bath3">3</label>
                      <input
                        type="checkbox"
                        id="bath4"
                        defaultValue={4}
                        onchange="updateSelected()"
                      />
                      <label htmlFor="bath4">4</label>
                      <input
                        type="checkbox"
                        id="bath5"
                        defaultValue={5}
                        onchange="updateSelected()"
                      />
                      <label htmlFor="bath5">5</label>
                      <input
                        type="checkbox"
                        id="bath6"
                        defaultValue={6}
                        onchange="updateSelected()"
                      />
                      <label htmlFor="bath6">6</label>
                      <input
                        type="checkbox"
                        id="bath7"
                        defaultValue={7}
                        onchange="updateSelected()"
                      />
                      <label htmlFor="bath7">7</label>
                      <input
                        type="checkbox"
                        id="bath7+"
                        defaultValue="7+"
                        onchange="updateSelected()"
                      />
                      <label htmlFor="bath7+">7+</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="enter_loca ">
              {/* Main select-like box */}
              <div
                className="select-box"
                onclick="toggleOptions3()"
                id="mainSelectBox3"
              >
                <div className="selected-items" id="selectedItems3">
                  Price (AED)
                </div>
              </div>
              {/* Hidden content with input fields */}
              <div className="content-wrapper width_space" id="areaOptions">
                <div className="fxx">
                  <div className="input-group">
                    <span>Minimum</span>
                    <input
                      type="text"
                      id="minArea"
                      placeholder={0}
                      onchange="updateSelected3()"
                    />
                  </div>
                  <div className="input-group">
                    <span>Maximum</span>
                    <input
                      type="text"
                      id="maxArea"
                      placeholder="Any"
                      onchange="updateSelected3()"
                    />
                  </div>
                </div>
                <div className="res_done">
                  <button className="btn">Reset</button>
                  <button className="btn done_b">Done</button>
                </div>
              </div>
            </div>
          </div>
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
