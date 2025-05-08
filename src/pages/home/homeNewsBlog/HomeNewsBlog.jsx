import { blog1, blog2, blog3, blog4 } from "@/assets/images";
import React from "react";

function HomeNewsBlog() {
  return (
    <section className="blogs">
      <div className="container">
        <div className="text-center title_area">
          <h2>News &amp; Blogs</h2>
        </div>
        <div className="row">
          <div className="col-lg-3">
            <div className="blogs_area">
              <div className="blogs_post">
                <a href="blog-details.php">
                  <img src={blog1} className="img-fluid" />
                  <span className="blog-plus" />
                </a>
                <div className="blog_content">
                  <span>April 08, 2025</span>
                  <h3>
                    <a href="blog-details.php">
                      Expert Tips for Profitable Real Estate Investments.
                    </a>
                  </h3>
                  <p>
                    John Smith | <a href="#">Furniture</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="blogs_area">
              <div className="blogs_post">
                <a href="blog-details.php">
                  <img src={blog2} className="img-fluid" />
                  <span className="blog-plus" />
                </a>
                <div className="blog_content">
                  <span>April 08, 2025</span>
                  <h3>
                    <a href="blog-details.php">
                      Finding Dream Home: Step by Step with us
                    </a>
                  </h3>
                  <p>
                    John Smith | <a href="#">Furniture</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="blogs_area">
              <div className="blogs_post">
                <a href="blog-details.php">
                  <img src={blog3} className="img-fluid" />
                  <span className="blog-plus" />
                </a>
                <div className="blog_content">
                  <span>April 08, 2025</span>
                  <h3>
                    <a href="blog-details.php">
                      Which Area Rug Material is Right for Your Apartment?
                    </a>
                  </h3>
                  <p>
                    John Smith | <a href="#">Furniture</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="blogs_area">
              <div className="blogs_post">
                <a href="blog-details.php">
                  <img src={blog4} className="img-fluid" />
                  <span className="blog-plus" />
                </a>
                <div className="blog_content">
                  <span>April 08, 2025</span>
                  <h3>
                    <a href="blog-details.php">
                      Freeform pool design using grass with cabana &amp;
                      waterfall
                    </a>
                  </h3>
                  <p>
                    John Smith | <a href="#">Furniture</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 text-center">
          <a href="blogs.php" className="action_btn mt20">
            View All Blogs <i className="ri-arrow-right-up-long-line" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default HomeNewsBlog;
