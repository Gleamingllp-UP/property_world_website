import React, { useCallback, useEffect } from "react";
import { new_buyer } from "../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { getGuideByTypeThunk } from "../../features/guide/guideSlice";
import GuideSkeleton from "../../Custom_Components/Skeleton/GuideSkeleton";
import ImageWithLoader from "../../Custom_Components/ImageWithLoader";
import DOMPurify from "dompurify";

function SellerGuideContent({ innerRef }) {
  const { guides, isLoading } = useSelector((store) => store?.guide);

  const type = "seller_guide";
  const dispatch = useDispatch();

  const getGuideByType = useCallback(async () => {
    dispatch(getGuideByTypeThunk({ type }));
  }, [dispatch, type]);

  useEffect(() => {
    getGuideByType();
  }, [getGuideByType]);
  return (
    <>
      {isLoading ? (
        <GuideSkeleton />
      ) : (
        <section className="content_area" ref={innerRef}>
          <div className="container">
            <div className="guide_mini2">
              <div className="row align-items-center">
                <div className="col-lg-12">
                  <h3>
                    <b>{guides?.title || "N/A"}</b>
                  </h3>
                  <hr />
                  <div className="but_dd">
                    <p>{guides?.short_description || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-center ">
              <div className="col-lg-5">
                <ImageWithLoader
                  src={guides?.imageUrl || new_buyer}
                  className={"img-fluid border_round"}
                />
              </div>
              <div className="col-lg-7">
                <div className="serb_box_data">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(guides?.description || "N/A"),
                    }}
                  />
                  <a
                    className="action_btn"
                    href={guides?.brochureUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Preview Image"
                  >
                    Download Brochure
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default SellerGuideContent;
