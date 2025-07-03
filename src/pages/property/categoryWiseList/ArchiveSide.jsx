import React from "react";
import new_side from "../../../assets/images/new_ads.jpg";
const ArchiveSide = () => {
  return (
    <>
      <div className="col-lg-3">
        <div className="right_page">
          <div className="recommended_s">
            <h5>
              <b>Recommended Searches</b>
            </h5>
            <hr />
            <ul>
              <li>
                <a href="#">The Community Sports Arena</a>
              </li>
              <li>
                <a href="#">Highly Accessible Spacious</a>
              </li>
              <li>
                <a href="#">Office for Rent in Al Qiyadah</a>
              </li>
              <li>
                <a href="#">Office for Rent in Al Qiyadah</a>
              </li>
            </ul>
          </div>
          <div className="new_adss">
            <img src={new_side} className="img-fluid" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ArchiveSide;
