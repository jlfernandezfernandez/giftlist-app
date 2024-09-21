// hooks/use-mark-gift-as-bought.ts

import { useCallback } from "react";
import { Gift } from "@/types/gift";
import { AuthenticatedUser } from "@/types/authenticated-user";
import { useGifts } from "@/context/gifts-context";
import { useToast } from "@/context/toast-context";
import { mutate } from "swr";

export function useMarkGiftAsBought(
  authenticatedUser: AuthenticatedUser | null
) {
  const { updateGift: updateGiftInContext } = useGifts();
  const { addToast } = useToast();

  const markGiftAsBought = useCallback(
    async (gift: Gift, giftListId: string) => {
      if (!gift.id) return null;

      try {
        const response = await fetch(`/api/gifts/${gift.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...gift,
            state: "bought",
            userId: authenticatedUser?.uid,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to mark gift as bought");
        }

        const updatedGift: Gift = await response.json();

        // Update the context
        updateGiftInContext(giftListId, updatedGift);

        // Update the SWR cache for the gift list
        mutate(`/api/gift-lists/${giftListId}/gift`);

        addToast({
          description: "Gift marked as bought successfully",
          type: "success",
        });

        return updatedGift;
      } catch (error) {
        addToast({
          description: "Failed to mark gift as bought",
          type: "error",
        });
        console.error("Error marking gift as bought:", error);
        throw error;
      }
    },
    [authenticatedUser, addToast, updateGiftInContext]
  );

  return { markGiftAsBought };
}
