import React from 'react';
import shapeBg from '../assets/images/Img/shape_bg.png';


const ExploreMoreProperties = () => {
  return (
  <>
    <section className="sugg" style={{ backgroundImage: `url(${shapeBg})` }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4">
              <div className="sugg_heading">
                <h3>Explore more <br />properties</h3>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="sugg_list">
                <ul>
                  <li><a href="#">Popular Rental Apartments in UAE</a></li>
                  <li><a href="#">Apartments for Rent in Dubai</a></li>
                  <li><a href="#">Apartments for Rent in Downtown Dubai</a></li>
                  <li><a href="#">Apartments for Rent in Dubai Marina</a></li>
                  <li><a href="#">Apartments for Rent in Jumeirah Village Circle (JVC)</a></li>
                  <li><a href="#">Apartments for Rent in Business Bay</a></li>
                  <li><a href="#">Apartments for Rent in Dubai Creek Harbour (The Lagoons)</a></li>
                  <li><a href="#">Apartments For Rent In Deira</a></li>
                  <li><a href="#">Studio Apartments For Rent in Dubai</a></li>
                  <li><a href="#">Apartments For Rent in Dubai Monthly</a></li>
                  <li><a href="#">Apartments For Rent in Dubai Silicon Oasis</a></li>
                  <li><a href="#">Apartments For Rent in Jumeirah Lake Towers (JLT)</a></li>
                  <li><a href="#">Apartments For Rent in Bur Dubai</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
  </>
  )
}

export default React.memo(ExploreMoreProperties)