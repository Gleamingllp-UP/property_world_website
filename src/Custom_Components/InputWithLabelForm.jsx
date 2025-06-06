// import React from "react";
// import { Controller } from "react-hook-form";
// import { ErrorMessage } from "./ErrorMessage";

// export function InputWithLabelForm({
//   control,
//   name,
//   label,
//   rules,
//   type = "text",
//   placeholder = "",
//   ...rest
// }) {
//   return (
//     <div className="form_gp">
//       {label && <span>{label}</span>}
//       <Controller
//         name={name}
//         control={control}
//         rules={rules}
//         render={({
//           field: { onChange, onBlur, value, ref },
//           fieldState: { error },
//         }) => (
//           <>
//             <input
//               type={type}
//               name={name}
//               placeholder={placeholder}
//               onChange={onChange}
//               onBlur={onBlur}
//               ref={ref}
//               value={value ?? ""}
//               {...rest}
//             />
//             {error && <ErrorMessage message={error?.message} />}
//           </>
//         )}
//       />
//     </div>
//   );
// }

import React from "react";
import { Controller } from "react-hook-form";
import { ErrorMessage } from "./ErrorMessage";
import { ImageIcon } from "lucide-react";

export function InputWithLabelForm({
  control,
  name,
  label,
  rules,
  type = "text",
  placeholder = "",
  leftIcon,
  rightIcon,
  accept="image/*",
  previewUrl,
  className = "",
  ...rest
}) {
  const paddingLeft = leftIcon ? "3rem" : "0.75rem";
  const paddingRight = rightIcon || previewUrl ? "3rem" : "0.75rem";

  return (
    <div className={`form_gp ${className}`}>
      {label && <span>{label}</span>}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({
          field: { onChange, onBlur, value, ref },
          fieldState: { error },
        }) => (
          <div className="">
            {/* Left Icon */}
            {leftIcon && (
              <div
                className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted"
                style={{ pointerEvents: "none" }}
              >
                {leftIcon}
              </div>
            )}

            {/* Input */}
            <input
              id={name}
              type={type}
              name={name}
              placeholder={placeholder}
              // className={`form-control ${error ? "is-invalid" : ""}`}
              onChange={(e) =>
                type === "file" ? onChange(e.target.files) : onChange(e)
              }
              onBlur={onBlur}
              ref={ref}
              accept={accept}
              value={type === "file" ? undefined : value ?? ""}
              style={{ paddingLeft, paddingRight }}
              {...rest}
            />

            {/* Right Icon or Preview */}
            {previewUrl && type === "file" ? (
              <a
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="position-absolute top-50 end-0 translate-middle-y pe-3 text-success"
                title="Preview Image"
              >
                <ImageIcon size={20} strokeWidth={2.2} />
              </a>
            ) : (
              rightIcon && (
                <div
                  className="position-absolute top-50 end-0 translate-middle-y pe-3 text-muted"
                  style={{ cursor: "pointer" }}
                >
                  {rightIcon}
                </div>
              )
            )}

            {/* Error */}
            {error && <ErrorMessage message={error.message} />}
          </div>
        )}
      />
    </div>
  );
}
