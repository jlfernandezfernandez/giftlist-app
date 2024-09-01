// components/ui/price-input.tsx
import React, { useState, useRef, useEffect } from "react";
import { currencySymbol } from "@/lib/gift-utils";

interface PriceInputProps {
  value: string;
  currency: string;
  onChange: (value: string, currency: string) => void;
}

const CURRENCIES = ["EUR", "USD", "GBP"];

interface PriceInputProps {
  value: string;
  currency: string;
  onChange: (value: string, currency: string) => void;
}

export const PriceInput: React.FC<PriceInputProps> = ({
  value,
  currency,
  onChange,
}) => {
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value, currency);
  };

  const handleCurrencyChange = (newCurrency: string) => {
    onChange(value, newCurrency);
    setShowCurrencyDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowCurrencyDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <div
        className={`flex rounded-md border ${
          isFocused ? "border-gray-300 ring-2 ring-gray-300" : ""
        } overflow-hidden`}
      >
        <input
          type="number"
          value={value}
          onChange={handlePriceChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-grow px-3 py-2 bg-white focus:outline-none"
          step="0.01"
        />
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
          className={`px-3 bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors duration-150 ${
            isFocused ? "bg-gray-200" : ""
          }`}
        >
          {currencySymbol(currency)}
        </button>
      </div>
      {showCurrencyDropdown && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-1 w-12 bg-white border border-gray-200 rounded-md shadow-lg z-10 overflow-hidden"
          style={{ top: "100%" }}
        >
          {CURRENCIES.map((curr) => (
            <button
              key={curr}
              type="button"
              className="block w-full text-center py-2 hover:bg-gray-100 transition-colors duration-150"
              onClick={() => handleCurrencyChange(curr)}
            >
              {currencySymbol(curr)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
