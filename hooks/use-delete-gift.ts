// hooks/use-delete-gift.ts

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/context/toast-context";
import { AuthenticatedUser } from "@/types/authenticated-user";
import { useGifts as useGiftsContext } from "@/context/gifts-context";

export function useDeleteGift(authenticatedUser: AuthenticatedUser | null) {
  const [isDeletingGift, setIsDeleting] = useState(false);
  const { addToast } = useToast();
  const { removeGift: removeGiftFromContext } = useGiftsContext();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      giftListId,
      giftId,
    }: {
      giftListId: string;
      giftId: string;
    }) => {
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

      return { giftId, giftListId };
    },
    onSuccess: ({ giftId, giftListId }) => {
      removeGiftFromContext(giftListId, giftId);
      queryClient.invalidateQueries({ queryKey: ["gifts", giftListId] });
      addToast({
        description: "Gift deleted successfully",
        type: "success",
      });
    },
    onError: (error) => {
      addToast({
        description: "Failed to delete gift",
        type: "error",
      });
      console.error("Error deleting gift:", error);
    },
  });

  const deleteGift = async (giftListId: string, giftId: string) => {
    setIsDeleting(true);
    try {
      await mutation.mutateAsync({ giftListId, giftId });
      return true;
    } catch {
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteGift, isDeletingGift };
}
