import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAboutUsThunk } from "../../features/aboutUs/aboutUsSlice";
import ImageWithLoader from "../../Custom_Components/ImageWithLoader";
import { about_banner2, vission } from "../../assets/images";
import AboutUsSkeleton from "../../Custom_Components/Skeleton/AboutUsSkeleton";
import DOMPurify from "dompurify";
function AboutUsContent({ innerRef }) {
  const page = 1;
  const limit = 10;

  const { aboutUs, isLoading } = useSelector((store) => store?.aboutUs);

  const { mission, vision, profile } = aboutUs?.[0] || {};
  const dispatch = useDispatch();

  const getAllAboutUsDetails = useCallback(async () => {
    dispatch(fetchAllAboutUsThunk({ page, limit }));
  }, [dispatch]);

  useEffect(() => {
    getAllAboutUsDetails();
  }, [getAllAboutUsDetails]);

  return (
    <>
      {isLoading ? (
        <AboutUsSkeleton right={true} />
      ) : (
        <section className="content_area" ref={innerRef}>
          <div className="container">
            <div className="row align-items-center ">
              <div className="col-lg-6">
                <div className="about_data_page">
                  <h2>{profile?.heading || "N/A"}</h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(profile?.description || "N/A"),
                    }}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="about_photo">
                  <ImageWithLoader src={profile?.imageUrl || about_banner2} />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {isLoading ? (
        <AboutUsSkeleton right={false} vission={true} />
      ) : (
        <section className="vision">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-4">
                <div className="vision_imm">
                  <ImageWithLoader src={vision?.imageUrl || vission} />
                </div>
              </div>
              <div className="col-lg-8">
                <div className="vision_data">
                  <h3>{vision?.heading || "N/A"}</h3>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(vision?.description || "N/A"),
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {isLoading ? (
        <AboutUsSkeleton right={true} />
      ) : (
        <section className="mission">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-8">
                <div className="mission_data">
                  <h3>{mission?.heading || "N/A"}</h3>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(mission?.description || "N/A"),
                    }}
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="mission_imm">
                  <ImageWithLoader src={mission?.imageUrl || vission} />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default AboutUsContent;
