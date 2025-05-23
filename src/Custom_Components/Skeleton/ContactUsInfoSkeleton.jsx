import React from "react";

function ContactUsInfoSkeleton() {
  return (
    <div className="row align-items-center">
      {/* Left Column - Skeleton for Contact Info */}
      <div className="col-lg-6">
        <div className="placeholder-glow">
          <div className="">
            <p
              className="placeholder col-8 bg-secondary-subtle rounded"
              style={{ height: "24px" }}
            ></p>
            <p
              className="placeholder col-6 bg-secondary-subtle rounded"
              style={{ height: "18px" }}
            ></p>
          </div>

          <hr />

          {/* Address */}
          <div className="mb-3">
            <p
              className="placeholder col-3 bg-secondary-subtle rounded"
              style={{ height: "18px" }}
            ></p>
            <p
              className="placeholder col-10 bg-secondary-subtle rounded"
              style={{ height: "16px" }}
            ></p>
          </div>

          {/* Information */}
          <div className="">
            <p
              className="placeholder col-4 bg-secondary-subtle rounded"
              style={{ height: "18px" }}
            ></p>
            <p
              className="placeholder col-9 bg-secondary-subtle rounded mb-2"
              style={{ height: "16px" }}
            ></p>
            <p
              className="placeholder col-9 bg-secondary-subtle rounded"
              style={{ height: "16px" }}
            ></p>
            <p
              className="placeholder col-5 bg-secondary-subtle rounded mt-3"
              style={{ height: "30px" }}
            ></p>
          </div>

          {/* Social Media Icons */}
       
        </div>
      </div>

      {/* Right Column - Skeleton for Image */}
      <div className="col-lg-6">
        <div className="placeholder-glow">
          <div
            className="placeholder w-100 bg-secondary-subtle rounded"
            style={{ height: "400px" }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default ContactUsInfoSkeleton;
