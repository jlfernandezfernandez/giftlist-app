// hooks/use-delete-gift-list.ts

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/toast-context";
import { AuthenticatedUser } from "@/types/authenticated-user";

export function useDeleteGiftList(authenticatedUser: AuthenticatedUser | null) {
  const [isDeletingGiftList, setIsDeleting] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { addToast } = useToast();

  const mutation = useMutation({
    mutationFn: async (listId: string) => {
      const response = await fetch(`/api/gift-lists/${listId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: authenticatedUser?.uid }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete gift list");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["giftLists"] });
      addToast({
        description: "Gift list deleted successfully",
        type: "success",
      });
      router.push("/gift-list/dashboard");
    },
    onError: (error) => {
      addToast({
        description: "Failed to delete gift list",
        type: "error",
      });
      console.error("Error deleting gift list:", error);
    },
  });

  const deleteGiftList = async (listId: string) => {
    setIsDeleting(true);
    try {
      await mutation.mutateAsync(listId);
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteGiftList, isDeletingGiftList };
}
