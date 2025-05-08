import React from "react";
import { Controller } from "react-hook-form";
import { SelectWithLabel } from "./SelectWithLabel";
import { ErrorMessage } from "./ErrorMessage";

const SelectWithLabelForm = ({
  name,
  label,
  control,
  options = [],
  placeholder = "Select an option",
  rules = {},
  className = "",
  disabled = false,
  ...rest
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <div className="">
          <SelectWithLabel
            {...field}
            label={label}
            placeholder={placeholder}
            className={className}
            disabled={disabled}
            options={options}
            error={error?.message}
            {...rest}
          />
          {error && <ErrorMessage message={error?.message} className="mt-1"/>}
        </div>
      )}
    />
  );
};

export default SelectWithLabelForm;
