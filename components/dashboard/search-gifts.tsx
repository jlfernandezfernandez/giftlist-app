import React from "react";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

interface SearchGiftsProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export const SearchGifts: React.FC<SearchGiftsProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="w-full sm:w-auto">
      <Input
        type="text"
        placeholder="Search gifts"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full"
        labelLeft={<SearchIcon className="w-5 h-5 text-gray-400" />}
      />
    </div>
  );
};
