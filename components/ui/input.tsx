import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  labelRight?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, labelRight, ...props }, ref) => {
    return (
      <div className="relative flex w-full">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            labelRight && "rounded-r-none",
            className
          )}
          ref={ref}
          {...props}
        />
        {labelRight && (
          <span className="inline-flex items-center px-4 rounded-r-md border border-l-0 border-input bg-gray-100 text-gray-500 text-sm">
            {labelRight}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
