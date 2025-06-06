import React from "react";
import { Controller } from "react-hook-form";
import { ErrorMessage } from "./ErrorMessage";

export function TextAreaWithLabelForm({
  control,
  name,
  label,
  rules,
  placeholder = "",
  rows = 4,
  className = "",
  ...rest
}) {
  return (
    <div className={`form_gp ${className}`}>
      {label && <span>{label}</span>}

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
          <>
            <textarea
              id={name}
              name={name}
              placeholder={placeholder}
              onChange={onChange}
              onBlur={onBlur}
              ref={ref}
              value={value ?? ""}
              rows={rows}
              style={{ padding: "0.75rem" }} // same as input padding
              {...rest}
            />
            {error && <ErrorMessage message={error.message} />}
          </>
        )}
      />
    </div>
  );
}
