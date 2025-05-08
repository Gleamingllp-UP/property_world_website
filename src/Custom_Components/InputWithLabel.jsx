import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils"; // Utility to join class names conditionally
import { BiImage } from "react-icons/bi";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function InputWithLabel({
  label,
  id,
  name,
  type = "text",
  placeholder = "",
  value,
  className,
  onKeyDown,
  onChange,
  min,
  max,
  maxLength,
  required = false,
  leftIcon,
  rightIcon,
  previewUrl,
  ...rest
}) {
  return (
    <div className="grid w-full items-start gap-1.5">
      {label && <Label htmlFor={id || name}>{label}</Label>}
      <div className="relative">
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
          id={id || name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          required={required}
          min={min}
          max={max}
          maxLength={maxLength}
          className={cn(leftIcon && "pl-10", rightIcon && "pr-10", className)}
          {...rest}
        />
      </div>
    </div>
  );
}
