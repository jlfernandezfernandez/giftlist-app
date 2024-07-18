// hooks/use-add-gift.ts

import { useState } from "react";
import { AuthenticatedUser } from "@/types/authenticated-user";
import { useGiftList } from "@/hooks/use-gift-list";

export const useAddGift = (authenticatedUser: AuthenticatedUser | null) => {
  const [isAddingGift, setIsAddingGift] = useState<boolean>(false);
  const { currentList, refreshGiftList } = useGiftList(authenticatedUser);

  const handleAddGift = async (url: string) => {
    if (!currentList || !url) return;

    const response = await fetch(`/api/gift-lists/${currentList.id}/gift`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, userId: authenticatedUser?.uid }),
    });

    if (!response.ok) {
      console.error("Failed to add gift");
      return;
    }

    await refreshGiftList(); // Refrescar la lista después de añadir un regalo
  };

  return {
    isAddingGift,
    setIsAddingGift,
    handleAddGift,
  };
};
