// hooks/useGiftLists.ts

import { GiftList } from "@/types/gift-list";
import { AuthenticatedUser } from "@/types/authenticated-user";

export function useGiftLists(giftLists: GiftList[], user: AuthenticatedUser) {
  const userGiftLists = giftLists.filter((list) =>
    list.users.some(
      (userItem) => userItem.userId === user.uid && userItem.role === "owner"
    )
  );

  const invitedGiftLists = giftLists.filter((list) =>
    list.users.some(
      (userItem) => userItem.userId === user.uid && userItem.role === "guest"
    )
  );

  const groupedInvitedLists = invitedGiftLists.reduce<{
    [key: string]: GiftList[];
  }>((acc, list) => {
    list.users.forEach((userItem) => {
      if (userItem.role === "owner") {
        if (!acc[userItem.displayName]) {
          acc[userItem.displayName] = [];
        }
        acc[userItem.displayName].push(list);
      }
    });
    return acc;
  }, {});

  return { userGiftLists, groupedInvitedLists };
}
