import { AuthenticatedUser } from "@/types/authenticated-user";
import { GiftListSummary } from "@/types/gift-list-summary";

export const useOwnGiftLists = (
  giftLists: GiftListSummary[],
  authenticatedUser: AuthenticatedUser | null
) => {
  if (!authenticatedUser) {
    return [];
  }

  return giftLists.filter((list) =>
    list.users.some(
      (user) => user.userId === authenticatedUser.uid && user.role === "owner"
    )
  );
};
