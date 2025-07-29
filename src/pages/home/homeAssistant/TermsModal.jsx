import React, { useCallback, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "./PropBotGPTModal.css";
import DOMPurify from "dompurify";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getBotContentTypeThunk } from "../../../features/policy/policySlice";

const TermsModal = ({ show, onClose }) => {
  const { t, i18n } = useTranslation();

  const { botContent, isLoading } = useSelector((store) => store?.policy);

  const dispatch = useDispatch();

  const getBotContent = useCallback(() => {
    dispatch(getBotContentTypeThunk({ type: "bot_terms" }));
  }, [dispatch]);

  useEffect(() => {
    if (!show) return;
    getBotContent();
  }, [getBotContent, show]);

  console.log(
    "botContent",
    i18n?.language,
    botContent?.content?.[i18n?.language]
  );
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
        {isLoading ? (
          <div className="w-100">
            {/* Category Badge */}
            {Array.from({ length: 8 }).map((_, i) => {
              return (
                <div
                  key={i}
                  className="placeholder-glow mb-2 d-flex justify-content-between align-items-center"
                >
                  <span
                    className="w-100 placeholder bg-secondary-subtle rounded d-inline-block"
                    style={{ height: "18px" }}
                  ></span>
                </div>
              );
            })}
          </div>
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(botContent?.content?.[i18n?.language]),
            }}
          />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default TermsModal;
