// hooks/use-delete-gift.ts

import { useState } from "react";
import { mutate } from "swr";
import { useToast } from "@/context/toast-context";
import { AuthenticatedUser } from "@/types/authenticated-user";
import { useGifts as useGiftsContext } from "@/context/gifts-context";

export function useDeleteGift(authenticatedUser: AuthenticatedUser | null) {
  const [isDeletingGift, setIsDeleting] = useState(false);
  const { addToast } = useToast();
  const { removeGift: removeGiftFromContext } = useGiftsContext();

  const deleteGift = async (giftListId: string, giftId: string) => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/gifts/${giftId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: authenticatedUser?.uid }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete gift");
      }

      removeGiftFromContext(giftListId, giftId);
      mutate(`/api/gift-lists/${giftListId}/gift`);

      addToast({
        description: "Gift deleted successfully",
        type: "success",
      });

      return true; // Indicate success
    } catch (error) {
      addToast({
        description: "Failed to delete gift",
        type: "error",
      });
      console.error("Error deleting gift:", error);
      return false; // Indicate failure
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteGift, isDeletingGift };
}
