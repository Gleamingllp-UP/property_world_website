import React, { useState } from "react";
import { useSelector } from "react-redux";

const Features = () => {
  const { propertyDetails } = useSelector((store) => store?.property);

  const allAmenities = propertyDetails?.amenitiesAndFacilitiesData || [];

  const [showAll, setShowAll] = useState(false);

  const visibleAmenities = showAll ? allAmenities : allAmenities.slice(0, 5);
  const remainingCount = allAmenities.length - 5;

  return (
    <>
      <hr />
      <div className="key_feature amenities">
        <p>Features / Amenities</p>
        <div className="row">
          {visibleAmenities &&
            visibleAmenities?.map((item, index) => (
              <div className="amy_amm" key={index}>
                <span>
                  <img src={item?.image} alt={item?.nam?.toLowerCase()} />{" "}
                  {item?.name}
                </span>
              </div>
            ))}

          {allAmenities.length > 5 && (
            <a
              href="#"
              id="loadMore"
              className="last_amm"
              onClick={(e) => {
                e.preventDefault();
                setShowAll(!showAll);
              }}
            >
              {showAll ? "Less amenities" : `+${remainingCount} more amenities`}
            </a>
          )}
        </div>
      </div>
      <hr />
    </>
  );
};

export default Features;
