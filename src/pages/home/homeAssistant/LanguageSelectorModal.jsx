import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { code: "en", label: "🇺🇸 English" },
  { code: "ar", label: "🇸🇦 العربية" },
  { code: "ru", label: "🇷🇺 Русский" },
  { code: "zh", label: "🇨🇳 中文" },
  { code: "de", label: "🇩🇪 Deutsch" },
  { code: "hi", label: "🇮🇳 हिंदी" },
];

function LanguageSelectorModal({
  show,
  onSelect,
  sessionId,
  socket,
}) {
  const { t, i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(i18n?.language);
  const [loading, setLoading] = useState(false);

  // Update RTL/LTR dynamically
  useEffect(() => {
    document.documentElement.dir = selectedLang === "ar" ? "rtl" : "ltr";
  }, [selectedLang]);

  const handleLanguageChange = (e) => {
    setSelectedLang(e.target.value);
  };

  const handleContinue = () => {
    setLoading(true);
    socket.emit(
      "chat:language:select",
      { sessionId, language: selectedLang },
      (res) => {
        setLoading(false);
        if (res.success) {
          i18n.changeLanguage(selectedLang); // Update UI language
          onSelect(res.language);
        } else {
          alert(
            t("language_select_error") ||
              "❌ Failed to set language. Try again."
          );
        }
      }
    );
  };

  return (
    <Modal
      show={show}
      centered
      backdrop="static"
      keyboard={false}
      dialogClassName="language-modal"
      contentClassName="custom-modal-content-language "
    >
      <Modal.Header className="border-0 justify-content-center">
        <Modal.Title className="fw-semibold text-primary">
          {t("choose_language") || "Choose Your Language"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="text-center px-4">
        <p className="text-muted mb-4">
          {t("language_prompt") ||
            "What language would you like to continue in?"}
        </p>

        <Form.Select
          className="mb-4 shadow-sm rounded-3 border-primary"
          value={selectedLang}
          onChange={handleLanguageChange}
        >
          {LANGUAGES.map((lang) => (
            <option key={lang?.code} value={lang?.code}>
              {lang?.label}
            </option>
          ))}
        </Form.Select>

        <Button
          variant="primary"
          className="w-100 rounded-pill shadow-sm"
          onClick={handleContinue}
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />{" "}
              {t("loading") || "Loading..."}
            </>
          ) : (
            t("continue") || "Continue"
          )}
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default React.memo(LanguageSelectorModal);
