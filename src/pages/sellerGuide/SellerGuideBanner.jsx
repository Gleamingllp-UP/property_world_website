import React from "react";
import { arrow_gif, video2 } from "../../assets/images";

function SellerGuideBanner({ scrollRef }) {
  const scroll = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <div className="inner_banner_video">
        <div className="my_video">
          <video width="100%" height={300} loop muted autoPlay>
            <source src={video2} type="video/mp4" />
          </video>
        </div>
        <div className="video_data">
          <div className="container">
            <h1>Seller Guide</h1>
            <p>Seller’s Guide</p>
            <a onClick={scroll}>
              <img src={arrow_gif} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default SellerGuideBanner;
