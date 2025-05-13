import React from 'react'
import { mission } from '../../assets/images'
const Mission = () => {
  return (
    <>
      <section className="mission">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <div className="mission_data">
                <h3>Our Mission</h3>
                <p>Our mission in the real estate sector is centered around practicing and preserving our core values. Through unwavering commitment to integrity, professionalism, relationships, and industry advancement, we aspire to be a distinguished force in the market while elevating the overall standard of the sector.</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="mission_imm">
                <img src={mission} className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Mission