import React, { useEffect } from "react";
import { arrow_gif, video } from "../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { getBannerByTypeThunk } from "../../features/banner/bannerSlice";

function LandLordBanner({ scrollRef }) {
  const scroll = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const { banners } = useSelector((store) => store?.banner);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBannerByTypeThunk("landlord_guide"));
  }, [dispatch]);
  return (
    <>
      <div className="inner_banner_video">
        <div className="my_video">
          <video width="100%" height={300} loop="" muted="" autoPlay="">
            <source src={banners?.imageUrl || video} type="video/mp4" />
          </video>
        </div>
        <div className="video_data">
          <div className="container">
            <h1>{banners?.title || "Landlord Guide"}</h1>
            <p>{banners?.description || "As a landlord in Dubai"}</p>
            <a onClick={scroll}>
              <img src={arrow_gif} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(LandLordBanner);
