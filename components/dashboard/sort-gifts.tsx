//components/dashboard/sort-gift.tsx
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortOption = "name" | "price" | "state" | "default";

interface SortGiftsProps {
  sortBy: SortOption;
  setSortBy: (value: SortOption) => void;
}

export const SortGifts: React.FC<SortGiftsProps> = ({ sortBy, setSortBy }) => {
  return (
    <div className="flex items-center space-x-2">
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Select a sort option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Default</SelectItem>
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="price">Price</SelectItem>
          <SelectItem value="state">State</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
