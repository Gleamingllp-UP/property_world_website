import React, { useState, useEffect } from "react";
import {
  email,
  facebook,
  g_email,
  propert2,
  propert5,
  propert6,
  twitter,
} from "@/assets/images";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.css";
import { useDispatch, useSelector } from "react-redux";
import { getPropertyDetailsThunk } from "../../../features/property/propertySlice";
import { useSearchParams } from "react-router-dom";
import ImageWithLoader from "../../../Custom_Components/ImageWithLoader";
function PropertyDetails() {
  const [isVisible, setIsVisible] = useState(false);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { propertyDetails } = useSelector((store) => store?.property);

  const productThumbnailImage = propertyDetails?.images?.filter(
    (item) => item?.name === "Thumbnail Image"
  );
  const productImages = propertyDetails?.images?.filter(
    (item) => item?.name !== "Thumbnail Image"
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(getPropertyDetailsThunk({ id }));
    }
  }, [id, dispatch]);

  useEffect(() => {
    const lightbox = GLightbox({
      selector: ".glightbox",
    });

    return () => {
      lightbox.destroy();
    };
  }, []);

  return (
    <div className="container">
      <div id="gallery" className="photos-grid-container gallery">
        <div className="main-photo img-box">
          <a href={productThumbnailImage?.[0]?.url} className="glightbox" data-glightbox="type: image">
            <ImageWithLoader src={productThumbnailImage?.[0]?.url} />
          </a>
          <div className="share_post ">
            <button>
              <i className="ri-heart-line" />
            </button>
            <button className="toggle" onClick={() => setIsVisible(!isVisible)}>
              <i className="ri-share-line" /> Share
            </button>
            <div
              id="target"
              style={{
                display: isVisible ? "block" : "none",
              }}
            >
              <ul>
                <li>
                  <a href="#">
                    <img src={facebook} /> Facebook
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={twitter} /> Twitter{" "}
                  </a>{" "}
                </li>
                <li>
                  <a href="#">
                    <img src={facebook} /> Whatsapp
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={g_email} /> Send via Gmail
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={email} /> Send via Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <div className="sub">
            {productImages &&
              productImages?.map((image, index) => {
                const remaining = productImages.length - 4;
                const isMulti = productImages.length > 4 && index === 4;
                return (
                  <div
                    className="img-box"
                    key={index}
                    id={isMulti ? "multi-link" : ""}
                  >
                    <a
                      href={image?.url}
                      className="glightbox"
                      data-glightbox="type: image"
                    >
                      <img src={image?.url} alt="image" />
                      {isMulti && (
                        <div className="transparent-box">
                          <div className="caption">+{remaining}</div>
                        </div>
                      )}
                    </a>
                  </div>
                );
              })}

            {/* <div id="multi-link" className="img-box">
              <a
                href={propert5}
                className="glightbox"
                data-glightbox="type: image"
              >
                <img src={propert5} alt="image" />
                <div className="transparent-box">
                  <div className="caption">+3</div>
                </div>
              </a>
            </div> */}
          </div>
        </div>
        <div id="more-img" className="extra-images-container hide-element">
          <a href={propert6} className="glightbox" data-glightbox="type: image">
            <img src={propert6} alt="image" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;
