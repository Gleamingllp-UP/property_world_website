import React, { useCallback, useEffect } from "react";
import "../../../assets/css/plan.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlanForUserThunk } from "../../../features/userPlan/userPlanSlice";

function IndivisualPlan() {
  const { isLoading, plans } = useSelector((store) => store?.userPlan);
  const { userData } = useSelector((store) => store?.user);

  const page = 1;
  const limit = 10;
  const dispatch = useDispatch();

  const getAllPlan = useCallback(async () => {
    dispatch(
      getAllPlanForUserThunk({
        page,
        limit,
        user_type: userData?.user_type?._id,
      })
    );
  }, [dispatch, userData?.user_type]);

  useEffect(() => {
    getAllPlan();
  }, [getAllPlan]);

  const getIconByIndex = (index) => {
    const icons = [
      "fa-paper-plane",
      "fa-crown",
      "fa-medal",
      "fa-gem",
      "fa-rocket",
      "fa-star",
      "fa-shield-alt",
    ];
    return icons[index % icons.length];
  };
  return (
    <>
      <section className="pricing-section">
        <div className="container">
          <div className="sec-title text-center">
            <span className="title">Get plan</span>
            <h2>Choose a Plan</h2>
          </div>

          <div className="outer-box">
            <div className="row">
              {/* Pricing Block 1 */}
              {isLoading
                ? Array.from({ length: 4 })?.map((_, i) => {
                    return <PlanCardSkeleton key={i} />;
                  })
                : plans &&
                  [...plans]
                    ?.sort((a, b) => a?.price - b?.price)
                    ?.map((item, index) => {
                      const { features } = item;
                      return (
                        <div
                          className="pricing-block col-lg-4 col-md-6 col-sm-12 wow fadeInUp"
                          key={index}
                        >
                          <div className="inner-box">
                            <div className="icon-box">
                              <div className="icon-outer">
                                <i
                                  className={`fas ${getIconByIndex(index)}`}
                                ></i>
                              </div>
                            </div>
                            <div className="price-box">
                              <div className="title">{item?.name || "N/A"}</div>
                              <h4 className="price">
                                {/* {formatePr(item?.price || 0)} */}
                              </h4>
                            </div>
                            <ul className="features">
                              <li
                                className={
                                  features?.maxListings > 0 ? "true" : "false"
                                }
                              >
                                Max Listings: {features?.maxListings}
                              </li>
                              <li
                                className={
                                  features?.prioritySupport ? "true" : "false"
                                }
                              >
                                Priority Support
                              </li>
                              <li
                                className={
                                  features?.verifiedBadge ? "true" : "false"
                                }
                              >
                                Verified Badge
                              </li>
                              <li
                                className={
                                  features?.showInFeatured ? "true" : "false"
                                }
                              >
                                Show In Featured
                              </li>
                              <li
                                className={
                                  features?.analyticsAccess ? "true" : "false"
                                }
                              >
                                Analytics Access
                              </li>
                            </ul>

                            <div className="btn-box">
                              <a
                                href="https://codepen.io/anupkumar92"
                                className="theme-btn"
                              >
                                BUY plan
                              </a>
                            </div>
                          </div>
                        </div>
                      );
                    })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default IndivisualPlan;
