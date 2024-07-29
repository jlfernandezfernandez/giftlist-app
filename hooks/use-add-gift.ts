// hooks/use-add-gift.ts

import { useState } from "react";
import { AuthenticatedUser } from "@/types/authenticated-user";
import { Gift } from "@/types/gift";
import { mutate } from "swr";
import { useToast } from "@/context/toast-context";

export const useAddGift = (authenticatedUser: AuthenticatedUser | null) => {
  const [isAddingGift, setIsAddingGift] = useState<boolean>(false);
  const { addToast } = useToast();

  const handleAddGift = async (
    listId: string,
    details: string,
    link: string
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
          userId: authenticatedUser?.uid,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add gift");
      }

      const newGift: Gift = await response.json();

      // Forzar actualización de la lista de regalos
      mutate(`/api/gift-lists/${listId}/gift`);

      return newGift;
    } catch (error) {
      addToast({
        title: "Error",
        description: "Failed to add gift",
      });
      console.error("Error adding gift:", error);
      return null;
    } finally {
      setIsAddingGift(false);
    }
  };

  return {
    isAddingGift,
    handleAddGift,
  };
};
