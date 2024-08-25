import { useState, useMemo } from "react";
import { Gift } from "@/types/gift";

type SortOption = "name" | "price" | "state" | "default";

export const useSortGifts = (gifts: Gift[]) => {
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const sortedGifts = useMemo(() => {
    return [...gifts].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return (a.name || "").localeCompare(b.name || "");
        case "price":
          return (a.price || 0) - (b.price || 0);
        case "state":
          return (a.state || "").localeCompare(b.state || "");
        default:
          return 0;
      }
    });
  }, [gifts, sortBy]);

  return { sortedGifts, sortBy, setSortBy };
};
