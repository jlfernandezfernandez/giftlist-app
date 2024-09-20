// hooks/use-update-gift.ts

import { useState, useCallback } from "react";
import { mutate } from "swr";
import { Gift } from "@/types/gift";
import { useToast } from "@/context/toast-context";
import { AuthenticatedUser } from "@/types/authenticated-user";
import { useGifts } from "@/context/gifts-context";

export function useUpdateGift(authenticatedUser: AuthenticatedUser | null) {
  const [isUpdatingGift, setIsUpdatingGift] = useState(false);
  const { addToast } = useToast();
  const { updateGift: updateGiftInContext } = useGifts();

  const updateGift = useCallback(
    async (giftListId: string, giftId: string, updatedGift: Partial<Gift>) => {
      setIsUpdatingGift(true);
      try {
        const response = await fetch(`/api/gifts/${giftId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...updatedGift,
            userId: authenticatedUser?.uid,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to update gift");
        }

        const updatedGiftData: Gift = await response.json();

        // Update the context
        updateGiftInContext(giftListId, updatedGiftData);

        // Update the SWR cache for the gift list
        mutate(`/api/gift-lists/${giftListId}/gift`);

        addToast({
          title: "Success",
          description: "Gift updated successfully",
        });

        return updatedGiftData;
      } catch (error) {
        addToast({
          title: "Error",
          description: "Failed to update gift",
        });
        console.error("Error updating gift:", error);
        throw error;
      } finally {
        setIsUpdatingGift(false);
      }
    },
    [authenticatedUser, addToast, updateGiftInContext]
  );

  return { updateGift, isUpdatingGift };
}
