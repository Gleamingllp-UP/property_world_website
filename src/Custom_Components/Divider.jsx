import React from "react";

function Divider({ text = "or" }) {
  return (
    <div className="d-flex align-items-center text-muted my-2">
      <div className="flex-grow-1">
        <hr className="m-0" />
      </div>
      <div className="px-2 small fw-semibold">{text}</div>
      <div className="flex-grow-1">
        <hr className="m-0" />
      </div>
    </div>
  );
}

export default React.memo(Divider);
