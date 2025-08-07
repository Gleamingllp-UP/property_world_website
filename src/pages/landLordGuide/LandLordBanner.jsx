import React, { useEffect, useState } from "react";
import { arrow_gif, video } from "../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { getBannerByTypeThunk } from "../../features/banner/bannerSlice";
import MediaWithLoader from "../../Custom_Components/MediaWithLoader";

function LandLordBanner({ scrollRef }) {
  const scroll = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const [isImgLoaded, setIsImgLoaded] = useState(true);

  const { banners } = useSelector((store) => store?.banner);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBannerByTypeThunk("landlord_guide"));
  }, [dispatch]);
  return (
    <>
      <div className="inner_banner_video">
        <div className="my_video">
          <MediaWithLoader
            src={banners["landlord_guide"]?.imageUrl || video}
            height={400}
            setIsImgLoaded={setIsImgLoaded}
            controls={false}
            className="rounded"
          />
        </div>
        {isImgLoaded && (
          <div className="video_data">
            <div className="container">
              <h1>{banners["landlord_guide"]?.title || "Landlord Guide"}</h1>
              <p>
                {banners["landlord_guide"]?.description ||
                  "As a landlord in Dubai"}
              </p>
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

export default React.memo(LandLordBanner);
