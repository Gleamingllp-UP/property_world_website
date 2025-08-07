import React from "react";
import { pageRoutes } from "../router/pageRoutes";
import { openLoginPrompt } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const JoinUsNow = () => {
  const { userData } = useSelector((store) => store?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <section className="looking_to">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6" />
            <div className="col-lg-6">
              <div className="list_u">
                <h2>
                  List Your Properties on
                  <br />
                  <span>Property World</span>, Join Us Now!
                </h2>
                <p>
                  Our property listings feature a wide variety of residential
                  and commercial properties, designed to meet the diverse needs
                  of buyers, sellers, and renters.
                </p>
                <a
                  className="action_btn mt-4"
                  onClick={() => {
                    if (userData?.role === "guest") {
                      dispatch(
                        openLoginPrompt(
                          "Log in to your account to list your properties."
                        )
                      );
                      return;
                    } else {
                      navigate(pageRoutes.ADD_PROPERTY);
                    }
                  }}
                >
                  List Your Property{" "}
                  <i className="ri-arrow-right-up-long-line" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default React.memo(JoinUsNow);
