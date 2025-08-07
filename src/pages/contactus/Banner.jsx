import React, { useEffect } from "react";
import about_banner from "../../assets/images/common/about_banner.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getBannerByTypeThunk } from "../../features/banner/bannerSlice";

const Banner = ({ scrollRef }) => {
  const scroll = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const { banners, isLoading } = useSelector((store) => store?.banner);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBannerByTypeThunk("contact_us"));
  }, [dispatch]);
  return (
    <>
      {isLoading ? (
        <div className="placeholder-glow mb-5">
          <div
            className="placeholder w-100 bg-secondary-subtle rounded"
            style={{ height: "300px" }}
          ></div>
        </div>
      ) : (
        <>
          <div
            className="inner_banner"
            style={{
              backgroundImage: `url(${
                banners["contact_us"]?.imageUrl || about_banner
              })`,
            }}
          >
            <div className="container">
              <div className="buyer_d">
                <h1>{banners["contact_us"]?.title ?? "N/A"}</h1>
                <p>{banners["contact_us"]?.description ?? "N/A"}</p>
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
      )}
    </>
  );
};

export default Banner;
