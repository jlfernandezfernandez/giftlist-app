// hooks/use-add-gift.ts

import { useState, useCallback } from "react";
import { AuthenticatedUser } from "@/types/authenticated-user";
import { Gift } from "@/types/gift";
import { useToast } from "@/context/toast-context";
import { useGifts as useGiftsContext } from "@/context/gifts-context";
import { mutate } from "swr";

export const useAddGift = (authenticatedUser: AuthenticatedUser | null) => {
  const [isAddingGift, setIsAddingGift] = useState(false);
  const { addToast } = useToast();
  const { addGift: addGiftToContext } = useGiftsContext();

  const handleAddGift = useCallback(
    async (
      listId: string,
      details: string,
      link: string,
      name?: string,
      price?: number,
      currency?: string
    ): Promise<Gift | null> => {
      setIsAddingGift(true);

      try {
        const response = await fetch(`/api/gift-lists/${listId}/gift`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            giftListId: listId,
            link,
            details,
            name,
            price,
            currency,
            userId: authenticatedUser?.uid,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to add gift");
        }

        const newGift: Gift = await response.json();

        addGiftToContext(listId, newGift);
        mutate(`/api/gift-lists/${listId}/gift`);
        addToast({
          description: "Gift added successfully",
          type: "success",
        });

        return newGift;
      } catch (error) {
        addToast({
          description: "Failed to add gift",
          type: "error",
        });
        console.error("Error adding gift:", error);
        return null;
      } finally {
        setIsAddingGift(false);
      }
    },
    [authenticatedUser, addToast, addGiftToContext]
  );

  return {
    isAddingGift,
    handleAddGift,
  };
};
