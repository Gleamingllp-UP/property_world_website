import React, { useEffect } from "react";
import { arrow_gif, video2 } from "../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { getBannerByTypeThunk } from "../../features/banner/bannerSlice";

function SellerGuideBanner({ scrollRef }) {
  const scroll = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const { banners } = useSelector((store) => store?.banner);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBannerByTypeThunk("seller_guide"));
  }, [dispatch]);

  return (
    <>
      <div className="inner_banner_video">
        <div className="my_video">
          <video width="100%" height={300} loop muted autoPlay>
            <source src={banners?.imageUrl || video2} type="video/mp4" />
          </video>
        </div>
        <div className="video_data">
          <div className="container">
            <h1>{banners?.title || "Seller guide"}</h1>
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
