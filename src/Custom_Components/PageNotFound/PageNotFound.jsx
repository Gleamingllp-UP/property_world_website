import React from "react";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "../../router/pageRoutes";

function PageNotFound() {
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
          <h1 className="display-1 fw-bold mb-3">404</h1>
          <p className="fs-3 mb-3">Page Not Found</p>
          <p className="mb-4 fw-medium">
            Oops! It seems the page you're looking for doesn't exist or has been
            moved.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <button
              onClick={() => navigate(pageRoutes.HOME_PAGE)}
              className="btn btn-dark px-4 py-2 shadow-sm"
            >
              Go Back Home
            </button>
            <button
              onClick={() => navigate(-1)}
              className="btn btn-outline-dark px-4 py-2 shadow-sm"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
