import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBannerByTypeThunk } from "../../features/banner/bannerSlice";
import { arrow_gif, video } from "../../assets/images";
import MediaWithLoader from "../../Custom_Components/MediaWithLoader";

function TenantBanner({ scrollRef }) {
  const scroll = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const [isImgLoaded, setIsImgLoaded] = useState(true);

  const { banners } = useSelector((store) => store?.banner);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBannerByTypeThunk("tenant_guide"));
  }, [dispatch]);

  return (
    <>
      <div className="inner_banner_video">
        <div className="my_video">
          <MediaWithLoader
            src={banners["tenant_guide"]?.imageUrl || video}
            height={400}
            setIsImgLoaded={setIsImgLoaded}
            controls={false}
            className="rounded"
          />
        </div>
        {isImgLoaded && (
          <div className="video_data">
            <div className="container">
              <h1>{banners["tenant_guide"]?.title || "Tenant Guide"}</h1>
              <p>
                {banners["tenant_guide"]?.description ||
                  "Dubai is home to many expats, and while some have the luxury of purchasing property"}
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

export default React.memo(TenantBanner);
