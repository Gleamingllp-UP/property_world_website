export const getValidationRules = ({
  label,
  type = "text",
  required = true,
  imageURL,
  filetype = "image",
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
          /^(?! )[A-Za-z0-9.,:;!+?'"()[\]_\-&]+(?: [A-Za-z0-9.,:;!+?'"()[\]_\-&]+)*$/,
        message: `${cleanLabel} contains invalid characters or spacing.`,
      };
      rules.minLength = {
        value: 5,
        message: `${cleanLabel} must be at least 5 characters long.`,
      };
      rules.maxLength = {
        value: 300,
        message: `${cleanLabel} must be at most 300 characters long.`,
      };
      break;
    case "shortDescription":
      rules.minLength = {
        value: 20,
        message: `${cleanLabel} must be at least 20 characters long.`,
      };
      rules.maxLength = {
        value: 200,
        message: `${cleanLabel} must be at most 200 characters long.`,
      };
      rules.pattern = {
        value: /^[A-Za-z0-9.,:;!+?'"()[\]_\-& ]+$/,
        message: `${cleanLabel} contains invalid characters.`,
      };
      break;

    case "longDescription":
      rules.minLength = {
        value: 50,
        message: `${cleanLabel} must be at least 50 characters long.`,
      };
      rules.maxLength = {
        value: 1000,
        message: `${cleanLabel} must be at most 1000 characters long.`,
      };
      rules.pattern = {
        value: /^[\s\S]*$/,
        message: `${cleanLabel} contains invalid characters.`,
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
        acceptedFormats: (fileList) => {
          console.log("fileList", fileList);

          const allowedMimeTypes = {
            image: [
              "image/jpeg",
              "image/png",
              "image/webp",
              "image/gif",
              "image/svg+xml",
              "image/bmp",
              "image/tiff",
            ],
            pdf: ["application/pdf"],
            video: [
              "video/mp4",
              "video/webm",
              "video/ogg",
              "video/quicktime", // .mov
              "video/x-msvideo", // .avi
              "video/x-matroska", // .mkv
            ],
          };

          const expectedTypes = Array.isArray(filetype) ? filetype : [filetype];

          // Combine allowed MIME types from all expected types
          const allowedTypes = expectedTypes.flatMap(
            (type) => allowedMimeTypes[type] || []
          );

          if (imageURL) {
            const result = validateUrl(imageURL);
            return result === true ? true : result;
          }

          if (fileList && fileList?.length > 0) {
            const invalidFiles = Array.from(fileList).filter(
              (file) => !allowedTypes.includes(file.type)
            );
            if (invalidFiles?.length > 0) {
              const typesStr = expectedTypes
                .map((t) => t.toUpperCase())
                .join(", ");
              return `${cleanLabel} contains invalid ${typesStr} file(s)`;
            }
            return true;
          }

          return `${cleanLabel} is required`;
        },

        maxSize: (fileList) => {
          const maxSizeInMB = 20;

          if (fileList && fileList?.length > 0) {
            const oversizedFiles = Array.from(fileList).filter(
              (file) => file.size > maxSizeInMB * 1024 * 1024
            );

            return oversizedFiles.length === 0
              ? true
              : `${cleanLabel} must be smaller than ${maxSizeInMB}MB per file`;
          }

          if (imageURL) {
            const result = validateUrl(imageURL);
            return result === true ? true : result;
          }

          return `${cleanLabel} is required`;
        },

        fileCount: (fileList) => {
          const minFiles = 1;
          const maxFiles = 5;
          if (imageURL) {
            return true;
          }
          // Make sure it's an actual FileList or array-like object
          const length = fileList?.length ?? 0;

          if (length === 0)
            return `${cleanLabel} requires at least ${minFiles} file(s)`;
          if (length < minFiles)
            return `${cleanLabel} requires at least ${minFiles} file(s)`;
          if (length > maxFiles)
            return `${cleanLabel} cannot have more than ${maxFiles} file(s)`;

          return true;
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
