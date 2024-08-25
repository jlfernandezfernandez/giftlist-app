import { useMemo } from "react";
import { Gift } from "@/types/gift";

interface UseFilteredGiftsProps {
  gifts: Gift[];
  filter: string;
}

export function useFilteredGifts({ gifts, filter }: UseFilteredGiftsProps) {
  const filteredGifts = useMemo(() => {
    return gifts.filter((gift: Gift) => {
      switch (filter) {
        case "Reserved":
          return gift.state === "reserved";
        case "Pending":
          return gift.state === "pending";
        case "Assigned":
          return gift.assignedUsers && gift.assignedUsers.length > 0;
        case "Unassigned":
          return !gift.assignedUsers || gift.assignedUsers.length === 0;
        case "Bought":
          return gift.state === "bought";
        default:
          return true;
      }
    });
  }, [gifts, filter]);

  return filteredGifts;
}
