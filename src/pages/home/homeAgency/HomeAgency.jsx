import {
  partner1,
  partner2,
  partner3,
  partner4,
  partner5,
  partner6,
  partner7,
} from "@/assets/images";

import React from "react";
import Slider from "react-slick";
import "../../../assets/css/customSlick.css";
const partners = [
  partner1,
  partner2,
  partner3,
  partner4,
  partner5,
  partner6,
  partner7,
];

const settings = {
  dots: false,
  infinite: true,
  speed: 1000,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: true,
  variableWidth: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        variableWidth: false,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        variableWidth: false,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        variableWidth: false,
      },
    },
  ],
};

export default function homeAgency() {
  return (
    <section className="agency_partner">
    <div className="container">
      <div className="text-center title_area">
        <h2>Agency Partners</h2>
      </div>
      <div className="agency_logo slider slik_slider">
        <Slider {...settings}>
          {partners?.map((src, index) => (
            <div key={index}>
              <img src={src} alt={`Partner ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  </section>
  );
}
