import React, { useRef, useState, useEffect } from "react";
import { createPopper } from "@popperjs/core";
import { CircleAlert } from "lucide-react";
import { getPaymentPlanBreakdown } from "../../../helper/function/getPaymentPlanBreakdown";

const PaymentPlanPopover = ({ payment }) => {
  const [visible, setVisible] = useState(false);
  const referenceRef = useRef(null);
  const popperRef = useRef(null);
  const popperInstance = useRef(null);

 const { downPayment, onConstruction, onHandover } = getPaymentPlanBreakdown(payment);

const paymentDetails = {
  downPayment: `${downPayment}%`,
  onConstruction: `${onConstruction}%`,
  onHandover: `${onHandover}%`,
};


  useEffect(() => {
    if (visible && referenceRef.current && popperRef.current) {
      popperInstance.current = createPopper(referenceRef.current, popperRef.current, {
        placement: "right",
        modifiers: [
          {
            name: "flip",
            options: {
              fallbackPlacements: ["left", "top", "bottom"],
            },
          },
          {
            name: "preventOverflow",
            options: {
              boundary: "viewport",
              padding: 8,
            },
          },
        ],
      });
    }

    return () => {
      if (popperInstance.current) {
        popperInstance.current.destroy();
        popperInstance.current = null;
      }
    };
  }, [visible]);

  return (
    <div className="position-relative d-inline-block">
      <span
        ref={referenceRef}
        className="text-secondary"
        style={{ cursor: "pointer" }}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        <CircleAlert size={14} strokeWidth={2} />
      </span>

      {visible && (
        <div
          ref={popperRef}
          className="popover bs-popover-auto show"
          role="tooltip"
          style={{
            zIndex: 9999,
            background: "#fff",
            border: "1px solid #e0e0e0",
            borderRadius: "0.5rem",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.12)",
            minWidth: "220px",
            overflow: "hidden",
          }}
        >
          <div
            className="popover-header"
            style={{
              backgroundColor: "#f8f9fa",
              fontWeight: "600",
              fontSize: "14px",
              color: "#333",
              padding: "0.5rem 0.75rem",
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            Payment Plan
          </div>
          <div className="popover-body" style={{ padding: "0.75rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.5rem",
                paddingBottom: "0.5rem",
                borderBottom: "1px solid #e9ecef",
              }}
            >
              <span className="text-muted small">Down Payment</span>
              <span className="fw-semibold small">{paymentDetails.downPayment}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.5rem",
                paddingBottom: "0.5rem",
                borderBottom: "1px solid #e9ecef",
              }}
            >
              <span className="text-muted small">On Construction</span>
              <span className="fw-semibold small">{paymentDetails.onConstruction}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span className="text-muted small">On Handover</span>
              <span className="fw-semibold small">{paymentDetails.onHandover}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPlanPopover;
