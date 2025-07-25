import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./PropBotGPTModal.css";
import DOMPurify from "dompurify";
import { useTranslation } from "react-i18next";

const TermsModal = ({ show, onClose }) => {
  const { t } = useTranslation();
  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      contentClassName="custom-modal-content"
    >
      <Modal.Header closeButton className="py-2">
        <div className="fw-semibold text-muted">PropBot {t("terms")}</div>
      </Modal.Header>

      <Modal.Body className="terms-body">
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(t("terms_modal")),
          }}
        />
      </Modal.Body>
    </Modal>
  );
};

export default TermsModal;
