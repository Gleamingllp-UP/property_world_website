import React from "react";
import { Controller } from "react-hook-form";
import { ErrorMessage } from "./ErrorMessage";

export function CheckboxWithLabelForm({
  name,
  control,
  label,
  rules,
  ...rest
}) {
  return (
    <div className="form_gp">
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <>
            <div className="checkbox_wrapper">
              <input
                type="checkbox"
                id={name}
                checked={value || false}
                onChange={(e) => onChange(e.target.checked)}
                {...rest}
              />
              <label htmlFor={name}>{label}</label>
            </div>
            {error && <ErrorMessage message={error.message} />}
          </>
        )}
      />
    </div>
  );
}
