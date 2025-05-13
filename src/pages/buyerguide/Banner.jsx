import React from 'react'
import about_banner from '../../assets/images/common/Buyer-Guide-Photo.jpg';

const Banner = () => {
  return (
    <>
        <div className="inner_banner" style={{ backgroundImage: `url(${about_banner})` }}>
        <div className="container">
          <div className="buyer_d">
            <h1>Buyer Guide</h1>
            <p>BUYER’S GUIDE TO PURCHASING PROPERTY IN DUBAI</p>
          </div>
        </div>
      </div>
      <div className="arrow_section">
        <div className="container">
          <div className="arrow_box">
            <a href="#down"><i className="ri-arrow-down-long-line" /></a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Banner