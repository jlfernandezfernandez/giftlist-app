// hooks/use-mark-gift-as-bought.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Gift } from "@/types/gift";
import { AuthenticatedUser } from "@/types/authenticated-user";
import { useToast } from "@/context/toast-context";

export function useMarkGiftAsBought(
  authenticatedUser: AuthenticatedUser | null
) {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const mutation = useMutation<Gift, Error, Gift>({
    mutationFn: async (gift) => {
      if (!gift.id) throw new Error("Gift ID is required");

      const response = await fetch(`/api/gifts/${gift.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...gift,
          state: "bought",
          userId: authenticatedUser?.uid,
        }),
      });

      if (!response.ok) throw new Error("Failed to mark gift as bought");
      return response.json();
    },
    onSuccess: (updatedGift) => {
      queryClient.invalidateQueries({
        queryKey: ["gifts", updatedGift.giftListId],
      });
      addToast({
        description: "Gift marked as bought successfully",
        type: "success",
      });
    },
    onError: () => {
      addToast({ description: "Failed to mark gift as bought", type: "error" });
    },
  });

  return {
    markGiftAsBought: mutation.mutateAsync,
    isMarking: mutation.isPending,
  };
}
