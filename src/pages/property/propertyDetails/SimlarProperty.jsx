import React, { useEffect } from "react";
import {
  bath,
  bed,
  pop1,
  propert2,
  propert3,
  propert4,
  ruler,
} from "../../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { SimilarPropertyCardSkeleton } from "../../../Custom_Components/Skeleton/PropertySkeleton";
import { Link, useSearchParams } from "react-router-dom";
import { getSimilarPropertiesThunk } from "../../../features/property/propertySlice";
import { pageRoutes } from "../../../router/pageRoutes";
import ImageWithLoader from "../../../Custom_Components/ImageWithLoader";
import { formatPrice } from "../../../helper/function/formatPrice";
import { formatNumberWithCommas } from "../../../helper/function/formatRange";

const SimlarProperty = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { isLoadingForSimilar, similarPropertyData } = useSelector(
    (store) => store?.property
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(getSimilarPropertiesThunk({ id }));
    }
  }, [id, dispatch]);

  return (
    <>
      <div className="key_feature">
        <p>Similar Properties</p>
        {isLoadingForSimilar ? (
          <SimilarPropertyCardSkeleton />
        ) : similarPropertyData?.length > 0 ? (
          <div className="row">
            {similarPropertyData?.map((item, index) => {
              const mainImg = item?.images?.filter(
                (item) => item?.name === "Thumbnail Image"
              );
              return (
                <div className="col-lg-6" key={index}>
                  <div className="pop_search light_b">
                    <div className="pop_photo">
                      <Link
                        to={`${pageRoutes.PROPERTY_DETAILS}?id=${item?._id}`}
                      >
                        <ImageWithLoader src={mainImg?.[0]?.url} />
                      </Link>
                    </div>
                    <div className="pop_data">
                      <h3>{item?.title ?? "N/A"}</h3>
                      <p>{formatPrice(item?.price || 0)}</p>
                      <div className="p_info2">
                        <ul>
                          {(item?.bedrooms != null && item?.bedrooms !== "") ||
                          item?.bathrooms ? (
                            <li>
                              {item?.bedrooms != null &&
                                item?.bedrooms !== "" && (
                                  <>
                                    <img src={bed} alt="bed" />{" "}
                                    {item?.bedrooms === 0
                                      ? "Studio"
                                      : item?.bedrooms}{" "}
                                  </>
                                )}
                              {item?.bathrooms ? (
                                <>
                                  <img src={bath} alt="bath" />{" "}
                                  {item?.bathrooms}
                                </>
                              ) : null}
                            </li>
                          ) : null}

                          {item?.area && (
                            <li>
                              <img src={ruler} alt="area" />{" "}
                              {formatNumberWithCommas(item?.area)}
                            </li>
                          )}
                        </ul>
                      </div>
                      <div className="loc">
                        <i className="ri-map-pin-line" />{" "}
                        {item?.address ?? "N/A"}
                      </div>
                      <Link
                        to={`${pageRoutes.PROPERTY_DETAILS}?id=${item?._id}`}
                      >
                        Explore Now{" "}
                        <i className="ri-arrow-right-up-long-line" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="col-12">
            <div className="text-center border border-light-subtle rounded py-2 bg-light text-muted fw-medium">
              No similar properties available
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SimlarProperty;
