// hooks/use-own-gift-lists.ts

import { GiftListSummary } from "@/types/gift-list-summary";
import { AuthenticatedUser } from "@/types/authenticated-user";

export const useOwnGiftLists = (
  giftLists: GiftListSummary[],
  authenticatedUser: AuthenticatedUser | null
) => {
  if (!authenticatedUser) {
    return [];
  }
  return giftLists.filter((list) =>
    list.users.map(
      (user) => user.userId === authenticatedUser?.uid && user.role === "owner"
    )
  );
};
