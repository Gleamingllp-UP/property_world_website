import React, { useState } from 'react';
import {
  swimming,
  sofa,
  parking,
  gym,
  cctv,
} from '@/assets/images';

const Features = () => {
  const allAmenities = [
    { icon: gym, label: 'Gym' },
    { icon: swimming, label: 'Swimming Pool' },
    { icon: parking, label: 'Parking' },
    { icon: cctv, label: '24/7 Security' },
    { icon: sofa, label: 'Furnished' },
    { icon: parking, label: 'Parking' },
    { icon: cctv, label: '24/7 Security' },
    { icon: gym, label: 'Gym' },
    { icon: swimming, label: 'Swimming Pool' },
  ];

  const [showAll, setShowAll] = useState(false);

  const visibleAmenities = showAll ? allAmenities : allAmenities.slice(0, 5);
  const remainingCount = allAmenities.length - 5;

  return (
    <>
      <hr />
      <div className="key_feature amenities">
        <p>Features / Amenities</p>
        <div className="row">
          {visibleAmenities.map((item, index) => (
            <div className="amy_amm" key={index}>
              <span>
                <img src={item.icon} alt={item.label} /> {item.label}
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
              {showAll ? 'Less amenities' : `+${remainingCount} more amenities`}
            </a>
          )}
        </div>
      </div>
      <hr />
    </>
  );
};

export default Features;
