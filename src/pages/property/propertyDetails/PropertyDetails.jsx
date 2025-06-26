import React, { useEffect } from "react";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getPropertyDetailsThunk,
  trackPropertyViewsThunk,
} from "../../../features/property/propertySlice";
import { useSearchParams } from "react-router-dom";
import ImageWithLoader from "../../../Custom_Components/ImageWithLoader";
import { PropertyImageSkeleton } from "../../../Custom_Components/Skeleton/PropertySkeleton";
function PropertyDetails() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { propertyDetails, isLoading } = useSelector(
    (store) => store?.property
  );

  const productImages = propertyDetails?.images?.filter(
    (item) => item?.name !== "Thumbnail Image"
  );
  
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (id) {
      dispatch(trackPropertyViewsThunk({ id }));
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
  }, [propertyDetails?.images]);

  return (
    <>
      <div className="container">
        {isLoading ? (
          <PropertyImageSkeleton />
        ) : (
          <>
            <div id="gallery" className="photos-grid-container gallery">
              <div className="main-photo img-box">
                {propertyDetails?.images
                  ?.filter((item) => item?.name === "Thumbnail Image")
                  ?.map((img, index) => {
                    return (
                      <a
                        key={index}
                        href={img?.url}
                        className="glightbox"
                        data-glightbox="type: image"
                      >
                        <ImageWithLoader src={img?.url} />
                      </a>
                    );
                  })}
              </div>
              <div>
                <div className="sub">
                  {productImages &&
                    productImages?.slice(0, 4).map((image, index) => {
                      const remaining = productImages?.length - 4;
                      const isMulti = productImages?.length > 4 && index === 3;

                      return (
                        <div
                          className="img-box"
                          key={index}
                          id={isMulti ? "multi-link" : ""}
                        >
                          <a
                            href={image?.url}
                            className="glightbox"
                            data-glightbox="gallery: product-gallery"
                          >
                            <ImageWithLoader src={image?.url} />

                            {isMulti && (
                              <div className="transparent-box">
                                <div className="caption">+{remaining}</div>
                              </div>
                            )}
                          </a>
                        </div>
                      );
                    })}
                </div>

                {/* Hidden links for remaining images */}
                {productImages &&
                  productImages
                    .slice(4)
                    .map((image, index) => (
                      <a
                        key={"hidden-" + index}
                        href={image.url}
                        className="glightbox"
                        data-glightbox="gallery: product-gallery"
                        style={{ display: "none" }}
                      />
                    ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default PropertyDetails;
