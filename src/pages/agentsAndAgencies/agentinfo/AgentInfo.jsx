import React from 'react'
import AgentInfoside from './AgentInfoside';
import { Link } from "react-router-dom";
import {
  bath,
  bed,
  pro_comm3,
  pro_comm4,
  propert1,
  propert2,
  property_world_logo,
  ruler,
  user,
} from "../../../assets/images";
const AgentInfo = () => {
  return (
    <>
    <div className="container">
	<div className="row">
    <div className="col-lg-9">
        <div className="pro_keyword">
          <div><h3>Active Properties</h3></div>
          <div>
            <select className="pop_c">
              <option>Popularity</option>
              <option>Newest Listings</option>
              <option>Lowest Price</option>
              <option>Highest Price</option>
            </select>
          </div>
        </div>
        <p>Showing 1 - 12 of 18 Properties</p>
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
                  <h2>The Community Sports Arena</h2>
                  <div className="p_info">
                    <ul>
                      <li>Apartment</li>
                      <li><span><img src={bed} /> Studio </span>
                        <span><img src={bath} />1</span></li>
                      <li><img src={ruler} /> 396</li>
                    </ul>
                  </div>
                  <div className="loc"><i className="ri-map-pin-line" /> Dubai Sports City</div>
                  <div className="nearst_location">
                    <p><b>Nearest Location</b></p>
                    <ul>
                      <li>School: 1.2 km</li>
                      <li>Hospital: 1.5 km</li>
                      <li>Metro Station: 800 m</li>
                      <li>Supermarket: 600 m</li>
                    </ul>
                  </div>
                  <div className="call_action">
                    <ul>
                      <li> <a href="#"><i className="ri-phone-line" /> Call </a></li>
                      <li> <a href="#"><i className="ri-mail-open-line" /> Email </a></li>
                      <li> <a href="#"><i className="ri-whatsapp-line" /> WhatsApp </a></li>
                    </ul>
                    <span><img src={property_world_logo} /></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="list_box normal_listing">
            <div className="row">
              <div className="col-lg-5">
                <div className="normal_slider">
                  <div className="agent_d" data-bs-toggle="modal" data-bs-target="#agency_info"><i className="ri-checkbox-circle-fill" /> Checked</div>
                  <div className="my-slider">
                    <div><img src={propert2} className="img-fluid" /></div>
                    <div><img src={propert1} className="img-fluid" /></div>
                    <div><img src={pro_comm4} className="img-fluid" /></div>
                    <div><img src={propert2} className="img-fluid" /></div>
                  </div>
                </div>
                <div className="price_tt normal">
                  <span>AED <b>850,000</b> Yearly</span>
                  <span>Verified <i className="ri-verified-badge-fill" /></span>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="property_data_area">
                  <h2>The Community Sports Arena</h2>
                  <div className="p_info">
                    <ul>
                      <li>Apartment</li>
                      <li><span><img src={bed} /> Studio </span>
                        <span><img src={bath} />1</span></li>
                      <li><img src={ruler} /> 396</li>
                    </ul>
                  </div>
                  <div className="key_property">
                    <a href="#">Vacant Office  | High Floor |  2 Parking</a>
                  </div>
                  <div className="loc"><i className="ri-map-pin-line" /> Dubai Sports City</div>
                  <div className="call_action">
                    <ul>
                      <li> <a href="#"><i className="ri-phone-line" /> Call </a></li>
                      <li> <a href="#"><i className="ri-mail-open-line" /> Email </a></li>
                      <li> <a href="#"><i className="ri-whatsapp-line" /> WhatsApp </a></li>
                    </ul>
                    <span><img src={property_world_logo} /></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
         
         
          
        </div>
        <div className="col-12 text-center mb-5 mt-5">
          <ul className="pagination">
            <li className="page-item disabled">
              <a className="page-link">Previous</a>
            </li>
            <li className="page-item"><a className="page-link" href="#">1</a></li>
            <li className="page-item active" aria-current="page">
              <a className="page-link" href="#">2</a>
            </li>
            <li className="page-item"><a className="page-link" href="#">3</a></li>
            <li className="page-item"><a className="page-link" href="#">4</a></li>
            <li className="page-item"><a className="page-link" href="#">5</a></li>
            <li className="page-item"><a className="page-link" href="#">6</a></li>
            <li className="page-item">
              <a className="page-link" href="#">Next</a>
            </li>
          </ul>
        </div>
      </div>
    <AgentInfoside />
    </div>
    </div>
    </>
  )
}

export default AgentInfo