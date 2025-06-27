import React, { useState } from "react";

import { useSelector } from "react-redux";
import ImageWithLoader from "../../../Custom_Components/ImageWithLoader";

const AgentInfoBanner = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { agentOrAgencyDetails } = useSelector((store) => store?.user);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <>
      <div className="container">
        <div className="agent_pennel">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="agent_info_image">
                <div>
                  <ImageWithLoader
                    src={
                      agentOrAgencyDetails?.profile_picture ||
                      agentOrAgencyDetails?.agent_photo
                    }
                    className="img-fluid"
                  />
                </div>
                <div>
                  <h3>
                    {agentOrAgencyDetails?.first_name}{" "}
                    {agentOrAgencyDetails?.last_name}{" "}
                    <span className="ratt">
                      <i className="ri-star-fill" />{" "}
                      {agentOrAgencyDetails?.rating}
                    </span>
                  </h3>
                  <p>Agent:{agentOrAgencyDetails?.company_name}</p>
                  <div className="call_action">
                    <ul>
                      <li>
                        {" "}
                        <a
                          className="call_a"
                          href={`tel:${
                            agentOrAgencyDetails?.phone_number || "97143533229"
                          }`}
                        >
                          <i className="ri-phone-line" /> Call{" "}
                        </a>
                      </li>
                      <li>
                        {" "}
                        <a
                          className="email_a"
                          href={`mailto:${
                            agentOrAgencyDetails?.email ||
                            "info@propertyworld.ae"
                          }`}
                        >
                          <i className="ri-mail-open-line" /> Email{" "}
                        </a>
                      </li>
                      <li>
                        {" "}
                        <a
                          className="whats_a"
                          href={`https://wa.me/${
                            agentOrAgencyDetails?.whatsapp_number ||
                            "97143533229"
                          }`}
                        >
                          <i className="ri-whatsapp-line" /> WhatsApp{" "}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="agent_info_box">
                <ul>
                  <li>
                    <b>Language(s):</b>{" "}
                    {agentOrAgencyDetails?.languages
                      ?.map((lang) => lang)
                      ?.join(", ")}
                  </li>
                  <li>
                    <b>Expertise:</b> {agentOrAgencyDetails?.expertise}
                  </li>
                  <li>
                    <b>Service Areas:</b>{" "}
                    {agentOrAgencyDetails?.service_areas?.map((item, i) => (
                      <React.Fragment key={i}>
                        {Array.isArray(item?.name)
                          ? item.name.join(", ")
                          : item?.name}
                        {i !== agentOrAgencyDetails.service_areas.length - 1 &&
                          ", "}
                      </React.Fragment>
                    ))}
                  </li>
                  <li>
                    <b>Properties:</b>{" "}
                    {agentOrAgencyDetails?.property_summary?.categories?.map(
                      (item, i) => (
                        <React.Fragment key={i}>
                          For {item?.name} {item?.count}{" "}
                        </React.Fragment>
                      )
                    )}
                  </li>
                  <li className="bio">
                    <div
                      id="text"
                      style={{
                        display: "-webkit-box",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: isExpanded ? "unset" : 1,
                      }}
                    >
                      <b>Description:</b> {agentOrAgencyDetails?.bio ?? "N/A"}
                    </div>
                    {agentOrAgencyDetails?.bio && (
                      <button id="toggleButton" onClick={toggleText}>
                        {isExpanded ? "Read Less" : "Read More"}
                      </button>
                    )}
                  </li>
                  <li>
                    <b>BRN:</b> {agentOrAgencyDetails?.brn ?? "N/A"}
                  </li>
                  <li>
                    <b>Experience:</b> {agentOrAgencyDetails?.experience || 0}{" "}
                    years
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentInfoBanner;
