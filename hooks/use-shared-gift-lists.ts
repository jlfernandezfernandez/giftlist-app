import { GiftListSummary } from "@/types/gift-list-summary";
import { AuthenticatedUser } from "@/types/authenticated-user";

export const useSharedGiftLists = (
  giftLists: GiftListSummary[],
  authenticatedUser: AuthenticatedUser | null
): { [owner: string]: GiftListSummary[] } => {
  if (!authenticatedUser) {
    return {};
  }

  return giftLists.reduce((groupedGiftLists, list) => {
    const isGuest = list.users.some(
      (user) => user.userId === authenticatedUser.uid && user.role === "guest"
    );

    if (isGuest) {
      const owner = list.users.find((user) => user.role === "owner");

      if (owner) {
        if (!groupedGiftLists[owner.name]) {
          groupedGiftLists[owner.name] = [];
        }
        groupedGiftLists[owner.name].push(list);
      }
    }
    return groupedGiftLists;
  }, {} as { [owner: string]: GiftListSummary[] });
};
