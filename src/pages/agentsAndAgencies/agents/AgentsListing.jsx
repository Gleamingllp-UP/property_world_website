import React from "react";
import { useSelector } from "react-redux";
import { pageRoutes } from "../../../router/pageRoutes";
import { Link } from "react-router-dom";
import { CustomPagination } from "../../../Custom_Components/CustomPagination";

function AgentsListing({ page, limit, setPage }) {
  const { isLoading, agentOrAgencyData, pagination } = useSelector(
    (store) => store?.user
  );

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="container mb-5">
      <p className="text-center">
       Showing {(page - 1) * limit + 1} -{" "}
        {Math.min(page * limit, pagination?.total)} of {pagination?.total} Agents
      </p>
      <div className="row align-items-center justify-content-center">
        {agentOrAgencyData && agentOrAgencyData?.map((agent, index) => (
          <div className="col-lg-5 agency_list" key={index}>
            <div className="agent_info_image agent_info_image2 agent_pennel_2">
              <div>
                <Link to={pageRoutes.AGENT_INFO 
                  + `/?user_id=${agent._id}`
                }>
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
                    <i className="ri-star-fill" /> {" "}
                      {agent?.rating}
                  </span>
                </p>
                <p>
                  <b>Nationally:</b> {agent?.country_of_residance}
                </p>
                  <p>
                    <b>Language:</b> {agent?.languages?.map((lang) =>lang)?.join(", ")}
                  </p>
                <div className="for_sale">
                  {agent?.property_summary?.categories?.map((item, i) => (
                    <div key={i}>
                      For {item?.name} {item?.count}
                    </div>
                  ))}
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

      {/* Pagination */}
      {pagination?.total > limit && (
        <div className="col-12 text-center mb-5 mt-5">
          <CustomPagination
            total={pagination?.total}
            page={page}
            limit={limit}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
}

export default AgentsListing;
