import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./PropBotGPTModal.css"; // <-- Add this CSS file

const TermsModal = ({ show, onClose }) => {
  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      contentClassName="custom-modal-content"
    >
      <Modal.Header closeButton className="py-2">
            <div className="fw-semibold text-muted">PropBotGPT Terms</div>

      </Modal.Header>

      <Modal.Body className="terms-body">
        <p>
          Please note that <strong>PropBotGPT</strong> is an artificial intelligence tool created for general informational purposes only. The responses provided by PropBotGPT are based on:
        </p>
        <ul>
          <li>The provision of a third-party service</li>
          <li>The programming of PropBotGPT</li>
          <li>Its access to textual data</li>
        </ul>
        <p>
          Therefore, responses should not be taken as professional advice or as a substitute for consulting a qualified expert.
        </p>
        <p>
          PropBotGPT may not always provide accurate or complete responses to questions and may occasionally generate inappropriate or incorrect responses due to the nature of the tool.
        </p>
        <p>
          Use of and reliance on PropBotGPT and any responses generated is entirely at the user's risk.
        </p>
        <p>
          <strong>PropBot</strong> is not responsible for any action(s) taken or not taken based on the information provided by PropBotGPT and expressly excludes all liability for any loss or damage arising from its use.
        </p>
      </Modal.Body>

     
    </Modal>
  );
};

export default TermsModal;
