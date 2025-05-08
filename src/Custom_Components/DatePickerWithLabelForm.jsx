import React from "react";
import { Controller } from "react-hook-form";
import { format, subYears } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { ErrorMessage } from "./ErrorMessage";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const DatePickerWithLabelForm = ({
  name,
  label,
  control,
  minAge,
  rules = {},
  placeholder = "Pick a date",
  className = "",
  disabled = false,
  ...rest
}) => {
  const todayMinusMinAge = subYears(new Date(), minAge);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <div className="">
          <div className="grid w-full items-start gap-1.5">
          {label && (
            <Label >{label}</Label>
          )}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full h-10 pl-3 text-left font-normal rounded-none",
                  !field.value && "text-muted-foreground",
                  className
                )}
                disabled={disabled}
              >
                {field.value ? (
                  format(field.value, "PPP")
                ) : (
                  <span>{placeholder}</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={(date) => {
                  if (date) field.onChange(date);
                }}
                defaultMonth={todayMinusMinAge}
                disabled={(date) =>
                  date > todayMinusMinAge || date < new Date("1900-01-01")
                }
                initialFocus
                {...rest}
              />
            </PopoverContent>
          </Popover>
          </div>
          {error && <ErrorMessage message={error.message} className="mt-1" />}
        </div>
      )}
    />
  );
};

export default DatePickerWithLabelForm;
