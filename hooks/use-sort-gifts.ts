import { useState, useMemo } from "react";
import { Gift } from "@/types/gift";

type SortOption = "name" | "price" | "state" | "default";

const sortFunctions: Record<SortOption, (a: Gift, b: Gift) => number> = {
  name: (a, b) => (a.name || "").localeCompare(b.name || ""),
  price: (a, b) => (a.price || 0) - (b.price || 0),
  state: (a, b) => (a.state || "").localeCompare(b.state || ""),
  default: () => 0,
};

export const useSortGifts = (gifts: Gift[]) => {
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const sortedGifts = useMemo(
    () => [...gifts].sort(sortFunctions[sortBy]),
    [gifts, sortBy]
  );

  return { sortedGifts, sortBy, setSortBy };
};
