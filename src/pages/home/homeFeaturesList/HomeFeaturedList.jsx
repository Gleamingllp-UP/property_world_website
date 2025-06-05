import {
  bed,
  propert1,
  propert2,
  propert3,
  propert4,
  propert5,
  propert6,
  ruler,
} from "@/assets/images";
import { pageRoutes } from "@/router/pageRoutes";
import React from "react";
import { Link } from "react-router-dom";
function HomeFeaturedList() {
  return (
    <section className="featured_list">
      <div className="container">
        <div className="text-center title_area">
          <h2>Featured Properties</h2>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <div className="my_property">
              <div className="photo_my_photo">
                <span className="buy">Featured</span>
                <Link to={pageRoutes.PROPERTY_DETAILS}>
                  <img src={propert1} className="img-fluid" />
                </Link>
                <div className="new_listng">
                  <div>
                    <img src={bed} /> Studio{" "}
                  </div>
                  <div>
                    <img src={ruler} /> 481Sq Ft{" "}
                  </div>
                </div>
              </div>
              <div className="property_data">
                <div className="lease">
                  <span>999 Years</span>
                </div>
                <h4>The Community Sports Arena</h4>
                <div className="pro_diss">
                  <p>
                    Introducing The Community Sports Arena, located in Dubai
                    Sports City. Offering studio apartments to ...
                  </p>
                </div>
                <div className="other_data_list">
                  <div className="loction_c">
                    <i className="ri-map-pin-line" /> UAE
                  </div>
                  <div>
                    <i className="ri-eye-line" /> Dubai Sports City
                  </div>
                </div>
                <div className="action_p">
                  <div className="list_ppc">AED 603,888 </div>
                  <div>
                    <a href="property-details.php">
                      Read More <i className="ri-arrow-right-up-long-line" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="my_property">
              <div className="photo_my_photo">
                <span className="buy">Featured</span>
                <a href="property-details.php">
                  <img src={propert2} className="img-fluid" />
                </a>
                <div className="new_listng">
                  <div>
                    <img src={bed} /> Studio{" "}
                  </div>
                  <div>
                    <img src={ruler} /> 481Sq Ft{" "}
                  </div>
                </div>
              </div>
              <div className="property_data">
                <div className="lease">
                  <span>999 Years</span>
                </div>
                <h4>Oasis Loft</h4>
                <div className="pro_diss">
                  <p>
                    Introducing The Community Sports Arena, located in Dubai
                    Sports City. Offering studio apartments to ...
                  </p>
                </div>
                <div className="other_data_list">
                  <div className="loction_c">
                    <i className="ri-map-pin-line" /> UAE
                  </div>
                  <div>
                    <i className="ri-eye-line" /> Dubai Sports City
                  </div>
                </div>
                <div className="action_p">
                  <div className="list_ppc">AED 603,888 </div>
                  <div>
                    <a href="property-details.php">
                      Read More <i className="ri-arrow-right-up-long-line" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="my_property">
              <div className="photo_my_photo">
                <span className="buy">Featured</span>
                <a href="property-details.php">
                  <img src={propert3} className="img-fluid" />
                </a>
                <div className="new_listng">
                  <div>
                    <img src={bed} /> Studio{" "}
                  </div>
                  <div>
                    <img src={ruler} /> 481Sq Ft{" "}
                  </div>
                </div>
              </div>
              <div className="property_data">
                <div className="lease">
                  <span>999 Years</span>
                </div>
                <h4>Autograph S</h4>
                <div className="pro_diss">
                  <p>
                    Introducing The Community Sports Arena, located in Dubai
                    Sports City. Offering studio apartments to ...
                  </p>
                </div>
                <div className="other_data_list">
                  <div className="loction_c">
                    <i className="ri-map-pin-line" /> UAE
                  </div>
                  <div>
                    <i className="ri-eye-line" /> Dubai Sports City
                  </div>
                </div>
                <div className="action_p">
                  <div className="list_ppc">AED 603,888 </div>
                  <div>
                    <a href="property-details.php">
                      Read More <i className="ri-arrow-right-up-long-line" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="my_property">
              <div className="photo_my_photo">
                <span className="buy">Featured</span>
                <a href="property-details.php">
                  <img src={propert4} className="img-fluid" />
                </a>
                <div className="new_listng">
                  <div>
                    <img src={bed} /> Studio{" "}
                  </div>
                  <div>
                    <img src={ruler} /> 481Sq Ft{" "}
                  </div>
                </div>
              </div>
              <div className="property_data">
                <div className="lease">
                  <span>999 Years</span>
                </div>
                <h4>Guzel Tower</h4>
                <div className="pro_diss">
                  <p>
                    Introducing The Community Sports Arena, located in Dubai
                    Sports City. Offering studio apartments to ...
                  </p>
                </div>
                <div className="other_data_list">
                  <div className="loction_c">
                    <i className="ri-map-pin-line" /> UAE
                  </div>
                  <div>
                    <i className="ri-eye-line" /> Dubai Sports City
                  </div>
                </div>
                <div className="action_p">
                  <div className="list_ppc">AED 603,888 </div>
                  <div>
                    <a href="property-details.php">
                      Read More <i className="ri-arrow-right-up-long-line" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="my_property">
              <div className="photo_my_photo">
                <span className="buy">Featured</span>
                <a href="property-details.php">
                  <img src={propert5} className="img-fluid" />
                </a>
                <div className="new_listng">
                  <div>
                    <img src={bed} /> Studio{" "}
                  </div>
                  <div>
                    <img src={ruler} /> 481Sq Ft{" "}
                  </div>
                </div>
              </div>
              <div className="property_data">
                <div className="lease">
                  <span>999 Years</span>
                </div>
                <h4>Bayz 102 | Danube</h4>
                <div className="pro_diss">
                  <p>
                    Introducing The Community Sports Arena, located in Dubai
                    Sports City. Offering studio apartments to ...
                  </p>
                </div>
                <div className="other_data_list">
                  <div className="loction_c">
                    <i className="ri-map-pin-line" /> UAE
                  </div>
                  <div>
                    <i className="ri-eye-line" /> Dubai Sports City
                  </div>
                </div>
                <div className="action_p">
                  <div className="list_ppc">AED 603,888 </div>
                  <div>
                    <a href="property-details.php">
                      Read More <i className="ri-arrow-right-up-long-line" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="my_property">
              <div className="photo_my_photo">
                <span className="buy">Featured</span>
                <a href="property-details.php">
                  <img src={propert6} className="img-fluid" />
                </a>
                <div className="new_listng">
                  <div>
                    <img src={bed} /> Studio{" "}
                  </div>
                  <div>
                    <img src={ruler} /> 481Sq Ft{" "}
                  </div>
                </div>
              </div>
              <div className="property_data">
                <div className="lease">
                  <span>999 Years</span>
                </div>
                <h4>Samana Avenue – Studio + Pool</h4>
                <div className="pro_diss">
                  <p>
                    Introducing The Community Sports Arena, located in Dubai
                    Sports City. Offering studio apartments to ...
                  </p>
                </div>
                <div className="other_data_list">
                  <div className="loction_c">
                    <i className="ri-map-pin-line" /> UAE
                  </div>
                  <div>
                    <i className="ri-eye-line" /> Dubai Sports City
                  </div>
                </div>
                <div className="action_p">
                  <div className="list_ppc">AED 603,888 </div>
                  <div>
                    <a href="property-details.php">
                      Read More <i className="ri-arrow-right-up-long-line" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 text-center">
          <Link to={pageRoutes.PROPERTY_LISTING} className="action_btn mt20">
            View All Properties <i className="ri-arrow-right-up-long-line" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HomeFeaturedList;
