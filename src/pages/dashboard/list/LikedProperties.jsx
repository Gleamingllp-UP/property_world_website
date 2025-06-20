import React, { useCallback, useEffect, useState } from "react";
import { pageRoutes } from "../../../router/pageRoutes";
import { useDispatch, useSelector } from "react-redux";
import { getLikedPropertiesThunk } from "../../../features/user/userSlice";
import { bed, ruler } from "../../../assets/images";
import { formatNumberWithCommas } from "../../../helper/function/formatRange";
import { formatPrice } from "../../../helper/function/formatPrice";
import { Link } from "react-router-dom";
import ImageWithLoader from "../../../Custom_Components/ImageWithLoader";
import { HomeCategoryPropertySkeleton } from "../../../Custom_Components/Skeleton/PropertySkeleton";
import { CustomPagination } from "../../../Custom_Components/CustomPagination";
import { throttle } from "lodash";
import { showToast } from "../../../utils/toast/toast";
import { addOrRemoveFavouritePropertyThunk } from "../../../features/property/propertySlice";

function LikedProperties() {
  const { isLoading, likedProperties, pagination } = useSelector(
    (store) => store?.user
  );
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const limit = 6;

  useEffect(() => {
    dispatch(
      getLikedPropertiesThunk({
        page,
        limit,
      })
    );
  }, [dispatch, page]);

  const handleLikeToggle = async (id) => {
    try {
      showToast("Wait", "loading");
      const resultAction = await dispatch(
        addOrRemoveFavouritePropertyThunk(id)
      );
      if (addOrRemoveFavouritePropertyThunk.fulfilled.match(resultAction)) {
        showToast(resultAction?.payload?.message, "success");
        dispatch(
          getLikedPropertiesThunk({
            page,
            limit,
          })
        );
      } else {
        throw new Error(resultAction?.error?.message);
      }
    } catch (error) {
      showToast(error?.message || "Failed to create property.", "error");
    }
  };

  const throttledToggleLike = useCallback(
    throttle((propertyId) => {
      handleLikeToggle(propertyId);
    }, 2000),
    []
  );

  return (
    <div>
      <section className="buy_rent">
        <div className="container">
          <div className="text-center title_area">
            <h2>Liked Properties</h2>
          </div>
          <div className="">
            <div className="tab-content " id="nav-tabContent">
              <div
                className="tab-pane fade active show"
                id="nav-buy"
                role="tabpanel"
                aria-labelledby="nav-buy-tab"
              >
                <div className="row">
                  {isLoading ? (
                    <HomeCategoryPropertySkeleton />
                  ) : likedProperties?.length > 0 ? (
                    likedProperties?.map((item, index) => {
                      return (
                        <>
                          <div className="col-sm-6" key={index + 1}>
                            <div className="my_property">
                              <div className="photo_my_photo">
                                <span
                                  className="buy"
                                  style={{
                                    backgroundColor:
                                      item?.category?.name === "Rent"
                                        ? "#e9012b"
                                        : "#8BC34A",
                                  }}
                                >
                                  {item?.category?.name}
                                </span>
                                <div className="save_p">
                                  <button>
                                    <i
                                      className={"ri-heart-fill text-white"}
                                      onClick={() =>
                                        throttledToggleLike(item?._id)
                                      }
                                      style={{
                                        cursor: "pointer",
                                        fontSize: "20px",
                                      }}
                                    ></i>
                                  </button>
                                </div>
                                <Link
                                  to={`${pageRoutes.PROPERTY_DETAILS}?id=${item?._id}`}
                                >
                                  <ImageWithLoader
                                    src={item?.images?.[0]?.url}
                                    className="img-fluid"
                                  />
                                </Link>
                                <div className="new_listng">
                                  <div>
                                    {item?.bedrooms != null &&
                                      item?.bedrooms !== "" && (
                                        <>
                                          <img src={bed} alt="bed" />{" "}
                                          {item?.bedrooms === 0
                                            ? "Studio"
                                            : item?.bedrooms}{" "}
                                        </>
                                      )}
                                  </div>
                                  <div>
                                    {item?.area != null &&
                                      item?.area !== "" && (
                                        <>
                                          <img src={ruler} alt="area" />{" "}
                                          {formatNumberWithCommas(item?.area)}{" "}
                                          Sq Ft
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
                                    <i className="ri-eye-line" />{" "}
                                    {item?.address}
                                  </div>
                                </div>
                                <div className="action_p">
                                  <div className="list_ppc">
                                    {" "}
                                    {formatPrice(item?.price)}
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
                        </>
                      );
                    })
                  ) : (
                    <div className="col-12">
                      <div className="text-center border border-light-subtle rounded py-3 bg-light text-muted fw-medium">
                        No Liked Property Available
                      </div>
                    </div>
                  )}
                </div>

                {pagination?.total > limit && (
                  <div className="col-12 text-center mb-5 mt-5">
                    <CustomPagination
                      total={pagination?.total}
                      page={page}
                      limit={limit}
                      onPageChange={setPage}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LikedProperties;
