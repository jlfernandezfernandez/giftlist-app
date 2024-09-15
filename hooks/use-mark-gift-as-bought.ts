// hooks/use-mark-gift-as-bought.ts

import { useCallback } from "react";
import { useUpdateGift } from "./use-update-gift";
import { Gift } from "@/types/gift";
import { AuthenticatedUser } from "@/types/authenticated-user";

export function useMarkGiftAsBought(
  authenticatedUser: AuthenticatedUser | null
) {
  const { updateGift, isUpdatingGift: isMarkingAsBought } =
    useUpdateGift(authenticatedUser);

  const markGiftAsBought = useCallback(
    async (gift: Gift, giftListId: string) => {
      if (!gift.id) return null;

      const updatedGift: Partial<Gift> = {
        ...gift,
        state: "bought",
      };

      return await updateGift(giftListId, gift.id, updatedGift);
    },
    [updateGift]
  );

  return { markGiftAsBought, isMarkingAsBought };
}
