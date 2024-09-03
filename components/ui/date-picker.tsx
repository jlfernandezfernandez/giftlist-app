// components/ui/date-picker.tsx
import React, { useState, useEffect } from "react";
import { format, parse, isValid, isBefore, startOfDay } from "date-fns";
import { Input } from "./input";
import { XCircleIcon } from "lucide-react";

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
  className?: string;
  minDate?: Date;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = "dd/MM/yyyy",
  className = "",
  minDate = startOfDay(new Date()),
}) => {
  const [inputValue, setInputValue] = useState(
    value ? format(new Date(value), "dd/MM/yyyy") : ""
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (value) {
      setInputValue(format(new Date(value), "dd/MM/yyyy"));
      setError(null);
    } else {
      setInputValue("");
      setError(null);
    }
  }, [value]);

  const formatInputValue = (input: string) => {
    const numbers = input.replace(/[^\d]/g, "");
    let formatted = "";
    if (numbers.length > 0) formatted += numbers.substr(0, 2);
    if (numbers.length > 2) formatted += "/" + numbers.substr(2, 2);
    if (numbers.length > 4) formatted += "/" + numbers.substr(4, 4);
    return formatted;
  };

  const validateDate = (dateString: string): string | null => {
    if (dateString.length === 0) return null;

    const [day, month, year] = dateString.split("/").map(Number);

    if (day && (day < 1 || day > 31)) return "Invalid day";
    if (month && (month < 1 || month > 12)) return "Invalid month";

    if (dateString.length === 10) {
      const parsedDate = parse(dateString, "dd/MM/yyyy", new Date());
      if (!isValid(parsedDate)) return "Invalid date";
      if (isBefore(parsedDate, minDate)) return "Date cannot be in the past";
      if (year < minDate.getFullYear() || year > 9999) return "Invalid year";
    }

    return null;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const formatted = formatInputValue(newValue);
    setInputValue(formatted);

    const validationError = validateDate(formatted);
    setError(validationError);

    if (formatted.length === 10 && !validationError) {
      const parsedDate = parse(formatted, "dd/MM/yyyy", new Date());
      onChange(format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss"));
    } else {
      onChange("");
    }
  };

  const handleClearDate = () => {
    setInputValue("");
    setError(null);
    onChange("");
  };

  return (
    <div className="space-y-1">
      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={className}
        maxLength={10}
        labelRight={
          inputValue && (
            <button
              type="button"
              onClick={handleClearDate}
              className="text-gray-400 hover:text-gray-600"
            >
              <XCircleIcon className="h-5 w-5" />
            </button>
          )
        }
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
