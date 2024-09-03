import React from "react";
import { Input } from "@/components/ui/input";

interface InputWithCounterProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength: number;
}

export const InputWithCounter: React.FC<InputWithCounterProps> = ({
  id,
  value,
  onChange,
  maxLength,
}) => {
  return (
    <Input
      id={id}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      labelRight={
        <span className="text-xs text-gray-400">
          {value.length}/{maxLength}
        </span>
      }
    />
  );
};
