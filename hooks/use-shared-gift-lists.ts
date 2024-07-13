// hooks/use-shared-gift-lists.ts

import { GiftListSummary } from "@/types/gift-list-summary";
import { AuthenticatedUser } from "@/types/authenticated-user";

export const useSharedGiftLists = (
  giftLists: GiftListSummary[],
  user: AuthenticatedUser | null
) => {
  if (!user) {
    return {};
  }

  return giftLists.reduce((acc, list) => {
    if (!list.users.some((u) => u.userId === user.uid && u.role === "owner")) {
      const owner =
        list.users.find((u) => u.role === "owner")?.displayName || "Unknown";
      if (!acc[owner]) acc[owner] = [];
      acc[owner].push(list);
    }
    return acc;
  }, {} as { [owner: string]: GiftListSummary[] });
};
