import React, { useEffect } from "react";
import { contact_photo, property_world_logo } from "../../../assets/images";
import { Link } from "react-router-dom";
import { pageRoutes } from "../../../router/pageRoutes";
import { getAllUserForWebThunk } from "../../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

function AgentsListing() {
  const { isLoading, agentOrAgencyData } = useSelector((store) => store?.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUserForWebThunk());
  }, [dispatch]);
  return (
    <>
      <div className="container mb-5">
        <p className="text-center">Showing 1 - 12 of 18 Agents</p>
        <div className>
          <div className="row align-items-center justify-content-center">
            {agentOrAgencyData.map((agent, index) => (
              <div className="col-lg-5 agency_list" key={index}>
                <div className="agent_info_image agent_info_image2 agent_pennel_2">
                  <div>
                    <Link to={pageRoutes.AGENT_INFO}>
                      <img src={agent?.agent_photo} className="img-fluid" />
                    </Link>
                  </div>
                  <div>
                    <h3>
                      {agent?.first_name} {agent?.last_name}
                    </h3>
                    <p>
                      <b>Agent:</b> {agent?.company_name}
                    </p>
                    <p>
                      <b>Exp.:</b> {agent?.experience} years{" "}
                      <span className="ratt">
                        <i className="ri-star-fill" /> 4.2
                      </span>
                    </p>
                    <p>
                      <b>Nationally:</b> {agent?.country_of_residance}
                    </p>
                    {agent?.languages?.map((lang, index) => (
                      <p key={index}>
                        <b>Language: {lang}</b>
                      </p>
                    ))}
                    <div className="for_sale">
                      <div>For Sale: 5</div>
                      <div>For Rent: 10</div>
                    </div>
                    <Link to={pageRoutes} className="action_btn popp">
                      <i className="ri-arrow-right-up-long-line" />
                    </Link>
                  </div>
                  <img src={agent?.agency_logo} className="a_logo" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-12 text-center mb-5 mt-5">
          <ul className="pagination">
            <li className="page-item disabled">
              <a className="page-link">Previous</a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item active" aria-current="page">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                4
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                5
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                6
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                Next
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default AgentsListing;
