import React from "react";
import { pageRoutes } from "../../../router/pageRoutes";
import { landlord_guide } from "../../../assets/images";
import { Link } from "react-router-dom";

function AgentsBanner() {
  return (
    <>
      <div
        className="inner_banner"
        style={{ backgroundImage: `url(${landlord_guide})` }}
      >
        <div className="container">
          <div className="buyer_d">
            <h1>Find your agent to find a home</h1>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="agent_agency">
          <span>
            <Link to={pageRoutes.AGENTS} className="slt">
              Agents <i className="ri-arrow-right-up-long-line"></i>
            </Link>
            <Link to={pageRoutes.AGENCIES}>
              Agencies <i className="ri-arrow-right-up-long-line"></i>
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}

export default AgentsBanner;
