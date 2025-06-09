import React, { useState } from 'react';
import { contact_photo } from '../../../assets/images'

const AgentInfoBanner = () => {
      const [isExpanded, setIsExpanded] = useState(false);

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
                <div><img src={contact_photo} className="img-fluid" /></div>
                <div>
                  <h3>John Smith <span className="ratt"><i className="ri-star-fill" /> 4.2</span></h3>
                  <p>Agent: Property Finders</p>
                  <div className="call_action">
                    <ul>
                      <li> <a className="call_a" href="#"><i className="ri-phone-line" /> Call </a></li>
                      <li> <a className="email_a" href="#"><i className="ri-mail-open-line" /> Email </a></li>
                      <li> <a className="whats_a" href="#"><i className="ri-whatsapp-line" /> WhatsApp </a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="agent_info_box">
                <ul>
                  <li><b>Language(s):</b> Arabic, English</li>
                  <li><b>Expertise:</b> Off-Plan Sales</li>
                  <li><b>Service Areas:</b> Dubai</li>
                  <li><b>Properties:</b> For Sale (187), For Rent (2)</li>
               <li className="bio">
      <div
        id="text"
        style={{
          display: '-webkit-box',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: isExpanded ? 'unset' : 1,
        }}
      >
        <b>Description:</b> My name is John Smith brings over a decade of Real Estate expertise to my role as Head of Sales. With years of experience in the industry, has honed skills and knowledge through leading companies. As a dynamic leader. I continue to drive success and client satisfaction in the world of Real Estate.
      </div>

      <button id="toggleButton" onClick={toggleText}>
        {isExpanded ? 'Read Less' : 'Read More'}
      </button>
    </li>
                  <li><b>BRN:</b>35201</li>
                  <li><b>Experience:</b> 11 years</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AgentInfoBanner