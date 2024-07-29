// components/ui/input.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  labelRight?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, labelRight, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);

    return (
      <div
        className={cn(
          "relative flex w-full",
          isFocused && "ring-2 ring-blue-200 rounded-md"
        )}
      >
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            isFocused && "border-blue-500",
            labelRight && "rounded-r-none border-r-0",
            className
          )}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {labelRight && (
          <div
            className={cn(
              "inline-flex items-center px-3 rounded-r-md border border-l-0 border-input bg-background text-sm",
              isFocused && "border-blue-500"
            )}
          >
            {labelRight}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
