import React, { useEffect, useState } from "react";
import {
  ads_banner,
  ads_banner2,
  property_world_logo,
  user,
} from "../../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import ImageWithLoader from "../../../Custom_Components/ImageWithLoader";

import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.css";
import { ContactSidebarSkeleton } from "../../../Custom_Components/Skeleton/PropertySkeleton";
import { getBannerByTypeThunk } from "../../../features/banner/bannerSlice";

const PropertySide = () => {
  const { propertyDetails, isLoading } = useSelector(
    (store) => store?.property
  );
  const [loadingType, setLoadingType] = useState(null);

  const { banners } = useSelector((store) => store?.banner);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBannerByTypeThunk("property_detail_side_small"));
    dispatch(getBannerByTypeThunk("property_detail_side_big"));
  }, [dispatch]);

  const handleClick = (type) => {
    setLoadingType(type);
    setTimeout(() => {
      setLoadingType(null);
    }, 3000);
  };
  const cleanedPhone =
    String(propertyDetails?.userData?.phone_number)?.replace(/\D/g, "") ||
    "971501234567";

  useEffect(() => {
    const lightbox2 = GLightbox({
      selector: ".lightbox2",
    });

    return () => {
      lightbox2.destroy();
    };
  }, [
    propertyDetails?.userData?.profile_picture,
    propertyDetails?.userData?.agent_photo,
  ]);

  return (
    <>
      {isLoading ? (
        <ContactSidebarSkeleton />
      ) : (
        <div className="col-lg-3">
          <div className="agent">
            <ImageWithLoader
              src={
                propertyDetails?.userData?.agency_logo || property_world_logo
              }
              className="img-fluid agent_logo rounded"
            />
            <h5>
              {propertyDetails?.userData?.company_name || "Property Finders"}
            </h5>

            <hr />
            <div className="agent_info">
              <a
                href={
                  propertyDetails?.userData?.profile_picture ||
                  propertyDetails?.userData?.agent_photo ||
                  user
                }
                className="lightbox2"
                data-glightbox="type: image"
              >
                <ImageWithLoader
                  src={
                    propertyDetails?.userData?.profile_picture ||
                    propertyDetails?.userData?.agent_photo ||
                    user
                  }
                  className="img-fluid john"
                />
              </a>

              <p>
                <b>
                  <a href="#">
                    {" "}
                    {propertyDetails?.userData?.first_name ||
                    propertyDetails?.userData?.last_name
                      ? `${propertyDetails?.userData?.first_name || ""} ${
                          propertyDetails?.userData?.last_name || ""
                        }`
                      : "Property Finders"}
                  </a>
                </b>
              </p>
              {/* <p className="mt-2 mb-3">
                {propertyDetails?.userData?.userTypeData?.name || "N/A"}:{" "}
                {propertyDetails?.userData?.company_name || "Property Finders"}
              </p> */}
              <small>
                {propertyDetails?.userData?.bio ||
                  "With a passion for helping people find the perfect place to call home..."}
              </small>
            </div>
          </div>
          <div className="get_in_touch">
            <h5>
              Get in touch <br />
              for more information
            </h5>

            <a
              href={`tel:${
                propertyDetails?.userData?.phone || "+971501234567"
              }`}
              className="call_us2"
              onClick={() => handleClick("call")}
            >
              <i className="ri-phone-line" />{" "}
              {loadingType === "call" ? "Dialing..." : "Call"}
            </a>

            <a
              href={`mailto:${
                propertyDetails?.userData?.email || "example@email.com"
              }`}
              className="email_area"
              onClick={() => handleClick("email")}
            >
              <i className="ri-mail-open-line" />{" "}
              {loadingType === "email" ? "Opening Mail..." : "Email"}
            </a>
            <a
              href={`https://wa.me/${cleanedPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="whats_aap"
              onClick={() => handleClick("email")}
            >
              <i className="ri-whatsapp-line" />{" "}
              {loadingType === "whatsapp" ? "Opening WhatsApp..." : "WhatsApp"}
            </a>
          </div>

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
          <div className="recommended_s trending_s">
            <h5>
              <b>Trending Searches</b>
            </h5>
            <hr />
            <ul>
              <li>
                <a href="#">The Community Sports Arena</a>
              </li>
              <li>
                <a href="#">Highly Accessible | Spacious</a>
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
              src={
                banners["property_detail_side_small"]?.imageUrl || ads_banner
              }
            />
          </div>
          <div className="new_adss">
            <ImageWithLoader
              src={banners["property_detail_side_big"]?.imageUrl || ads_banner2}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PropertySide;
