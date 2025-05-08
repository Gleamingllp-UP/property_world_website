import React, { useMemo, useRef } from "react";
import { Controller } from "react-hook-form";
import JoditEditor from "jodit-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ErrorMessage } from "../ErrorMessage";

export function RichTextEditor({
  name,
  control,
  label,
  rules,
  placeholder = "Start typing...",
  className,
  required = false,
  ...rest
}) {
  const editor = useRef(null);

  const config = useMemo(() => ({
    readonly: false,
    placeholder,
    toolbarSticky: false,
    ...rest
  }), [placeholder, rest]);

  return (
    <div className="grid w-full items-start gap-1.5">
      {label && <Label htmlFor={name}>{label}</Label>}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
          <div className="space-y-1">
            <JoditEditor
              ref={editor}
              value={value}
              config={config}
              tabIndex={1}
              onBlur={(newContent) => onChange(newContent)}
              onChange={(newContent) => onChange(newContent)}
            />
            {error && (
              <ErrorMessage className="text-sm text-red-500">{error?.message}</ErrorMessage>
            )}
          </div>
        )}
      />
    </div>
  );
}
