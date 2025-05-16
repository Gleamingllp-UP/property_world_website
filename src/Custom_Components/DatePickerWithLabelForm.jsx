import React from "react";
import { Controller } from "react-hook-form";
import { subYears } from "date-fns";
import DatePicker from "react-datepicker";
import { ErrorMessage } from "./ErrorMessage";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar1Icon } from "lucide-react";

export function DatePickerWithLabelForm({
  control,
  name,
  label,
  rules = {},
  placeholder = "MM/DD/YYYY",
  minAge = 18,
  ...rest
}) {
  const todayMinusMinAge = subYears(new Date(), minAge);

  return (
    <div className="form_gp">
      {label && <span>{label}</span>}

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
          <>
            <DatePicker
              selected={value}
              onChange={onChange}
              onBlur={onBlur}
              ref={ref}
              placeholderText={placeholder}
              dateFormat="MM/dd/yyyy"
              maxDate={todayMinusMinAge}
              minDate={new Date("1900-01-01")}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              className={`custom-datepicker`}
              wrapperClassName="w-100"
              {...rest}
            />
              <Calendar1Icon className="calendar_icon" size={16} />

            {error && <ErrorMessage message={error.message} />}
          </>
        )}
      />
    </div>
  );
}
