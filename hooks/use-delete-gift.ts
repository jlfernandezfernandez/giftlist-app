// hooks/use-delete-gift.ts

import { useState } from "react";
import { mutate } from "swr";
import { useToast } from "@/context/toast-context";

export function useDeleteGift() {
  const [isDeletingGift, setIsDeleting] = useState(false);
  const { addToast } = useToast();

  const deleteGift = async (giftListId: string, giftId: string) => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/gifts/${giftId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete gift");
      }

      // Actualizar el caché de SWR para la lista de regalos
      mutate(`/api/gift-lists/${giftListId}/gift`);

      addToast({
        title: "Success",
        description: "Gift deleted successfully",
      });

      return true; // Indicar éxito
    } catch (error) {
      addToast({
        title: "Error",
        description: "Failed to delete gift",
      });
      console.error("Error deleting gift:", error);
      return false; // Indicar fallo
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteGift, isDeletingGift };
}
