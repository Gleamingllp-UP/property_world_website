import React, { useEffect } from "react";
import { seller_guide } from "../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { getBannerByTypeThunk } from "../../features/banner/bannerSlice";
function PrivacyAndPolicyBanner({ scrollRef }) {
  const scroll = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const { banners } = useSelector((store) => store?.banner);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBannerByTypeThunk("privacy_policy"));
  }, [dispatch]);
  return (
    <>
      <div
        className="inner_banner"
        style={{ backgroundImage: `url(${banners["privacy_policy"]?.imageUrl || seller_guide})` }}
      >
        <div className="container">
          <div className="buyer_d">
            <h1>{banners?.title || "Privacy Policy"}</h1>
            <p></p>
          </div>
        </div>
      </div>

      <div className="arrow_section">
        <div className="container">
          <div className="arrow_box">
            <a onClick={scroll}>
              <i className="ri-arrow-down-long-line"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(PrivacyAndPolicyBanner);
