import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPolicyByTypeThunk } from "../../features/policy/policySlice";
import { formatDate } from "../../helper/formateDate/formatedDate";
import DOMPurify from "dompurify";
import { CookiesPolicySkeleton } from "../../Custom_Components/Skeleton/PrivacyPolicySkeleton";

function CookiesPolicyContent({ innerRef }) {
  const { policies, isLoading } = useSelector((store) => store?.policy);
  const dispatch = useDispatch();
  const type = "cookies_policy";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getPolicyByType = useCallback(async () => {
    dispatch(fetchPolicyByTypeThunk({ type }));
  }, [dispatch]);

  useEffect(() => {
    getPolicyByType();
  }, [getPolicyByType]);

  return (
    <>
      {isLoading ? (
        <CookiesPolicySkeleton />
      ) : (
        <section className="content_area" ref={innerRef}>
          <div className="container">
            <div className="guide_mini">
              <p>
                <b>{formatDate(policies?.updatedAt, "date")}</b>
              </p>
              <p>{policies?.short_description || "N/A"}</p>
            </div>
            <hr />
            <div className="row justify-content-center ">
              <div className="discover">
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      policies?.long_description || "N/A"
                    ),
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default React.memo(CookiesPolicyContent);
