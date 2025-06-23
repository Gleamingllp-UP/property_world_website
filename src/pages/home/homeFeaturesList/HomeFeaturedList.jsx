import {
  bed,
  propert1,
  propert2,
  propert3,
  propert4,
  propert5,
  propert6,
  ruler,
} from "@/assets/images";
import { pageRoutes } from "@/router/pageRoutes";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllFeaturePropertyThunk } from "../../../features/property/propertySlice";
import ImageWithLoader from "../../../Custom_Components/ImageWithLoader";
import { formatNumberWithCommas } from "../../../helper/function/formatRange";
import { formatPrice } from "../../../helper/function/formatPrice";
import { HomeCategoryPropertySkeleton } from "./../../../Custom_Components/Skeleton/PropertySkeleton";
function HomeFeaturedList() {
  const dispatch = useDispatch();
  const { isLoading, featuredPropertyData } = useSelector(
    (store) => store?.property
  );
  const page = 1;
  const limit = 7;
  useEffect(() => {
    dispatch(
      getAllFeaturePropertyThunk({
        page,
        limit,
        searchFilters: { is_featured: true },
      })
    );
  }, [dispatch]);

  return (
    <section className="featured_list">
      <div className="container">
        <div className="text-center title_area">
          <h2>Featured Properties</h2>
        </div>
        <div className="row">
          {isLoading ? (
            <HomeCategoryPropertySkeleton />
          ) : (
            featuredPropertyData &&
            featuredPropertyData?.map((item, index) => (
              <div className="col-sm-4" key={index}>
                <div className="my_property">
                  <div className="photo_my_photo">
                    <span className="buy">Featured</span>
                    <Link to={`${pageRoutes.PROPERTY_DETAILS}?id=${item?._id}`}>
                      <ImageWithLoader
                        src={item?.images?.[0]?.url}
                        className="img-fluid"
                      />
                    </Link>
                    <div className="new_listng">
                      <div>
                        {item?.bedrooms != null && item?.bedrooms !== "" && (
                          <>
                            <img src={bed} alt="bed" />{" "}
                            {item?.bedrooms === 0 ? "Studio" : item?.bedrooms}{" "}
                          </>
                        )}
                      </div>
                      <div>
                        {item?.area != null && item?.area !== "" && (
                          <>
                            <img src={ruler} alt="area" />{" "}
                            {formatNumberWithCommas(item?.area)} Sq Ft
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="property_data">
                    <div className="lease">
                      <span>{item?.duration} Years</span>
                    </div>
                    <h4>{item?.title}</h4>
                    <div className="pro_diss">
                      <p>{item?.short_description}</p>
                    </div>
                    <div className="other_data_list">
                      <div className="loction_c">
                        <i className="ri-map-pin-line" /> UAE
                      </div>
                      <div>
                        <i className="ri-eye-line" />
                        {item?.address}
                      </div>
                    </div>
                    <div className="action_p">
                      <div className="list_ppc">
                        {formatPrice(item?.price)}{" "}
                      </div>
                      <div>
                        <Link
                          to={`${pageRoutes.PROPERTY_DETAILS}?id=${item?._id}`}
                        >
                          Read More{" "}
                          <i className="ri-arrow-right-up-long-line" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {featuredPropertyData && featuredPropertyData?.length > 6 && (
          <div className="col-12 text-center">
            <Link to={pageRoutes.PROPERTY_LISTING} className="action_btn mt20">
              View All Properties <i className="ri-arrow-right-up-long-line" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default HomeFeaturedList;
