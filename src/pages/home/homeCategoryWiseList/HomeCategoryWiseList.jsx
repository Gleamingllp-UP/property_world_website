import {
  bed,
  propert1,
  ruler,
  propert2,
  propert3,
  propert4,
  propert5,
  propert6,
  pro_comm1,
  pro_comm2,
  pro_comm3,
  pro_comm4,
  pro_comm5,
  pro_comm6,
} from "@/assets/images";
import { Link } from "react-router-dom";
import { pageRoutes } from "../../../router/pageRoutes";

function HomeCategoryWiseList() {
  return (
    <section className="buy_rent">
      <div className="container">
        <div className="text-center title_area">
          <h2>Buy - Rent - Commercial </h2>
        </div>
        <div className="">
          <nav className="list_ui">
            <div className="nav nav-tabs mb-3" id="nav-tab" role="tablist">
              <button
                className="nav-link active"
                id="nav-buy-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-buy"
                type="button"
                role="tab"
                aria-controls="nav-buy"
                aria-selected="true"
              >
                Buy
              </button>
              <button
                className="nav-link"
                id="nav-rent-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-rent"
                type="button"
                role="tab"
                aria-controls="nav-rent"
                aria-selected="false"
              >
                Rent
              </button>
              <button
                className="nav-link"
                id="nav-commercial -tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-commercial "
                type="button"
                role="tab"
                aria-controls="nav-rent"
                aria-selected="false"
              >
                Commercial{" "}
              </button>
            </div>
          </nav>
          <div className="tab-content " id="nav-tabContent">
            <div
              className="tab-pane fade active show"
              id="nav-buy"
              role="tabpanel"
              aria-labelledby="nav-buy-tab"
            >
              <div className="row">
                <div className="col-sm-4">
                  <div className="my_property">
                    <div className="photo_my_photo">
                      <span className="buy">Buy</span>
                      <a href="property-details.php">
                        <img src={propert1} className="img-fluid" />
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
                      <h4>The Community Sports Arena</h4>
                      <div className="pro_diss">
                        <p>
                          Introducing The Community Sports Arena, located in
                          Dubai Sports City. Offering studio apartments to ...
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
                            Read More{" "}
                            <i className="ri-arrow-right-up-long-line" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="my_property">
                    <div className="photo_my_photo">
                      <span className="buy">Buy</span>
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
                          Introducing The Community Sports Arena, located in
                          Dubai Sports City. Offering studio apartments to ...
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
                            Read More{" "}
                            <i className="ri-arrow-right-up-long-line" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="my_property">
                    <div className="photo_my_photo">
                      <span className="buy">Buy</span>
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
                          Introducing The Community Sports Arena, located in
                          Dubai Sports City. Offering studio apartments to ...
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
                            Read More{" "}
                            <i className="ri-arrow-right-up-long-line" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="my_property">
                    <div className="photo_my_photo">
                      <span className="buy">Buy</span>
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
                          Introducing The Community Sports Arena, located in
                          Dubai Sports City. Offering studio apartments to ...
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
                            Read More{" "}
                            <i className="ri-arrow-right-up-long-line" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="my_property">
                    <div className="photo_my_photo">
                      <span className="buy">Buy</span>
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
                          Introducing The Community Sports Arena, located in
                          Dubai Sports City. Offering studio apartments to ...
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
                            Read More{" "}
                            <i className="ri-arrow-right-up-long-line" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="my_property">
                    <div className="photo_my_photo">
                      <span className="buy">Buy</span>
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
                          Introducing The Community Sports Arena, located in
                          Dubai Sports City. Offering studio apartments to ...
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
                            Read More{" "}
                            <i className="ri-arrow-right-up-long-line" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 text-center">
                <Link
                  to={pageRoutes.PROPERTY_LISTING}
                  className="action_btn mt20"
                >
                  View All Properties{" "}
                  <i className="ri-arrow-right-up-long-line" />
                </Link>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="nav-rent"
              role="tabpanel"
              aria-labelledby="nav-rent-tab"
            >
              <div className="row">
                <div className="col-sm-4">
                  <div className="my_property">
                    <div className="photo_my_photo">
                      <span className="buy">Rent</span>
                      <a href="property-details.php">
                        <img src={propert1} className="img-fluid" />
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
                      <h4>The Community Sports Arena</h4>
                      <div className="pro_diss">
                        <p>
                          Introducing The Community Sports Arena, located in
                          Dubai Sports City. Offering studio apartments to ...
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
                            Read More{" "}
                            <i className="ri-arrow-right-up-long-line" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="my_property">
                    <div className="photo_my_photo">
                      <span className="buy">Rent</span>
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
                          Introducing The Community Sports Arena, located in
                          Dubai Sports City. Offering studio apartments to ...
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
                            Read More{" "}
                            <i className="ri-arrow-right-up-long-line" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="my_property">
                    <div className="photo_my_photo">
                      <span className="buy">Rent</span>
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
                          Introducing The Community Sports Arena, located in
                          Dubai Sports City. Offering studio apartments to ...
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
                            Read More{" "}
                            <i className="ri-arrow-right-up-long-line" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="my_property">
                    <div className="photo_my_photo">
                      <span className="buy">Rent</span>
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
                          Introducing The Community Sports Arena, located in
                          Dubai Sports City. Offering studio apartments to ...
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
                            Read More{" "}
                            <i className="ri-arrow-right-up-long-line" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="my_property">
                    <div className="photo_my_photo">
                      <span className="buy">Rent</span>
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
                          Introducing The Community Sports Arena, located in
                          Dubai Sports City. Offering studio apartments to ...
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
                            Read More{" "}
                            <i className="ri-arrow-right-up-long-line" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="my_property">
                    <div className="photo_my_photo">
                      <span className="buy">Rent</span>
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
                          Introducing The Community Sports Arena, located in
                          Dubai Sports City. Offering studio apartments to ...
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
                            Read More{" "}
                            <i className="ri-arrow-right-up-long-line" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 text-center">
                <Link
                  to={pageRoutes.PROPERTY_LISTING}
                  className="action_btn mt20"
                >
                  View All Properties{" "}
                  <i className="ri-arrow-right-up-long-line" />
                </Link>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="nav-commercial"
              role="tabpanel"
              aria-labelledby="nav-commercial-tab"
            >
              <div className="row">
                <div className="col-sm-4">
                  <div className="my_property">
                    <div className="photo_my_photo">
                      <span className="buy">Commercial</span>
                      <a href="property-details.php">
                        <img src={pro_comm1} className="img-fluid" />
                      </a>
                      <div className="new_listng">
                        <div>
                          <img src={bed} /> 0{" "}
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
                      <h4>Office for Rent in Al Qiyadah</h4>
                      <div className="pro_diss">
                        <p>
                          Introducing The Community Sports Arena, located in
                          Dubai Sports City. Offering studio apartments to ...
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
                            Read More{" "}
                            <i className="ri-arrow-right-up-long-line" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="my_property">
                    <div className="photo_my_photo">
                      <span className="buy">Commercial</span>
                      <a href="property-details.php">
                        <img src={pro_comm2} className="img-fluid" />
                      </a>
                      <div className="new_listng">
                        <div>
                          <img src={bed} /> 0{" "}
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
                          Introducing The Community Sports Arena, located in
                          Dubai Sports City. Offering studio apartments to ...
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
                            Read More{" "}
                            <i className="ri-arrow-right-up-long-line" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="my_property">
                    <div className="photo_my_photo">
                      <span className="buy">Commercial</span>
                      <a href="property-details.php">
                        <img src={pro_comm3} className="img-fluid" />
                      </a>
                      <div className="new_listng">
                        <div>
                          <img src={bed} /> 0{" "}
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
                          Introducing The Community Sports Arena, located in
                          Dubai Sports City. Offering studio apartments to ...
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
                            Read More{" "}
                            <i className="ri-arrow-right-up-long-line" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="my_property">
                    <div className="photo_my_photo">
                      <span className="buy">Commercial</span>
                      <a href="property-details.php">
                        <img src={pro_comm4} className="img-fluid" />
                      </a>
                      <div className="new_listng">
                        <div>
                          <img src={bed} /> 0{" "}
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
                          Introducing The Community Sports Arena, located in
                          Dubai Sports City. Offering studio apartments to ...
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
                            Read More{" "}
                            <i className="ri-arrow-right-up-long-line" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="my_property">
                    <div className="photo_my_photo">
                      <span className="buy">Commercial</span>
                      <a href="property-details.php">
                        <img src={pro_comm5} className="img-fluid" />
                      </a>
                      <div className="new_listng">
                        <div>
                          <img src={bed} /> 0{" "}
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
                          Introducing The Community Sports Arena, located in
                          Dubai Sports City. Offering studio apartments to ...
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
                            Read More{" "}
                            <i className="ri-arrow-right-up-long-line" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="my_property">
                    <div className="photo_my_photo">
                      <span className="buy">Commercial</span>
                      <a href="property-details.php">
                        <img src={pro_comm6} className="img-fluid" />
                      </a>
                      <div className="new_listng">
                        <div>
                          <img src={bed} /> 0{" "}
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
                          Introducing The Community Sports Arena, located in
                          Dubai Sports City. Offering studio apartments to ...
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
                            Read More{" "}
                            <i className="ri-arrow-right-up-long-line" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 text-center">
                <Link
                  to={pageRoutes.PROPERTY_LISTING}
                  className="action_btn mt20"
                >
                  View All Properties{" "}
                  <i className="ri-arrow-right-up-long-line" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeCategoryWiseList;
