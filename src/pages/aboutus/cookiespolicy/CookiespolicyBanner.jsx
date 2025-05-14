import React from 'react'
import { about_banner } from '../../assets/images';
const CookiespolicyBanner = () => {
  return (
    <>
      <div className="inner_banner" style={{ backgroundImage: `url(${about_banner})` }}>
            <div className="container">
              <div className="buyer_d">
                <h1>About us</h1>
                <p />
              </div>
            </div>
          </div>
         <div className="arrow_section">
        <div className="container">
            <div className="arrow_box">
                <a href="#down"><i className="ri-arrow-down-long-line"></i></a>
            </div>
        </div>
    </div>
    </>
  )
}

export default CookiespolicyBanner