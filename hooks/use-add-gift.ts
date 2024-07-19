// hooks/use-add-gift.ts

import { useState } from "react";
import { AuthenticatedUser } from "@/types/authenticated-user";
import { Gift } from "@/types/gift";
import { mutate } from "swr";

export const useAddGift = (authenticatedUser: AuthenticatedUser | null) => {
  const [isAddingGift, setIsAddingGift] = useState<boolean>(false);

  const handleAddGift = async (listId: string, link: string) => {
    setIsAddingGift(true);

    const response = await fetch(`/api/gift-lists/${listId}/gift`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        giftListId: listId,
        link,
        userId: authenticatedUser?.uid,
      }),
    });

    if (!response.ok) {
      console.error("Failed to add gift");
      setIsAddingGift(false);
      return;
    }

    const gift: Gift = await response.json();
    setIsAddingGift(false);

    // Forzar actualización de la lista de regalos
    mutate(`/api/gift-lists/${listId}/gift`);
  };

  return {
    isAddingGift,
    handleAddGift,
  };
};
