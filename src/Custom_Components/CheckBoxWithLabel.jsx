"use client";

import { Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { ErrorMessage } from "./ErrorMessage";

const CheckboxWithLabelForm = ({
  name,
  label,
  control,
  rules = {},
  className = "",
  disabled = false,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({
        field: { value, onChange, ...field },
        fieldState: { error },
      }) => (
        <div className="flex flex-col space-y-1">
          <div className="flex items-center space-x-2">
            <Checkbox
              id={name}
              checked={value}
              onCheckedChange={onChange}
              disabled={disabled}
              {...field}
              className={className}
            />
            <label
              htmlFor={name}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
            </label>
          </div>
          {error && <ErrorMessage className="mt-1" message={error?.message} />}
        </div>
      )}
    />
  );
};

export default CheckboxWithLabelForm;
