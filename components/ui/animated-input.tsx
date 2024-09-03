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
    <Input
      {...props}
      placeholder={placeholder}
      maxLength={maxLength}
      labelRight={
        maxLength && (
          <span className="text-xs text-gray-400">
            {(props.value as string)?.length || 0}/{maxLength}
          </span>
        )
      }
    />
  );
}
