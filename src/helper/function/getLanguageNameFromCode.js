function getLanguageNameFromCode(code) {
  const languageMap = {
    en: "English",
    ar: "Arabic",
    hi: "Hindi",
    ru: "Russian",
    zh: "Chinese",
    de: "German",
  };

  return languageMap[code] || "Unknown";
}

export {getLanguageNameFromCode}