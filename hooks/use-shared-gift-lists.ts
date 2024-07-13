// hooks/use-shared-gift-lists.ts

import { GiftListSummary } from "@/types/gift-list-summary";
import { AuthenticatedUser } from "@/types/authenticated-user";

export const useSharedGiftLists = (
  giftLists: GiftListSummary[],
  authenticatedUser: AuthenticatedUser | null
) => {
  if (!authenticatedUser) {
    return {};
  }

  return giftLists.reduce((acc, list) => {
    if (
      !list.users.map(
        (user) => user.userId === authenticatedUser.uid && user.role === "owner"
      )
    ) {
      const owner =
        list.users.find((user) => user.role === "owner")?.displayName ||
        "Unknown";
      if (!acc[owner]) acc[owner] = [];
      acc[owner].push(list);
    }
    return acc;
  }, {} as { [owner: string]: GiftListSummary[] });
};
