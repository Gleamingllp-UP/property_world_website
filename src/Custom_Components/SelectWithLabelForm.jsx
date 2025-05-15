import React from "react";
import { Controller } from "react-hook-form";
import { ErrorMessage } from "./ErrorMessage";

export function SelectWithLabelForm({
  control,
  name,
  label,
  rules,
  options = [],
  placeholder = "Select an option",
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
            <select
              name={name}
              onChange={onChange}
              onBlur={onBlur}
              ref={ref}
              value={value ?? ""}
              {...rest}
            >
              <option value="" disabled>
                {placeholder}
              </option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {error && <ErrorMessage message={error?.message} />}
          </>
        )}
      />
    </div>
  );
}
