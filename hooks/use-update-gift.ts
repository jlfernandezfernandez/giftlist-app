// hooks/use-update-gift.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Gift } from "@/types/gift";
import { useToast } from "@/context/toast-context";
import { AuthenticatedUser } from "@/types/authenticated-user";

interface UpdateGiftParams {
  giftId: string;
  updatedGift: Partial<Gift>;
}

export function useUpdateGift(authenticatedUser: AuthenticatedUser | null) {
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation<Gift, Error, UpdateGiftParams>({
    mutationFn: async ({ giftId, updatedGift }) => {
      const response = await fetch(`/api/gifts/${giftId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...updatedGift,
          userId: authenticatedUser?.uid,
        }),
      });

      if (!response.ok) throw new Error("Failed to update gift");
      return response.json();
    },
    onSuccess: (updatedGiftData) => {
      queryClient.invalidateQueries({
        queryKey: ["gifts", updatedGiftData.giftListId],
      });
      addToast({
        description: "Gift updated successfully",
        type: "success",
      });
    },
    onError: () => {
      addToast({
        description: "Failed to update gift",
        type: "error",
      });
    },
  });

  return {
    updateGift: mutation.mutateAsync,
    isUpdating: mutation.isPending,
  };
}
