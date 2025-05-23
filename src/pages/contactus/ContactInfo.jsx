import React, { useCallback, useEffect } from "react";
import img from "../../assets/images/common/contact_photo.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getAllContactUsThunk } from "../../features/contactUs/contactUsSlice";
import ImageWithLoader from "../../Custom_Components/ImageWithLoader";
import ContactUsInfoSkeleton from "../../Custom_Components/Skeleton/ContactUsInfoSkeleton";
import SocialIcons from "../../Custom_Components/SocialIcons";
const ContactInfo = ({ innerRef }) => {
  const { contactUs, isLoading } = useSelector((store) => store?.contactUs);
  const dispatch = useDispatch();

  const getAllContactUsDetails = useCallback(async () => {
    dispatch(getAllContactUsThunk());
  }, [dispatch]);

  useEffect(() => {
    getAllContactUsDetails();
  }, [getAllContactUsDetails]);

  return (
    <>
      <section className="content_area" ref={innerRef}>
        <div className="container">
          {isLoading ? (
            <ContactUsInfoSkeleton />
          ) : (
            <>
              <div className="row align-items-center ">
                <div className="col-lg-6">
                  <div className="contact_info">
                    <h2>Have a Questions?</h2>
                    <p>We Can Help You</p>
                    <hr />
                    <div>
                      <p>
                        <b>Address:</b>
                      </p>
                      <ul className>
                        <li>
                          <i className="ri-map-pin-line" />
                          {contactUs?.[0]?.address || "N/A"}
                        </li>
                      </ul>
                    </div>
                    <div>
                      <p>
                        <b>Information:</b>
                      </p>
                      <ul className>
                        <li>
                          {" "}
                          <a
                            href={`tel:+${
                              contactUs?.[0]?.tele_phone || "97143533229"
                            }`}
                          >
                            <i className="ri-phone-line" /> tel:+{" "}
                            {contactUs?.[0]?.tele_phone || "N/A"}
                          </a>
                        </li>
                        <li>
                          {" "}
                          <a
                            href={`mailto:${
                              contactUs?.[0]?.email || "info@propertyworld.ae"
                            }`}
                          >
                            <i className="ri-mail-open-line" />{" "}
                            {contactUs?.[0]?.email || "N/A"}
                          </a>
                        </li>
                      </ul>
                      <a
                        target="_blank"
                        href={`https://api.whatsapp.com/send?phone=+${
                          contactUs?.[0]?.whatsapp_number || "447825725358"
                        }&text=Hi%20property%20world%20team`}
                        className="my_whats"
                      >
                        <i className="ri-whatsapp-line" /> WhatsApp Support
                      </a>
                    </div>
                    <div className="mt-4">
                      <p>
                        <b>Follow Us:</b>
                      </p>
                      <SocialIcons className={'social_media2'}/>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="contact_photo">
                    <ImageWithLoader src={contactUs?.[0]?.cover_img || img} />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default ContactInfo;
