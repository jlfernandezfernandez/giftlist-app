import { useMemo } from "react";
import { Gift } from "@/types/gift";

export type FilterOption =
  | "Reserved"
  | "Pending"
  | "Assigned"
  | "Unassigned"
  | "Bought"
  | "All";

const filterMap: Record<FilterOption, (gift: Gift) => boolean> = {
  Reserved: (gift) => gift.state === "reserved",
  Pending: (gift) => gift.state === "pending",
  Assigned: (gift) => Boolean(gift.assignedUsers?.length),
  Unassigned: (gift) => !gift.assignedUsers?.length,
  Bought: (gift) => gift.state === "bought",
  All: () => true,
};

interface UseFilteredGiftsProps {
  gifts: Gift[];
  filter: FilterOption;
}

export function useFilteredGifts({ gifts, filter }: UseFilteredGiftsProps) {
  return useMemo(
    () => gifts.filter(filterMap[filter] || filterMap.All),
    [gifts, filter]
  );
}
