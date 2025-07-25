import React from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const ClearChatModal = ({ show, onHide, onConfirm, loading }) => {
  const { t } = useTranslation();
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      contentClassName="custom-modal-content"
    >
      <Modal.Header closeButton className="py-2">
        <div className="fw-semibold text-muted">{t("clear_chat")}</div>
      </Modal.Header>

      <Modal.Body>
        <p>{t("clear_chat_confirmation")}</p>
        <p className="text-muted small">{t("clear_chat_warning")}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {t("cancel")}
        </Button>
        <Button
          style={{
            backgroundColor: "#e9012b",
            borderColor: "#e9012b",
          }}
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? (
            <Spinner animation="border" size="sm" className="me-2" />
          ) : (
            t("clear_chat")
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default React.memo(ClearChatModal);
