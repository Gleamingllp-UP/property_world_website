import React, { useEffect, useState } from "react";
import { arrow_gif, video } from "../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { getBannerByTypeThunk } from "../../features/banner/bannerSlice";
import MediaWithLoader from "../../Custom_Components/MediaWithLoader";

function SellerGuideBanner({ scrollRef }) {
  const scroll = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const [isImgLoaded, setIsImgLoaded] = useState(true);
  const { banners } = useSelector((store) => store?.banner);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBannerByTypeThunk("seller_guide"));
  }, [dispatch]);

  return (
    <>
      <div className="inner_banner_video">
        <div className="my_video">
          <MediaWithLoader
            src={banners["seller_guide"]?.imageUrl || video}
            height={400}
            setIsImgLoaded={setIsImgLoaded}
            controls={false}
            className="rounded"
          />
        </div>
        {isImgLoaded && (
          <div className="video_data">
            <div className="container">
              <h1>{banners["seller_guide"]?.title || "Seller guide"}</h1>
              <p>{banners["seller_guide"]?.description ?? "Seller’s Guide"}</p>
              <a onClick={scroll}>
                <img src={arrow_gif} />
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SellerGuideBanner;
