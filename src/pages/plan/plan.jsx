import React, { useEffect } from 'react';
import '../../assets/css/plan.css';

const Plan = () => {

  return (
    <>
      <section className="pricing-section">
        <div className="container">
          <div className="sec-title text-center">
            <span className="title">Get plan</span>
            <h2>Choose a Plan</h2>
          </div>

          <div className="outer-box">
            <div className="row">
              {/* Pricing Block 1 */}
              <div className="pricing-block col-lg-4 col-md-6 col-sm-12 wow fadeInUp">
                <div className="inner-box">
                  <div className="icon-box">
                    <div className="icon-outer">
                      <i className="fas fa-paper-plane"></i>
                    </div>
                  </div>
                  <div className="price-box">
                    <div className="title">Day Pass</div>
                    <h4 className="price">AED{' '}35.99</h4>
                  </div>
                  <ul className="features">
                    <li className="true">Conference plans</li>
                    <li className="true">Free Lunch And Coffee</li>
                    <li className="true">Certificate</li>
                    <li className="false">Easy Access</li>
                    <li className="false">Free Contacts</li>
                  </ul>
                  <div className="btn-box">
                    <a href="https://codepen.io/anupkumar92" className="theme-btn">BUY plan</a>
                  </div>
                </div>
              </div>

              {/* Pricing Block 2 */}
              <div className="pricing-block col-lg-4 col-md-6 col-sm-12 wow fadeInUp" data-wow-delay="400ms">
                <div className="inner-box">
                  <div className="icon-box">
                    <div className="icon-outer">
                      <i className="fas fa-gem"></i>
                    </div>
                  </div>
                  <div className="price-box">
                    <div className="title">Full Pass</div>
                    <h4 className="price">AED{' '}99.99</h4>
                  </div>
                  <ul className="features">
                    <li className="true">Conference plans</li>
                    <li className="true">Free Lunch And Coffee</li>
                    <li className="true">Certificate</li>
                    <li className="true">Easy Access</li>
                    <li className="false">Free Contacts</li>
                  </ul>
                  <div className="btn-box">
                    <a href="https://codepen.io/anupkumar92" className="theme-btn">BUY plan</a>
                  </div>
                </div>
              </div>

              {/* Pricing Block 3 */}
              <div className="pricing-block col-lg-4 col-md-6 col-sm-12 wow fadeInUp" data-wow-delay="800ms">
                <div className="inner-box">
                  <div className="icon-box">
                    <div className="icon-outer">
                      <i className="fas fa-rocket"></i>
                    </div>
                  </div>
                  <div className="price-box">
                    <div className="title">Group Pass</div>
                    <h4 className="price">AED{' '}199.99</h4>
                  </div>
                  <ul className="features">
                    <li className="true">Conference plans</li>
                    <li className="true">Free Lunch And Coffee</li>
                    <li className="true">Certificate</li>
                    <li className="true">Easy Access</li>
                    <li className="true">Free Contacts</li>
                  </ul>
                  <div className="btn-box">
                    <a href="https://codepen.io/anupkumar92" className="theme-btn">BUY plan</a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Plan;
