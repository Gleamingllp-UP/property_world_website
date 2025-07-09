import React, { useEffect } from "react";
import new_side from "../../../assets/images/new_ads.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getBannerByTypeThunk } from "../../../features/banner/bannerSlice";
import ImageWithLoader from "../../../Custom_Components/ImageWithLoader";
const ArchiveSide = () => {
  const { banners } = useSelector((store) => store?.banner);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBannerByTypeThunk("property_listing"));
  }, [dispatch]);
  return (
    <>
      <div className="col-lg-3">
        <div className="right_page">
          <div className="recommended_s">
            <h5>
              <b>Recommended Searches</b>
            </h5>
            <hr />
            <ul>
              <li>
                <a href="#">The Community Sports Arena</a>
              </li>
              <li>
                <a href="#">Highly Accessible Spacious</a>
              </li>
              <li>
                <a href="#">Office for Rent in Al Qiyadah</a>
              </li>
              <li>
                <a href="#">Office for Rent in Al Qiyadah</a>
              </li>
            </ul>
          </div>
          <div className="new_adss">
            <ImageWithLoader
              src={banners["property_listing"]?.imageUrl || new_side}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ArchiveSide;
