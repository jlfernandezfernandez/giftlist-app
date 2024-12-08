import { useState, useEffect, useMemo } from "react";
import { Gift } from "@/types/gift";

export const useSearchGifts = (gifts: Gift[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(
      () => setDebouncedTerm(searchTerm.toLowerCase()),
      300
    );
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const searchedGifts = useMemo(
    () =>
      gifts.filter(
        (gift) =>
          gift.name?.toLowerCase().includes(debouncedTerm) ||
          gift.description?.toLowerCase().includes(debouncedTerm) ||
          gift.website?.toLowerCase().includes(debouncedTerm)
      ),
    [gifts, debouncedTerm]
  );

  return { searchTerm, setSearchTerm, searchedGifts };
};
