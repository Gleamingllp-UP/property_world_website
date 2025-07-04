import React from "react";
import { agency1 } from "../../../assets/images";
import { useSelector } from "react-redux";
import { AgenciesSkeleton } from "../../../Custom_Components/Skeleton/AgentOrAgencySkeleton";
import { CustomPagination } from "../../../Custom_Components/CustomPagination";
import { pageRoutes } from "../../../router/pageRoutes";
import { Link } from "react-router-dom";
import ImageWithLoader from "../../../Custom_Components/ImageWithLoader";
import { formatTextToTitle } from "../../../helper/function/formatTextToTitle";

function AgenciesListing({ page, limit, setPage }) {
  const { isLoading, agentOrAgencyData, pagination } = useSelector(
    (store) => store?.user
  );

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
            {pagination?.total > 1 ? "Agencies" : "Agency"}
          </p>
        ) : (
          <></>
        )}

        <div>
          <div className="row align-items-center justify-content-center">
            {isLoading
              ? Array.from({ length: 4 })?.map((_, i) => {
                  return <AgenciesSkeleton key={i} />;
                })
              : agentOrAgencyData?.length > 0
              ? agentOrAgencyData?.map((item, index) => {
                  return (
                    <div className="col-lg-5 agency_list" key={index}>
                      <div className="agent_info_image agent_info_image2 agent_pennel_2">
                        <div>
                          <ImageWithLoader
                            src={item?.agency_logo || agency1}
                            className="img-fluid agencies_logo object-fit-contain"
                          />
                        </div>
                        <div>
                          <h3>{item?.company_name ?? "Property World"}</h3>
                          <p>
                            <b>Agents:</b> {item?.agents ?? "0"}
                          </p>
                          <p>
                            <b>Exp.:</b> {item?.experience || 0} year
                            {item?.experience > 1 ? "s" : ""}
                            <span className="ratt">
                              <i className="ri-star-fill" /> {item?.rating || 0}
                            </span>
                          </p>
                          <p>
                            <b>Nationally:</b>{" "}
                            {item?.country_of_residance ?? ""}
                          </p>
                          <p>
                            <b>Language:</b>{" "}
                            {item?.languages?.length > 0
                              ? item?.languages
                                  ?.map((lang) => formatTextToTitle(lang))
                                  ?.join(", ")
                              : "No Language"}
                          </p>
                          <div className="for_sale">
                            {item?.property_summary?.categories?.map(
                              (itm, i) => (
                                <div key={i}>
                                  For {itm?.name} {itm?.count}
                                </div>
                              )
                            )}
                          </div>
                          <Link
                            to={
                              pageRoutes.AGENT_INFO + `/?user_id=${item?._id}`
                            }
                            className="action_btn popp"
                          >
                            <i className="ri-arrow-right-up-long-line" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })
              : !isLoading && (
                  <div className="col-12">
                    <div className="text-center border border-light-subtle rounded py-3 bg-light text-muted fw-medium">
                      No Data Available
                    </div>
                  </div>
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
