import React from "react";

const PrivacyPolicySkeleton = () => {
  return (
    <section className="content_area py-4">
      <div className="container">
        {/* Top Notice */}
        <div className="row justify-content-center">
          <p
            className="placeholder col-2 bg-secondary-subtle rounded"
            style={{ height: "20px" }}
          ></p>
        </div>
        <div className="placeholder-glow mb-4 text-center">
          <p
            className="placeholder col-6 bg-secondary-subtle rounded"
            style={{ height: "20px" }}
          ></p>
          <p
            className="placeholder col-7 bg-secondary-subtle rounded"
            style={{ height: "16px" }}
          ></p>
          <p
            className="placeholder col-7 bg-secondary-subtle rounded"
            style={{ height: "16px" }}
          ></p>
        </div>

        <hr />

        {/* Discover Section */}
        <div className="row justify-content-start">
          <div className="col-lg-12 placeholder-glow">
            <p
              className="placeholder col-3 bg-secondary-subtle rounded"
              style={{ height: "18px" }}
            ></p>
            {[...Array(6)].map((_, i) => (
              <p
                key={i}
                className="placeholder bg-secondary-subtle rounded mb-2"
                style={{ height: "16px", width: `100%` }}
              ></p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export const CookiesPolicySkeleton = () => {
  return (
    <section className="content_area py-4">
      <div className="container">
        {/* Top Notice */}
        <div className="row justify-content-center">
          <p
            className="placeholder col-2 bg-secondary-subtle rounded"
            style={{ height: "20px" }}
          ></p>
        </div>
        <div className="placeholder-glow mb-4 text-center">
          <p
            className="placeholder col-6 bg-secondary-subtle rounded"
            style={{ height: "20px" }}
          ></p>
          <p
            className="placeholder col-7 bg-secondary-subtle rounded"
            style={{ height: "16px" }}
          ></p>
          <p
            className="placeholder col-7 bg-secondary-subtle rounded"
            style={{ height: "16px" }}
          ></p>
        </div>

        <hr />

        {/* Discover Section */}
        <div className="row justify-content-start">
          <div className="col-lg-12 placeholder-glow">
            <p
              className="placeholder col-3 bg-secondary-subtle rounded"
              style={{ height: "18px" }}
            ></p>
            {[...Array(6)].map((_, i) => (
              <p
                key={i}
                className="placeholder bg-secondary-subtle rounded mb-2"
                style={{ height: "16px", width: `100%` }}
              ></p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export const TermsAndConditionSkeleton = () => {
  return (
    <section className="content_area py-4">
      <div className="container">
        {/* Top Notice */}
        <div className="row justify-content-center">
          <p
            className="placeholder col-2 bg-secondary-subtle rounded"
            style={{ height: "20px" }}
          ></p>
        </div>
        <div className="placeholder-glow mb-4 text-center">
          <p
            className="placeholder col-6 bg-secondary-subtle rounded"
            style={{ height: "20px" }}
          ></p>
          <p
            className="placeholder col-7 bg-secondary-subtle rounded"
            style={{ height: "16px" }}
          ></p>
          <p
            className="placeholder col-7 bg-secondary-subtle rounded"
            style={{ height: "16px" }}
          ></p>
          <p
            className="placeholder col-7 bg-secondary-subtle rounded"
            style={{ height: "16px" }}
          ></p>
        </div>

        <hr />

        {/* Discover Section */}
        <div className="row justify-content-start">
          <div className="col-lg-12 placeholder-glow">
            <p
              className="placeholder col-3 bg-secondary-subtle rounded"
              style={{ height: "18px" }}
            ></p>
            {[...Array(6)].map((_, i) => (
              <p
                key={i}
                className="placeholder bg-secondary-subtle rounded mb-2"
                style={{ height: "16px", width: `100%` }}
              ></p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicySkeleton;
