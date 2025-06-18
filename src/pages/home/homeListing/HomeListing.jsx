import { ads } from '@/assets/images'
import React from 'react'
import { Link } from 'react-router-dom'
import { pageRoutes } from '../../../router/pageRoutes'


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
        <Link to={pageRoutes?.SIGN_UP} >
          Become An Agent <i className="ri-arrow-right-up-long-line" />
        </Link>
      </div>
    </div>
  </section>
  
  )
}

export default HomeListing