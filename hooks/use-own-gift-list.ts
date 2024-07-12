// hooks/use-own-gift-list.ts

import { GiftListSummary } from "@/types/gift-list-summary";
import { AuthenticatedUser } from "@/types/authenticated-user";

export const useOwnGiftList = (
  giftLists: GiftListSummary[],
  user: AuthenticatedUser | null
) => {
  if (!user) {
    return [];
  }
  return giftLists.filter((list) =>
    list.users.some((u) => u.userId === user.uid && u.role === "owner")
  );
};
