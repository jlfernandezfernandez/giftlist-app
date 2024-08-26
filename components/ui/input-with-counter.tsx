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
    <div className="relative">
      <Input
        id={id}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className="pr-12"
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 bg-white px-1">
        {value.length}/{maxLength}
      </span>
    </div>
  );
};
