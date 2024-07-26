// components/ui/animated-input.tsx
import React, { useState, useEffect } from "react";
import { Input, InputProps } from "./input";

interface AnimatedInputProps extends Omit<InputProps, "placeholder"> {
  placeholders: string[];
  animationSpeed?: number;
  delayBetweenAnimations?: number;
}

export function AnimatedInput({
  placeholders,
  animationSpeed = 100,
  delayBetweenAnimations = 1000,
  ...props
}: AnimatedInputProps) {
  const [placeholder, setPlaceholder] = useState("");

  useEffect(() => {
    let index = 0;
    let isDeleting = false;
    let text = "";

    const interval = setInterval(() => {
      if (!isDeleting) {
        text = placeholders[index].substring(0, text.length + 1);
        setPlaceholder(text);

        if (text === placeholders[index]) {
          isDeleting = true;
          setTimeout(() => {
            isDeleting = true;
          }, delayBetweenAnimations);
        }
      } else {
        text = placeholders[index].substring(0, text.length - 1);
        setPlaceholder(text);

        if (text === "") {
          isDeleting = false;
          index = (index + 1) % placeholders.length;
        }
      }
    }, animationSpeed);

    return () => clearInterval(interval);
  }, [placeholders, animationSpeed, delayBetweenAnimations]);

  return <Input {...props} placeholder={placeholder} />;
}
