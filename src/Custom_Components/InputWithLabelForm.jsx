import React from "react";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { BiImage } from "react-icons/bi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ErrorMessage } from "./ErrorMessage";

export function InputWithLabelForm({
  control,
  name,
  label,
  rules,
  type = "text",
  placeholder = "",
  className,
  leftIcon,
  rightIcon,
  previewUrl,
  ...rest
}) {
  return (
    <div className="grid w-full items-start gap-1.5">
      {label && <Label htmlFor={name}>{label}</Label>}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({
          field: { onChange, onBlur, value, ref },
          fieldState: { error },
        }) => (
          <>
            <div className="relative space-y-1">
              {leftIcon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {leftIcon}
                </div>
              )}

              {previewUrl && type === "file" ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href={previewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      >
                        <BiImage className="h-5 w-5 text-green-400" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      className="bg-blue-500 text-white fill-blue-500"
                    >
                      <p>Preview Image</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                rightIcon && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {rightIcon}
                  </div>
                )
              )}

              <Input
                id={name}
                type={type}
                placeholder={placeholder}
                className={cn(
                  leftIcon && "pl-10",
                  (rightIcon || previewUrl) && "pr-10",
                  className
                )}
                onChange={(e) =>
                  type === "file" ? onChange(e.target.files) : onChange(e)
                }
                onBlur={onBlur}
                ref={ref}
                {...(type !== "file" && { value: value ?? "" })}
                {...rest}
              />
            </div>
            {error && (
              <ErrorMessage className="mt-1" message={error?.message} />
            )}
          </>
        )}
      />
    </div>
  );
}
