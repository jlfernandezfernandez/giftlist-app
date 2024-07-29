// hooks/use-update-gift.ts

import { useState } from "react";
import { mutate } from "swr";
import { Gift } from "@/types/gift";
import { useToast } from "@/context/toast-context";

export function useUpdateGift() {
  const [isUpdatingGift, setIsUpdatingGift] = useState(false);
  const { addToast } = useToast();

  const updateGift = async (
    giftListId: string,
    giftId: string,
    updatedGift: Partial<Gift>
  ) => {
    setIsUpdatingGift(true);
    try {
      const response = await fetch(`/api/gifts/${giftId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedGift),
      });

      if (!response.ok) {
        throw new Error("Failed to update gift");
      }

      const updatedGiftData: Gift = await response.json();

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
  };

  return { updateGift, isUpdatingGift };
}
