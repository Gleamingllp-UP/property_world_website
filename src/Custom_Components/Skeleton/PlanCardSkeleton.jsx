import React from "react";

function PlanCardSkeleton() {
  return (
    <div className="pricing-block col-lg-4 col-md-6 col-sm-12">
      <div className="inner-box placeholder-glow">
        {/* Icon Box */}
        <div className="icon-box d-flex justify-content-center align-items-center">
          <div className="icon-outer">
            <div className="placeholder rounded-circle w-100 h-100 bg-secondary-subtle" />
          </div>
        </div>
        
        {/* Price Box */}
          <div
            className="d-flex placeholder col-6 mx-auto mb-2 bg-secondary-subtle rounded"
            style={{ height: 24 }}
          />
          <div
            className="d-flex placeholder col-4 mx-auto bg-secondary-subtle rounded"
            style={{ height: 28 }}
          />

        {/* Features */}
        <ul className="features text-start mx-auto">
          <li>
            <div
              className="placeholder col-10 bg-secondary-subtle rounded"
              style={{ height: 16 }}
            />
          </li>
          <li>
            <div
              className="placeholder col-8 bg-secondary-subtle rounded"
              style={{ height: 16 }}
            />
          </li>
          <li>
            <div
              className="placeholder col-9 bg-secondary-subtle rounded"
              style={{ height: 16 }}
            />
          </li>
          <li>
            <div
              className="placeholder col-7 bg-secondary-subtle rounded"
              style={{ height: 16 }}
            />
          </li>
          <li>
            <div
              className="placeholder col-6 bg-secondary-subtle rounded"
              style={{ height: 16 }}
            />
          </li>
        </ul>
        {/* Button */}
        <div className="btn-box text-center mt-3">
          <div
            className="placeholder col-6 mx-auto bg-secondary-subtle rounded-pill"
            style={{ height: 36 }}
          />
        </div>
      </div>
    </div>
  );
}

export default PlanCardSkeleton;
