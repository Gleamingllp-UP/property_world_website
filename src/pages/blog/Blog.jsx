import React from 'react'

import blogimg1 from '../../assets/images/common/blog1.webp';
import blogimg2 from '../../assets/images/common/blog2.jpg';
import blogimg3 from '../../assets/images/common/blog3.webp';
const Blog = () => {
  return (
    <>
       <div className="col-lg-8">
        <div className="row">
          <div className="col-lg-12">
            <div className="big_blog">
              <div className="img_boxx">
                <a href="blog-details.php"><img src={blogimg1} className="img-fluid" /></a>
                <span>April 08, 2025</span>
              </div>
              <div className="big_content">
                <p>John Smith | <a href="#">Furniture</a></p>
                <h2><a href="blog-details.php">How to Spot High-Yield Rental Properties in Dubai</a></h2>
                <p>Dubai is renowned for its thriving real estate market, offering lucrative opportunities for investors seeking high rental yields. However, identifying the best properties </p>
                <a href="blog-details.php">Read More <i className="ri-arrow-right-up-line" /></a>
              </div>
            </div>
          </div>
          <div className="col-lg-12"><hr /></div>
          <div className="col-lg-6">
            <div className="blogs_area">
              <div className="blogs_post">
                <a href="blog-details.php"><img src={blogimg1} className="img-fluid" />
                  <span className="blog-plus" />
                </a>
                <div className="blog_content">
                  <span>April 08, 2025</span>
                  <h3><a href="blog-details.php">Expert Tips for Profitable Real Estate Investments.</a></h3>
                  <p>John Smith | <a href="#">Furniture</a></p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="blogs_area">
              <div className="blogs_post">
                <a href="blog-details.php"><img src={blogimg2} className="img-fluid" />
                  <span className="blog-plus" />
                </a>
                <div className="blog_content">
                  <span>April 08, 2025</span>
                  <h3><a href="blog-details.php">Finding Dream Home: Step by Step with us</a></h3>
                  <p>John Smith | <a href="#">Furniture</a></p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="blogs_area">
              <div className="blogs_post">
                <a href="blog-details.php"><img src={blogimg3} className="img-fluid" />
                  <span className="blog-plus" />
                </a>
                <div className="blog_content">
                  <span>April 08, 2025</span>
                  <h3><a href="blog-details.php">Which Area Rug Material is Right for Your Apartment?</a></h3>
                  <p>John Smith | <a href="#">Furniture</a></p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="blogs_area">
              <div className="blogs_post">
                <a href="blog-details.php"><img src={blogimg2} className="img-fluid" />
                  <span className="blog-plus" />
                </a>
                <div className="blog_content">
                  <span>April 08, 2025</span>
                  <h3><a href="blog-details.php">Freeform pool design using grass with cabana &amp; waterfall</a></h3>
                  <p>John Smith | <a href="#">Furniture</a></p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="blogs_area">
              <div className="blogs_post">
                <a href="blog-details.php"><img src={blogimg1} className="img-fluid" />
                  <span className="blog-plus" />
                </a>
                <div className="blog_content">
                  <span>April 08, 2025</span>
                  <h3><a href="blog-details.php">Expert Tips for Profitable Real Estate Investments.</a></h3>
                  <p>John Smith | <a href="#">Furniture</a></p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="blogs_area">
              <div className="blogs_post">
                <a href="blog-details.php"><img src={blogimg2} className="img-fluid" />
                  <span className="blog-plus" />
                </a>
                <div className="blog_content">
                  <span>April 08, 2025</span>
                  <h3><a href="blog-details.php">Finding Dream Home: Step by Step with us</a></h3>
                  <p>John Smith | <a href="#">Furniture</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 text-center mt-5">
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
    </>
  )
}

export default Blog