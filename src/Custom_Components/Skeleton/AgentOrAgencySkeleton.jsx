import React from "react";

function AgentSkeleton() {
  return (
    <div className="col-lg-5 agency_list">
      <div className="agent_info_image agent_info_image2 agent_pennel_2 d-flex gap-3">
        {/* LEFT: Image Placeholder */}
        <div style={{ flex: "0 0 160px" }}>
          <div className="placeholder-glow w-100">
            <div
              className="placeholder bg-secondary-subtle"
              style={{
                width: "160px",
                height: "180px",
                borderRadius: "10px",
              }}
            />
          </div>
        </div>

        {/* RIGHT: Text Content */}
        <div className="flex-grow-1 w-100">
          <h3 className="placeholder-glow">
            <span className="placeholder col-6 bg-secondary-subtle" />
          </h3>

          <p className="placeholder-glow">
            <span className="placeholder col-8 bg-secondary-subtle" />
          </p>

          <p className="placeholder-glow d-flex align-items-center gap-2">
            <span className="placeholder col-4 bg-secondary-subtle" />
            <span className="placeholder col-2 bg-secondary-subtle" />
            <span className="placeholder col-2 bg-secondary-subtle" />
          </p>

          <p className="placeholder-glow">
            <span className="placeholder col-5 bg-secondary-subtle" />
          </p>

          <p className="placeholder-glow">
            <span className="placeholder col-7 bg-secondary-subtle" />
          </p>

          <div className="for_sale d-flex flex-wrap gap-2 mt-2">
            {[1, 2].map((_, i) => (
              <div
                key={i}
                className="placeholder col-4 bg-secondary-subtle"
                style={{ height: "20px", borderRadius: "4px" }}
              />
            ))}
          </div>

          <div className="mt-3 placeholder-glow d-flex justify-content-between">
            <span
              className="placeholder rounded-pill col-3 bg-secondary-subtle"
              style={{ height: "35px" }}
            />
            <span
              className="placeholder rounded-pill col-3 bg-secondary-subtle"
              style={{ height: "35px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function AgenciesSkeleton() {
  return (
    <div className="col-lg-5 agency_list">
      <div className="agent_info_image agent_info_image2 agent_pennel_2 d-flex gap-3">
        {/* LEFT: Logo Placeholder */}
        <div style={{ flex: "0 0 160px" }}>
          <div className="placeholder-glow">
            <div
              className="placeholder bg-secondary-subtle"
              style={{
                width: "160px",
                height: "180px",
                borderRadius: "10px",
              }}
            />
          </div>
        </div>

        {/* RIGHT: Content */}
        <div className="flex-grow-1 w-100">
          <h3 className="placeholder-glow mb-2">
            <span className="placeholder col-6 bg-secondary-subtle" />
          </h3>

          <p className="placeholder-glow mb-2">
            <span className="placeholder col-5 bg-secondary-subtle" />
          </p>

          <p className="placeholder-glow d-flex align-items-center gap-2 mb-2">
            <span className="placeholder col-3 bg-secondary-subtle" />
            <span className="placeholder col-2 bg-secondary-subtle" />
            <span className="placeholder col-2 bg-secondary-subtle" />
          </p>

          <p className="placeholder-glow mb-2">
            <span className="placeholder col-4 bg-secondary-subtle" />
          </p>

          <p className="placeholder-glow mb-2">
            <span className="placeholder col-6 bg-secondary-subtle" />
          </p>

          {/* Property Summary */}
          <div className="for_sale d-flex flex-wrap gap-2 mt-2">
            <div
              className="placeholder col-4 bg-secondary-subtle"
              style={{ height: "20px", borderRadius: "4px" }}
            />
            <div
              className="placeholder col-4 bg-secondary-subtle"
              style={{ height: "20px", borderRadius: "4px" }}
            />
          </div>

          {/* Action Button */}
          <div className="mt-3 placeholder-glow d-flex justify-content-start">
            <span
              className="placeholder rounded-pill col-3 bg-secondary-subtle"
              style={{ height: "35px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export { AgentSkeleton, AgenciesSkeleton };
