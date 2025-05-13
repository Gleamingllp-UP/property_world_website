import React from 'react'
import { about_banner2 } from '../../assets/images'
const OurProfile = () => {
  return (
    <>
      <section className="content_area" id="down">
        <div className="container">
          <div className="row align-items-center ">
            <div className="col-lg-6">
              <div className="about_data_page">
                <h2>Our Profile</h2>
                <p>We are DED Licensed RERA certified, recognized  as the most trusted reliable name in the Real Estate sector in Dubai, United Arab Emirates. Over the course of more than a decade we have diligently built a remarkable reputation for our devoted services, which are widely known to add immense value to the Real Estate industry.</p>
                <p>We support any property needs when buying, selling, leasing, maintaining or managing within our comprehensive management system.</p>
                <p>We use most innovative techniques, customer care, maintenance and marketing strategies to satisfy our clients beyond their expectations</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about_photo">
                <img src={about_banner2} className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default OurProfile