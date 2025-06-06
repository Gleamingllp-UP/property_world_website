import React from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { ErrorMessage } from "./ErrorMessage";

export function MultiSelectWithLabelForm({
  control,
  name,
  label,
  rules,
  options = [],
  placeholder = "Select an option",
}) {
  return (
    <div className="form_gp">
      {label && (
        <span className={`block mb-1 font-medium serv-label`}>{label}</span>
      )}

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <Select
              isMulti
              options={options}
              value={options.filter((opt) => value?.includes(opt.value))}
              onChange={(selected) =>
                onChange(selected.map((item) => item.value))
              }
              placeholder={placeholder || "Select an option"}
              className="react-select-container"
              classNamePrefix="react-select"
              styles={{
                control: (base) => ({
                  ...base,
                  borderColor: error ? "#f87171" : "#d1d5db",
                  padding: "0.25rem",
                  minHeight: "45px",
                  boxShadow: "none",
                }),
              }}
            />
            {error && <ErrorMessage message={error.message} />}
          </>
        )}
      />
    </div>
  );
}
