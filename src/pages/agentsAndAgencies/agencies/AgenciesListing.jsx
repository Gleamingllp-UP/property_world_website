import React, { useState } from "react";
import { agency1, agency2 } from "../../../assets/images";
import { useSelector } from "react-redux";
import { AgenciesSkeleton } from "../../../Custom_Components/Skeleton/AgentOrAgencySkeleton";
import { CustomPagination } from "../../../Custom_Components/CustomPagination";

function AgenciesListing() {
  const { isLoading, agentOrAgencyData, pagination } = useSelector(
    (store) => store?.user
  );
  const [page, setPage] = useState(1);
  const limit = 8;

  return (
    <>
      <div className="container mb-5">
        {isLoading ? (
          <p className="text-center placeholder-glow">
            <span
              className="placeholder bg-secondary-subtle col-4"
              style={{ height: "20px", display: "inline-block" }}
            />
          </p>
        ) : agentOrAgencyData?.length > 0 ? (
          <p className="text-center">
            Showing {(page - 1) * limit + 1} -{" "}
            {Math.min(page * limit, pagination?.total)} of {pagination?.total}{" "}
            Agents
          </p>
        ) : (
          <></>
        )}

        <div className>
          <div className="row align-items-center justify-content-center">
            {isLoading ? (
              Array.from({ length: 4 })?.map((_, i) => {
                return <AgenciesSkeleton key={i} />;
              })
            ) : agentOrAgencyData?.length > 0 ? (
              agentOrAgencyData?.map((item, index) => {
                return (
                  <div className="col-lg-5 agency_list" key={index}>
                    <div className="agent_info_image agent_info_image2 agent_pennel_2">
                      <div>
                        <img
                          src={agency1}
                          className="img-fluid agencies_logo"
                        />
                      </div>
                      <div>
                        <h3>Aditya real estate</h3>
                        <p>
                          <b>Agents:</b> 20
                        </p>
                        <p>
                          <b>Exp.:</b> 11 years{" "}
                          <span className="ratt">
                            <i className="ri-star-fill" /> 4.2
                          </span>
                        </p>
                        <p>
                          <b>Nationally:</b> Indian
                        </p>
                        <p>
                          <b>Language:</b> English, Hindi
                        </p>
                        <div className="for_sale">
                          <div>For Sale: 5</div>
                          <div>For Rent: 10</div>
                        </div>
                        <a href="agent-info.php" className="action_btn popp">
                          <i className="ri-arrow-right-up-long-line" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              !isLoading && (
                <p className="text-center"> No Data Available</p>
              )
            )}
          </div>
        </div>
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
    </>
  );
}

export default AgenciesListing;
