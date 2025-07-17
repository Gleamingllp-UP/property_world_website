import React from "react";
import { Modal, Button } from "react-bootstrap";

const ClearChatModal = ({ show, onHide, onConfirm }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      contentClassName="custom-modal-content"
    >
      <Modal.Header closeButton className="py-2">
        <div className="fw-semibold text-muted">Clear Chat</div>
      </Modal.Header>

      <Modal.Body>
        <p>Are you sure you want to clear this conversation?</p>
        <p className="text-muted small">
          This will delete all messages from this session.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button
          style={{
            backgroundColor: "#e9012b",
            borderColor: "#e9012b",
          }}
          onClick={onConfirm}
        >
          Clear Chat
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default React.memo(ClearChatModal);
