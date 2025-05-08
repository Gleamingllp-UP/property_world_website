import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export function SelectWithLabel({
  label,
  id,
  name,
  placeholder = "Select",
  value,
  options = [],
  className,
  onChange,
  leftIcon,
  rightIcon,
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
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {rightIcon}
          </div>
        )}
        <Select
          onValueChange={onChange}
          value={value}
          name={name}
          {...rest}
          
        >
          <SelectTrigger
            id={id || name}
            className={cn(
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className
            )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options?.map((option) => (
              <SelectItem value={option.value} key={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
