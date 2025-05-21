import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBannerByTypeThunk } from "../../features/banner/bannerSlice";
import { arrow_gif, video } from "../../assets/images";

function TenantBanner({ scrollRef }) {
  const scroll = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const { banners } = useSelector((store) => store?.banner);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBannerByTypeThunk("tenant_guide"));
  }, [dispatch]);

  return (
    <>
      <div className="inner_banner_video">
        <div className="my_video">
          <video width="100%" height={300} loop muted autoPlay>
            <source src={banners?.imageUrl || video} type="video/mp4" />
          </video>
        </div>
        <div className="video_data">
          <div className="container">
            <h1>{banners?.title || "Tenant Guide"}</h1>
            <p>
              {banners?.description ||
                "Dubai is home to many expats, and while some have the luxury of purchasing property"}
            </p>
            <a onClick={scroll}>
              <img src={arrow_gif} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(TenantBanner);
