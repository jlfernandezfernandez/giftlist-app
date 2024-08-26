// components/ui/input.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  labelRight?: React.ReactNode;
  labelLeft?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, labelRight, labelLeft, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);

    return (
      <div
        className={cn(
          "relative flex w-full",
          isFocused && "ring-2 ring-gray-300 rounded-md"
        )}
      >
        {labelLeft && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            {labelLeft}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
            labelLeft && "pl-10",
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
              "inline-flex items-center px-3 rounded-r-md border border-l-0 border-input bg-white text-sm",
              isFocused && "border-transparent ring-2 ring-gray-300"
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
