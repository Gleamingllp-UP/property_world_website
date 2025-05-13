import React from 'react'
import { vission } from '../../assets/images'
const Vision = () => {
  return (
    <>
      <section className="vision">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4">
              <div className="vision_imm">
                <img src={vission} className="img-fluid" />
              </div>
            </div>
            <div className="col-lg-8">
              <div className="vision_data">
                <h3>Our Vision</h3>
                <p>Our vision is to become the leading provider of premium real estate services in the market offering unparalleled reliability to our esteemed clientele.</p>
                <p>We aim to surpass all expectations and solidify our position as the most reliable provider of premium real estate services in the industry.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Vision