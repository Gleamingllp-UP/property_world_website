import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { code: "en", label: "🇺🇸 English" },
  { code: "ar", label: "🇸🇦 العربية" },
  { code: "ru", label: "🇷🇺 Русский" },
  { code: "zh", label: "🇨🇳 中文" },
  { code: "de", label: "🇩🇪 Deutsch" },
  { code: "hi", label: "🇮🇳 हिंदी" },
];

const LanguageDropdown = ({ onChange, socket, sessionId }) => {
  const { i18n, t } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(i18n.language || "en");

  const handleLanguageChange = (lng) => {
    setSelectedLang(lng);
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
    socket.emit("chat:language:select", { sessionId, language: lng }, (res) => {
      if (res.success) {
        i18n.changeLanguage(res.language);
        document.documentElement.dir = res.language === "ar" ? "rtl" : "ltr";

        onChange(res.language);
      } else {
        alert(
          t("language_select_error") || "❌ Failed to set language. Try again."
        );
      }
    });
  };

  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="light"
        size="sm"
        id="language-dropdown"
        className="language-toggle"
      >
        🌐 {LANGUAGES.find((l) => l.code === selectedLang)?.label || "Language"}
      </Dropdown.Toggle>

      <Dropdown.Menu className="language-menu shadow">
        {LANGUAGES.map((lang) => (
          <Dropdown.Item
            key={lang.code}
            active={lang.code === selectedLang}
            onClick={() => handleLanguageChange(lang.code)}
            className="language-item"
          >
            {lang.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default React.memo(LanguageDropdown);
