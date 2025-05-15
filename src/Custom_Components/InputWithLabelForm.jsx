import React from "react";
import { Controller } from "react-hook-form";
import { ErrorMessage } from "./ErrorMessage";

export function InputWithLabelForm({
  control,
  name,
  label,
  rules,
  type = "text",
  placeholder = "",
  ...rest
}) {
  return (
    <div className="form_gp">
      {label && <span>{label}</span>}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({
          field: { onChange, onBlur, value, ref },
          fieldState: { error },
        }) => (
          <>
            <input
              type={type}
              name={name}
              placeholder={placeholder}
              onChange={onChange}
              onBlur={onBlur}
              ref={ref}
              value={value ?? ""}
              {...rest}
            />
            {error && <ErrorMessage message={error?.message} />}
          </>
        )}
      />
    </div>
  );
}
