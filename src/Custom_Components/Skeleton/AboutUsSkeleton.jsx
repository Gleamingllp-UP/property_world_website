import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AboutUsSkeleton = ({ right,vission }) => {
  return (
    <section className={vission ? 'vision py-5' :'py-5'}>
      <div className="container">
        <div className="row align-items-center">
          {/* Image Column */}
          <div className={`col-lg-4 ${right ? "order-lg-2" : ""}`}>
            <div className="placeholder-glow">
              <div
                className="placeholder w-100 bg-secondary-subtle rounded"
                style={{ height: "250px" }}
              ></div>
            </div>
          </div>

          {/* Text Content Column */}
          <div className={`col-lg-8 ${right ? "order-lg-1" : ""}`}>
            <div className="placeholder-glow mt-4 mt-lg-0">
              <p
                className="placeholder col-4 bg-secondary-subtle rounded mb-3"
                style={{ height: "20px" }}
              ></p>
              <p
                className="placeholder col-12 bg-secondary-subtle rounded mb-2"
                style={{ height: "16px" }}
              ></p>
              <p
                className="placeholder col-10 bg-secondary-subtle rounded mb-2"
                style={{ height: "16px" }}
              ></p>
              <p
                className="placeholder col-11 bg-secondary-subtle rounded"
                style={{ height: "16px" }}
              ></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSkeleton;
