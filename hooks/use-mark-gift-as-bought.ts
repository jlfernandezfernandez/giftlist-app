// hooks/use-mark-gift-as-bought.ts

import { useCallback } from "react";
import { useUpdateGift } from "./use-update-gift";
import { Gift } from "@/types/gift";

export function useMarkGiftAsBought() {
  const { updateGift, isUpdatingGift: isMarkingAsBought } = useUpdateGift();

  const markGiftAsBought = useCallback(
    async (gift: Gift, giftListId: string) => {
      if (!gift.id) return null;

      const updatedGift: Partial<Gift> = {
        ...gift,
        state: "bought"
      };

      return await updateGift(giftListId, gift.id, updatedGift);
    },
    [updateGift]
  );

  return { markGiftAsBought, isMarkingAsBought };
}
