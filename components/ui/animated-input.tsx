// components/ui/animated-input.tsx
import React, { useState, useEffect } from "react";
import { Input, InputProps } from "./input";

interface AnimatedInputProps extends Omit<InputProps, "placeholder"> {
  placeholders: string[];
  delayBetweenPlaceholders?: number;
  maxLength?: number;
}

export function AnimatedInput({
  placeholders,
  delayBetweenPlaceholders = 5000,
  maxLength,
  ...props
}: AnimatedInputProps) {
  const [placeholder, setPlaceholder] = useState(placeholders[0]);

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % placeholders.length;
      setPlaceholder(placeholders[index]);
    }, delayBetweenPlaceholders);

    return () => clearInterval(interval);
  }, [placeholders, delayBetweenPlaceholders]);

  return (
    <div className="relative">
      <Input
        {...props}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`pr-16 ${props.className || ""}`}
      />
      {maxLength && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 bg-background px-1">
          {(props.value as string)?.length || 0}/{maxLength}
        </span>
      )}
    </div>
  );
}
