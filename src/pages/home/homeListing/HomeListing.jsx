import { ads } from '@/assets/images'
import React from 'react'

function HomeListing() {
  return (
    <section className="listing_action">
    <div className="container">
      <div
        className="property_list"
        style={{ backgroundImage: `url(${ads})` }}
      >
        <h2>
          List Your Properties On <br />
          Property World, Join Us Now!
        </h2>
        <p>
          Our property listings feature a wide variety of residential and
          commercial properties, <br />
          designed to meet the diverse needs of buyers, sellers, and renters.
        </p>
        <a data-bs-toggle="modal" data-bs-target="#login_form">
          Become An Agent <i className="ri-arrow-right-up-long-line" />
        </a>
      </div>
    </div>
  </section>
  
  )
}

export default HomeListing