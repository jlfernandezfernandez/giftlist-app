import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterOption } from "@/hooks/use-filtered-gifts";

interface GiftFilterProps {
  filter: FilterOption;
  setFilter: (filter: FilterOption) => void;
}

export default function GiftFilter({ filter, setFilter }: GiftFilterProps) {
  const filterOptions = [
    "All Gifts",
    "Reserved",
    "Pending",
    "Assigned",
    "Unassigned",
    "Bought",
  ];

  return (
    <div className="flex items-center space-x-2">
      <Select value={filter} onValueChange={setFilter}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Select a filter" />
        </SelectTrigger>
        <SelectContent>
          {filterOptions.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
