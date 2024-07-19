import { useMemo } from "react";
import { GiftList } from "@/types/gift-list";
import { AuthenticatedUser } from "@/types/authenticated-user";

export const useGuestGiftLists = (
  giftLists: GiftList[],
  authenticatedUser: AuthenticatedUser | null
): GiftList[] => {
  return useMemo(() => {
    if (!authenticatedUser) {
      return [];
    }

    return giftLists.filter((list) =>
      list.users.some(
        (user) => user.userId === authenticatedUser.uid && user.role === "guest"
      )
    );
  }, [giftLists, authenticatedUser]);
};
