export const buildFormDataFromFields = (data, requiredFields) => {
  const formData = new FormData();

  requiredFields?.forEach((field) => {
    const key = field.key;
    const value = data[key];

    if (!value) return;

    const isFileInput =
      value instanceof FileList ||
      (Array.isArray(value) && value[0] instanceof File);

    if (isFileInput) {
      if (field.multiple) {
        Array.from(value).forEach((file, idx) => {
          formData.append(`${key}[${idx}]`, file);
        });
      } else {
        formData.append(key, value[0]);
      }
    } else if (Array.isArray(value)) {
      formData.append(key, JSON.stringify(value));
    } else if (typeof value === "object") {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, value);
    }
  });

  return formData;
};
