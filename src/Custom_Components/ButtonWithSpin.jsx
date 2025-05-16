import React from "react";
import { Button, Spinner } from "react-bootstrap";

const ButtonWithSpin = () => {
  return (
    <Button
    variant="secondary"
    disabled
    className="d-inline-flex align-items-center justify-content-center gap-2 rounded-1"
    style={{ width:"100%", height: "40px" }}
  >
    <Spinner animation="border" size="sm" role="status" />
    Wait...
  </Button>
  );
};

export default ButtonWithSpin;
