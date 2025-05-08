import { banner, blog2, blog4, home_banner, pop1 } from "@/assets/images";
import React from "react";

function HomePopularSearches() {
  return (
    <section className="popular_searches">
      <div className="container">
        <div className="text-center title_area">
          <h2>Popular Searches</h2>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <div className="pop_search">
              <div className="pop_photo">
                <img src={pop1} className="img-fluid" />
              </div>
              <div className="pop_data">
                <h3>Apartments in Downtown Dubai</h3>
                <p>6 Properties</p>
                <a href="property-details.php">
                  Explore Now <i className="ri-arrow-right-up-long-line" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="pop_search">
              <div className="pop_photo">
                <img src={blog2} className="img-fluid" />
              </div>
              <div className="pop_data">
                <h3>Villas in Palm Jumeirah</h3>
                <p>6 Properties</p>
                <a href="property-details.php">
                  Explore Now <i className="ri-arrow-right-up-long-line" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="pop_search">
              <div className="pop_photo">
                <img src={blog4} className="img-fluid" />
              </div>
              <div className="pop_data">
                <h3>Apartments in Downtown Dubai</h3>
                <p>9 Properties</p>
                <a href="property-details.php">
                  Explore Now <i className="ri-arrow-right-up-long-line" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="pop_search">
              <div className="pop_photo">
                <img src={home_banner} className="img-fluid" />
              </div>
              <div className="pop_data">
                <h3>Affordable Rentals in Sharjah</h3>
                <p>12 Properties</p>
                <a href="property-details.php">
                  Explore Now <i className="ri-arrow-right-up-long-line" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="pop_search">
              <div className="pop_photo">
                <img src={banner} className="img-fluid" />
              </div>
              <div className="pop_data">
                <h3>Apartments in Downtown Dubai</h3>
                <p>6 Properties</p>
                <a href="property-details.php">
                  Explore Now <i className="ri-arrow-right-up-long-line" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="pop_search">
              <div className="pop_photo">
                <img src={pop1} className="img-fluid" />
              </div>
              <div className="pop_data">
                <h3>Apartments in Downtown Dubai</h3>
                <p>4 Properties</p>
                <a href="property-details.php">
                  Explore Now <i className="ri-arrow-right-up-long-line" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePopularSearches;
