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
          "relative flex w-full rounded-md",
          isFocused && "ring-2 ring-gray-300"
        )}
      >
        {labelLeft && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
            {labelLeft}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            labelLeft && "pl-10",
            labelRight && "pr-10",
            className
          )}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {labelRight && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
            {labelRight}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
