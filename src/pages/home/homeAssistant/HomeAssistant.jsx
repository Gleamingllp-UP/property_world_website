import React, { useState } from "react";
import ImageWithLoader from "../../../Custom_Components/ImageWithLoader";
import { chat, city2, map } from "../../../assets/images";
import { Link } from "react-router-dom";
import { pageRoutes } from "../../../router/pageRoutes";
import QuickContactFormModal from "./QuickContactFormModal";
import PropBotGPTModal from "./PropBotGPTModal";
import { useDispatch, useSelector } from "react-redux";
import { openLoginPrompt } from "../../../features/user/userSlice";

function HomeAssistant() {
  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const { userData } = useSelector((store) => store?.user);

  const dispatch = useDispatch();
  const handleAssistantOpen = () => {
    if (userData?.role === "guest") {
      dispatch(openLoginPrompt("Log in to your account for access PropBot."));
      return;
    }
    setModalShow2(true);
    // const agentContainer = document.querySelector(".embedded-agent-container");
    // const animationContainer = document.querySelector(
    //   ".ai-agent-chat-animation-container"
    // );

    // if (agentContainer && animationContainer) {
    //   agentContainer.classList.toggle("opened");
    //   animationContainer.classList.toggle("isOpened");
    // } else {
    //   console.warn("Chatbot containers not found");
    // }
  };

  return (
    <>
      <section className="proxiview_area prox_desktop">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="box_area">
                <Link to={pageRoutes.PROPERTY_LISTING + "/?map_view=true"}>
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
                </Link>
              </div>
            </div>
            <div className="col-lg-4">
              <div
                className="box_area cursor-pointer"
                onClick={() => handleAssistantOpen()}
              >
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
              </div>
            </div>
            <div className="col-lg-4">
              <div
                className="box_area cursor-pointer"
                onClick={() => setModalShow(true)}
              >
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="proxiview_area prox_mobile">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="box_area">
                <Link to={pageRoutes.PROPERTY_LISTING + "/?map_view=true"}>
                  <div className="inner_block">
                    <ImageWithLoader src={map} className="img-fluid mk_p" />
                  </div>
                  <div className="content_atra">
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
                </Link>
              </div>
            </div>
            <div className="col-lg-4">
              <div
                className="box_area cursor-pointer"
                onClick={() => handleAssistantOpen()}
              >
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
              </div>
            </div>
            <div className="col-lg-4">
              <div
                className="box_area cursor-pointer"
                onClick={() => setModalShow(true)}
              >
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
              </div>
            </div>
          </div>
        </div>
      </section>
      <PropBotGPTModal
        show={modalShow2}
        handleClose={() => setModalShow2(false)}
      />
      <QuickContactFormModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default HomeAssistant;
