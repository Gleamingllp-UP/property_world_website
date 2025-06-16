import React from "react";
import {
  bath,
  bed,
  pop1,
  propert2,
  propert3,
  propert4,
  ruler,
} from "../../../assets/images";
import { useSelector } from "react-redux";
import { SimilarPropertyCardSkeleton } from "../../../Custom_Components/Skeleton/PropertySkeleton";

const SimlarProperty = () => {
  const { isLoading } = useSelector((store) => store?.property);

  return (
    <>
      <div className="key_feature">
        <p>Similar Properties</p>
        {isLoading ? (
          <SimilarPropertyCardSkeleton />
        ) : (
          <div className="row">
            <div className="col-lg-6">
              <div className="pop_search light_b">
                <div className="pop_photo">
                  <a href="property-details.php">
                    <img src={pop1} className="img-fluid" />
                  </a>
                </div>
                <div className="pop_data">
                  <h3>2BHK in Dubai Marina</h3>
                  <p>AED 830,000</p>
                  <div className="p_info2">
                    <ul>
                      <li>
                        <img src={bed} /> 1{" "}
                      </li>
                      <li>
                        <img src={bath} />1
                      </li>
                      <li>
                        <img src={ruler} /> 396
                      </li>
                    </ul>
                  </div>
                  <div className="loc">
                    <i className="ri-map-pin-line" /> Dubai Sports City
                  </div>
                  <a href="property-details.php">
                    Explore Now <i className="ri-arrow-right-up-long-line" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="pop_search light_b">
                <div className="pop_photo">
                  <a href="property-details.php">
                    <img src={propert2} className="img-fluid" />
                  </a>
                </div>
                <div className="pop_data">
                  <h3>1BHK in Al Barsha</h3>
                  <p>AED 830,000</p>
                  <div className="p_info2">
                    <ul>
                      <li>
                        <img src={bed} /> 1{" "}
                      </li>
                      <li>
                        <img src={bath} />1
                      </li>
                      <li>
                        <img src={ruler} /> 396
                      </li>
                    </ul>
                  </div>
                  <div className="loc">
                    <i className="ri-map-pin-line" /> Dubai Sports City
                  </div>
                  <a href="property-details.php">
                    Explore Now <i className="ri-arrow-right-up-long-line" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="pop_search light_b">
                <div className="pop_photo">
                  <a href="property-details.php">
                    <img src={propert3} className="img-fluid" />
                  </a>
                </div>
                <div className="pop_data">
                  <h3>Apartment in Downtown</h3>
                  <p>AED 950,000</p>
                  <div className="p_info2">
                    <ul>
                      <li>
                        <img src={bed} /> 1{" "}
                      </li>
                      <li>
                        <img src={bath} />1
                      </li>
                      <li>
                        <img src={ruler} /> 396
                      </li>
                    </ul>
                  </div>
                  <div className="loc">
                    <i className="ri-map-pin-line" /> Dubai Sports City
                  </div>
                  <a href="property-details.php">
                    Explore Now <i className="ri-arrow-right-up-long-line" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="pop_search light_b">
                <div className="pop_photo">
                  <a href="property-details.php">
                    <img src={propert4} className="img-fluid" />
                  </a>
                </div>
                <div className="pop_data">
                  <h3>1BHK in Al Barsha</h3>
                  <p>AED 830,000</p>
                  <div className="p_info2">
                    <ul>
                      <li>
                        <img src={bed} /> 1{" "}
                      </li>
                      <li>
                        <img src={bath} />1
                      </li>
                      <li>
                        <img src={ruler} /> 396
                      </li>
                    </ul>
                  </div>
                  <div className="loc">
                    <i className="ri-map-pin-line" /> Dubai Sports City
                  </div>
                  <a href="property-details.php">
                    Explore Now <i className="ri-arrow-right-up-long-line" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SimlarProperty;
