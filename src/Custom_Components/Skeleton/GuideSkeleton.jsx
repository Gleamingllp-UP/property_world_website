import React from "react";

function GuideSkeleton() {
  return (
    <section className="content_area py-5">
      <div className="container">
        {/* Heading Skeleton */}
        <div className="mb-4">
          <div className="placeholder-glow d-flex justify-content-center">
            <h3
              className="placeholder col-6 bg-secondary-subtle rounded"
              style={{ height: "36px" }}
            ></h3>
          </div>
          <hr />
          <div className="placeholder-glow row justify-content-center">
            <p
              className="placeholder col-9 bg-secondary-subtle rounded"
              style={{ height: "16px" }}
            ></p>
            <p
              className="placeholder col-10 bg-secondary-subtle rounded"
              style={{ height: "16px" }}
            ></p>
          </div>
        </div>

        <div className="row align-items-center">
          {/* Image Skeleton */}
          <div
            className="col-lg-5 mb-4 placeholder-glow"
            style={{
              height: "700px",
              padding: "50px",
            }}
          >
            <div className="placeholder bg-secondary-subtle img-fluid border_round"></div>
          </div>

          {/* Text Skeleton */}
          <div className="col-lg-7">
            <div className="placeholder-glow">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="mb-3">
                  <p
                    className="placeholder col-5 bg-secondary-subtle rounded"
                    style={{ height: "14px" }}
                  ></p>
                  <p
                    className="placeholder col-11 bg-secondary-subtle rounded"
                    style={{ height: "14px" }}
                  ></p>
                  <p
                    className="placeholder col-10 bg-secondary-subtle rounded"
                    style={{ height: "14px" }}
                  ></p>
                </div>
              ))}
              <div className="mt-4">
                <span className="placeholder col-4 bg-secondary-subtle rounded py-4 d-inline-block"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GuideSkeleton;
