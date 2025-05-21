import React from "react";
import img from "../../assets/images/common/contact_photo.jpg";
const ContactInfo = ({ innerRef }) => {
  return (
    <>
      <section className="content_area" ref={innerRef}>
        <div className="container">
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
                      <i className="ri-map-pin-line" /> Office 502, Al Khaleej
                      Center, Al Mankhool Rd., Bur Dubai - Dubai
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
                      <a href="tel:+97143533229">
                        <i className="ri-phone-line" /> tel:+971 43533229
                      </a>
                    </li>
                    <li>
                      {" "}
                      <a href="mailto:info@propertyworld.ae">
                        <i className="ri-mail-open-line" />{" "}
                        info@propertyworld.ae
                      </a>
                    </li>
                  </ul>
                  <a
                    target="_blank"
                    href="https://api.whatsapp.com/send?phone=+447825725358&text=Hi%20property%20world%20team"
                    className="my_whats"
                  >
                    <i className="ri-whatsapp-line" /> WhatsApp Support
                  </a>
                </div>
                <div className="mt-4">
                  <p>
                    <b>Follow Us:</b>
                  </p>
                  <div className="social_media2">
                    <ul>
                      <li>
                        <a href="#">
                          <i className="ri-facebook-fill" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="ri-twitter-x-fill" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="ri-instagram-line" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="ri-youtube-line" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="contact_photo">
                <img src={img} className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactInfo;
