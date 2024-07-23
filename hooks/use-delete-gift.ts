// hooks/use-delete-gift.ts
import { useState } from "react";
import { mutate } from "swr";

export function useDeleteGift() {
  const [isDeletingGift, setIsDeleting] = useState(false);

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

      return true; // Indicar éxito
    } catch (error) {
      console.error("Error deleting gift:", error);
      return false; // Indicar fallo
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteGift, isDeletingGift };
}
