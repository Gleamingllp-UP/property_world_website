export const getValidationRules = ({
  label,
  type = "text",
  required = true,
  imageURL,
}) => {
  const rules = {};
  const cleanLabel = label?.replace(/\*/g, "").trim();

  if (required) {
    rules.required = `${cleanLabel} is required`;
  }

  switch (type) {
    case "text":
      rules.pattern = {
        value: /^[A-Za-z\s'-]+$/,
        message: `${cleanLabel} must contain only letters`,
      };
      break;

    case "text2":
      rules.pattern = {
        value: /^[A-Za-z0-9\s\-.,/&]+$/,
        message: `${cleanLabel} contains invalid characters`,
      };
      break;

    case "title":
      rules.pattern = {
        value:
          /^(?! )[A-Za-z0-9.,:;!?'"()[\]_\-&]+(?: [A-Za-z0-9.,:;!?'"()[\]_\-&]+)*$/,
        message: `${cleanLabel} contains invalid characters or spacing.`,
      };
      rules.minLength = {
        value: 5,
        message: `${cleanLabel} must be at least 5 characters long.`,
      };
      rules.maxLength = {
        value: 300,
        message: `${cleanLabel} must be at most 100 characters long.`,
      };
      break;

    case "email":
      rules.pattern = {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Enter a valid email address",
      };
      break;

    case "number":
      rules.pattern = {
        value: /^\d+$/,
        message: `${cleanLabel} must be a valid number`,
      };
      break;

    case "password":
      rules.pattern = {
        value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/,
        message: `${cleanLabel} must be a valid number`,
      };
      break;

    case "date":
      rules.pattern = {
        value: /^\d{4}-\d{2}-\d{2}$/,
        message: `${cleanLabel} must be in YYYY-MM-DD format`,
      };
      break;

    case "phone":
      rules.pattern = {
        value: /^\+?\d{7,15}$/,
        message: "Enter a valid phone number",
      };
      break;

    case "file":
      rules.validate = {
        // Validate file type

        acceptedFormats: (fileList) => {
          console.log("fileList", fileList);
          console.log("imageURL", imageURL);

          const allowedTypes = [
            // Images
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
            "image/svg+xml",
            "image/bmp",
            "image/tiff",

            // PDF
            "application/pdf",

            // Videos
            "video/mp4",
            "video/webm",
            "video/ogg",
            "video/quicktime", // .mov
            "video/x-msvideo", // .avi
            "video/x-matroska", // .mkv
          ];

          if (fileList?.[0]?.type) {
            return allowedTypes.includes(fileList[0].type)
              ? true
              : `${cleanLabel} must be a JPG, PNG, or PDF`;
          }

          if (imageURL) {
            const result = validateUrl(imageURL);
            return result === true ? true : result;
          }

          return `${cleanLabel} is required`;
        },

        maxSize: (fileList) => {
          const maxSizeInMB = 50;

          if (fileList?.[0]?.size) {
            return fileList[0].size <= maxSizeInMB * 1024 * 1024
              ? true
              : `${cleanLabel} must be smaller than ${maxSizeInMB}MB`;
          }

          if (imageURL) {
            const result = validateUrl(imageURL);
            return result === true ? true : result;
          }

          return `${cleanLabel} is required`;
        },
      };
      break;

    case "richtext":
      rules.validate = {
        notEmpty: (value) => {
          // Remove all HTML tags and check if content is empty
          const text = value?.replace(/<[^>]+>/g, "").trim();
          return text.length > 0 || `${cleanLabel} is required`;
        },
      };
      break;

    default:
      break;
  }

  return rules;
};

export const getFieldType = (key) => {
  if (key.includes("email")) return "email";
  if (key.includes("phone") || key.includes("number")) return "phone";
  if (key === "dob") return "date";
  if (key === "country_code") return "number";
  return "text";
};

const validateUrl = (url) => {
  const regex = /\.(jpe?g|png|pdf)$/i;
  return regex.test(url)
    ? true
    : "Uploaded link must end with .png, .jpg, or .pdf";
};
