import React from "react";
import { arrow_gif, video } from "../../assets/images";

const Banner = ({scrollRef}) => {
  const scroll=()=>{
    scrollRef.current.scrollIntoView({behavior: 'smooth'})
  }
  return (
    <>
      <div className="inner_banner_video">
        <div className="my_video">
          <video width="100%" height={300} loop muted autoPlay>
            <source src={video} type="video/mp4" />
          </video>
        </div>
        <div className="video_data">
          <div className="container">
            <h1>Buyer Guide</h1>
            <p>BUYER’S GUIDE TO PURCHASING PROPERTY IN DUBAI</p>
            <a onClick={scroll}>
              <img src={arrow_gif} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
