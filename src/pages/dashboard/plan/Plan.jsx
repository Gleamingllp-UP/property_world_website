import React, { useCallback, useEffect, useMemo } from "react";
import "../../../assets/css/plan.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPlanForUserThunk,
  getUserPlanThunk,
} from "../../../features/userPlan/userPlanSlice";
import PlanCardSkeleton from "../../../Custom_Components/Skeleton/PlanCardSkeleton";
import { formatPrice } from "../../../helper/function/formatPrice";
import {
  createStripeCheckoutSessionThunk,
  verifyPaymentSessionThunk,
} from "../../../features/stripe/stripeSlice";
import { dismissToast, showToast } from "../../../utils/toast/toast";
import { useNavigate, useSearchParams } from "react-router-dom";

function AgentAgecyPlan() {
  const { isLoading, plans, activePlans } = useSelector(
    (store) => store?.userPlan
  );
  const { userData } = useSelector((store) => store?.user);

  const page = 1;
  const limit = 10;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const sessionId = useMemo(
    () => searchParams.get("session_id"),
    [searchParams]
  );

  const verifiedSessions = useMemo(() => {
    return new Set(
      JSON.parse(localStorage.getItem("verifiedSessions") || "[]")
    );
  }, []);

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

  const handleVerify = useCallback(
    async (session_id) => {
      try {
        showToast("Verifying payment session...", "loading");

        const resultAction = await dispatch(
          verifyPaymentSessionThunk({ session_id })
        );

        if (verifyPaymentSessionThunk.fulfilled.match(resultAction)) {
          const res = resultAction?.payload;
          if (res?.alreadyProcessed || res?.assigned || res?.renewed) {
            const updated = new Set(verifiedSessions);
            updated.add(sessionId);
            localStorage.setItem(
              "verifiedSessions",
              JSON.stringify([...updated])
            );
            dismissToast();

            const newParams = new URLSearchParams(searchParams);
            newParams.delete("session_id");
            navigate({ search: newParams.toString() }, { replace: true });
          }

          if (!res?.alreadyProcessed) {
            showToast(resultAction?.payload?.message, "success");
          }
          dispatch(getUserPlanThunk({ user_id: userData?._id }));
        } else {
          throw new Error(resultAction?.error?.message);
        }
      } catch (err) {
        showToast(err?.message || "Payment verification failed.", "error");
      }
    },
    [
      dispatch,
      navigate,
      searchParams,
      sessionId,
      userData?._id,
      verifiedSessions,
    ]
  );

  useEffect(() => {
    if (!sessionId || verifiedSessions.has(sessionId)) return;

    handleVerify(sessionId);
  }, [handleVerify, searchParams, sessionId, verifiedSessions]);

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

  const handleClick = async (name, amount, plan_id) => {
    try {
      showToast("Redirecting for payment...", "loading");

      const resultAction = await dispatch(
        createStripeCheckoutSessionThunk({
          name,
          amount,
          user_id: userData?._id,
          plan_id,
        })
      );

      if (createStripeCheckoutSessionThunk.fulfilled.match(resultAction)) {
        const { url } = resultAction.payload;

        if (url) {
          showToast("Redirecting to secure payment page.", "success");
          window.location.href = url;
        } else {
          throw new Error("No payment URL returned from server.");
        }
      } else {
        throw new Error(
          resultAction?.error?.message || "Payment initiation failed."
        );
      }
    } catch (error) {
      showToast(
        error?.message || "Something went wrong during payment.",
        "error"
      );
    }
  };

  return (
    <>
      <section className="pricing-section">
        <div className="container">
          <div className="sec-title text-center">
            <span className="title">Get plan</span>
            <h2>
              {activePlans?.plan?._id && activePlans?.isActive
                ? "Upgrade Plan"
                : "Choose a plan"}
            </h2>
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
                      const { features, _id } = item;
                      const isActive =
                        activePlans?.plan?._id === _id && activePlans?.isActive;

                      return (
                        <div
                          className={`pricing-block col-lg-4 col-md-6 col-sm-12 wow fadeInUp ${
                            isActive ? "active-plan" : ""
                          }`}
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
                                {formatPrice(item?.price || 0)}
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
                              {isActive ? (
                                <button
                                  className="theme-btn"
                                  onClick={() =>
                                    handleClick(
                                      item?.name,
                                      item?.price,
                                      item?._id
                                    )
                                  }
                                >
                                  Activated Plan
                                </button>
                              ) : activePlans?.plan?._id ? (
                                <button
                                  className="theme-btn"
                                  onClick={() =>
                                    handleClick(
                                      item?.name,
                                      item?.price,
                                      item?._id
                                    )
                                  }
                                >
                                  Upgrade Plan
                                </button>
                              ) : (
                                <button
                                  className="theme-btn"
                                  onClick={() =>
                                    handleClick(
                                      item?.name,
                                      item?.price,
                                      item?._id
                                    )
                                  }
                                >
                                  Buy Plan
                                </button>
                              )}
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

export default AgentAgecyPlan;
