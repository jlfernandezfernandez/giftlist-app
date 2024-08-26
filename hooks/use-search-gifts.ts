import { useState, useEffect, useMemo } from "react";
import { Gift } from "@/types/gift";

export const useSearchGifts = (gifts: Gift[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearchTerm(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const searchedGifts = useMemo(() => {
    return gifts.filter(
      (gift) =>
        (gift.name?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ??
          false) ||
        (gift.description
          ?.toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase()) ??
          false) ||
        (gift.website
          ?.toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase()) ??
          false)
    );
  }, [gifts, debouncedSearchTerm]);

  return { searchTerm, setSearchTerm, searchedGifts };
};
