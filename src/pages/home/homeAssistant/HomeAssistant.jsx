import React from "react";
import ImageWithLoader from "../../../Custom_Components/ImageWithLoader";
import { chat, city2, map } from "../../../assets/images";

function HomeAssistant() {
  return (
    <>
      <section className="proxiview_area prox_desktop">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="box_area">
                <a href="#">
                  <div className="inner_block">
                    <ImageWithLoader src={map} className="img-fluid" />
                  </div>
                  <div className="content_atra">
                    <h2>
                      Proxiview <i className="ri-arrow-right-up-long-line" />
                    </h2>
                    <p>
                      <b>(Smart Map View)</b>
                    </p>
                    <p>
                      An interactive map that shows <br /> nearby landmarks
                    </p>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="box_area">
                <a href="#">
                  <div className="inner_block">
                    <ImageWithLoader src={chat} className="img-fluid" />
                  </div>
                  <div className="content_atra">
                    <h2>
                      PropBot <i className="ri-arrow-right-up-long-line" />
                    </h2>
                    <p>
                      <b>Smart Property Assistant (AI Chatbot)</b>
                    </p>
                    <p>
                      An AI-powered chatbot that helps <br />
                      users find properties
                    </p>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="box_area">
                <a href="#">
                  <div className="inner_block">
                    <ImageWithLoader src={city2} className="img-fluid" />
                  </div>
                  <div className="content_atra">
                    <h2>
                      TrueWorth <i className="ri-arrow-right-up-long-line" />
                    </h2>
                    <p>
                      <b>(Property valuation feature)</b>
                    </p>
                    <p>
                      An AI-powered chatbot that helps <br />
                      users find properties
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="proxiview_area prox_mobile">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="box_area1">
                <a href="#">
                  <div className="inner_block1">
                    <ImageWithLoader src={map} className="img-fluid mk_p" />
                   
                  </div>
                  <div className="content_atra1">
                    <h2>
                      Proxiview <i className="ri-arrow-right-up-long-line" />
                    </h2>
                    <p>
                      <b>(Smart Map View)</b>
                    </p>
                    <p>
                      An interactive map that shows <br />
                      nearby landmarks
                    </p>
                  </div>
                  <div>
                    <i className="ri-arrow-right-s-line" />
                  </div>
                </a>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="box_area">
                <a href="#">
                  <div className="inner_block">
                    <ImageWithLoader src={chat} className="img-fluid" />
                  </div>
                  <div className="content_atra">
                    <h2>
                      PropBot <i className="ri-arrow-right-up-long-line" />
                    </h2>
                    <p>
                      <b>(Smart Property Assistant (AI Chatbot)</b>
                    </p>
                    <p>
                      An AI-powered chatbot that helps <br />
                      users find properties
                    </p>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="box_area">
                <a href="#">
                  <div className="inner_block">
                    <ImageWithLoader src={city2} className="img-fluid" />
                  </div>
                  <div className="content_atra">
                    <h2>
                      TrueWorth <i className="ri-arrow-right-up-long-line" />
                    </h2>
                    <p>
                      <b>(Property valuation feature)</b>
                    </p>
                    <p>
                      An AI-powered chatbot that helps <br /> users find
                      properties
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomeAssistant;
