import React, { useEffect } from "react";
import { seller_guide } from "../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { getBannerByTypeThunk } from "../../features/banner/bannerSlice";
const TermBanner = ({ scrollRef }) => {
  const scroll = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const { banners } = useSelector((store) => store?.banner);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBannerByTypeThunk("terms_conditions"));
  }, [dispatch]);

  return (
    <>
      <div
        className="inner_banner"
        style={{
          backgroundImage: `url(${
            banners["terms_conditions"]?.imageUrl || seller_guide
          })`,
        }}
      >
        <div className="container">
          <div className="buyer_d">
            <h1>{banners["terms_conditions"]?.title || "Terms & Conditions"}</h1>
            <p />
          </div>
        </div>
      </div>
      <div className="arrow_section">
        <div className="container">
          <div className="arrow_box">
            <a onClick={scroll}>
              <i className="ri-arrow-down-long-line" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(TermBanner);
