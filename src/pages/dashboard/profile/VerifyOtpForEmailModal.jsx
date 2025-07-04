import React, { useEffect, useRef, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import ButtonWithSpin from "../../../Custom_Components/ButtonWithSpin";

function VerifyOtpForEmailModal({ show, onHide, onVerify }) {
  const { loading } = useSelector((store) => store?.user);

  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return; // only digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if available
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const joinedOtp = otp.join("");
    if (joinedOtp.length !== 6) {
      setError("Please enter a 6-digit OTP.");
      return;
    }
    setError("");
    onVerify?.(joinedOtp);
  };

  useEffect(() => {
    if (!show) {
      setOtp(["", "", "", "", "", ""]);
      setError("");
    }
  }, [show]);

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="border-bottom-0" />
      <Modal.Body className="pt-0 pb-4">
        <div className="text-center mb-3">
          <h5>Enter Verification Code</h5>
          <p className="text-muted small mb-3">
            A 6-digit code was sent to your email.
          </p>
        </div>

        <div className="d-flex justify-content-center gap-2 mb-2">
          {otp.map((digit, index) => (
            <Form.Control
              key={index}
              type="text"
              value={digit}
              maxLength={1}
              className="text-center"
              style={{ width: "3rem", height: "3rem", fontSize: "1.5rem" }}
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>

        {error && (
          <div className="text-danger text-center small mb-2">{error}</div>
        )}

        <div className="d-flex justify-content-end gap-2 mt-3">
          <Button variant="outline-secondary" onClick={onHide}>
            Cancel
          </Button>
          {loading ? (
            <ButtonWithSpin />
          ) : (
            <Button
              variant="primary"
              onClick={() => {
                handleVerify();
              }}
            >
              Verify
            </Button>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default React.memo(VerifyOtpForEmailModal);
