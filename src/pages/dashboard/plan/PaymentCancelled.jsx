import React from "react";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "../../../router/pageRoutes";

const PaymentCancelled = () => {
  const navigate = useNavigate();

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="container px-4">
        <div
          className="mx-auto p-5 rounded-2 shadow-lg text-center"
          style={{
            maxWidth: "800px",
            backdropFilter: "blur(5px)",
          }}
        >
          <h1 className="display-4 fw-bold mb-3 text-danger">
            Payment Cancelled
          </h1>
          <p className="fs-3 mb-3">Your payment was not successful</p>
          <p className="mb-4 fw-medium">
            The payment was cancelled or failed to complete. You can try again
            or return to the homepage.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <button
              onClick={() => navigate(pageRoutes.YOUR_PLAN)}
              className="btn btn-light px-4 py-2 shadow-sm"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate(pageRoutes.HOME_PAGE)}
              className="btn btn-light px-4 py-2 shadow-sm"
            >
              Go Back Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelled;
