import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface GiftFilterProps {
  filter: string;
  setFilter: (filter: string) => void;
}

const GiftFilter: React.FC<GiftFilterProps> = ({ filter, setFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const filterOptions = [
    "All Gifts",
    "Reserved",
    "Pending",
    "Assigned",
    "Unassigned",
    "Bought",
  ];

  return (
    <div className="relative inline-block text-left mb-4">
      <div>
        <button
          type="button"
          className="inline-flex justify-between items-center w-40 rounded-md border border-gray-200 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          {filter}
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {filterOptions.map((option) => (
              <a
                key={option}
                href="#"
                className={`${
                  filter === option
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-700"
                } block px-4 py-2 text-sm hover:bg-gray-50`}
                onClick={(e) => {
                  e.preventDefault();
                  setFilter(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GiftFilter;
