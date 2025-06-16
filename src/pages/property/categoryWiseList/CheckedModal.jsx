import React from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";

function CheckedModal({ show, onHide }) {
  return (
    <Modal show={show} onHide={() => onHide()} centered>
      <Modal.Header closeButton className="border-bottom-0"></Modal.Header>

      <Modal.Body className="pt-0" id="agency_info">
        <h3 className="d-flex justify-content-center align-items-center gap-2">
          <FaCheckCircle className="mr-2" />
          <span>Checked</span>
        </h3>
        <hr />
        <p className="text-center">
          Property World has checked this property's documentation to ensure its
          authenticity.
        </p>
      </Modal.Body>
    </Modal>
  );
}

export default React.memo(CheckedModal);
