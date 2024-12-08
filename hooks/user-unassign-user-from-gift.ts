// hooks/use-unassign-user-from-gift.ts

import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/context/toast-context";
import { useGifts } from "@/context/gifts-context";
import { Gift } from "@/types/gift";

export function useUnassignUserFromGift() {
  const { updateGift } = useGifts();
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      giftId,
      userId,
    }: {
      giftId: string;
      userId: string;
    }) => {
      const response = await fetch(`/api/gifts/${giftId}/user/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to unassign user from gift");
      }

      return response.json();
    },
    onSuccess: (updatedGift: Gift) => {
      updateGift(updatedGift.giftListId, updatedGift);
      queryClient.invalidateQueries({ queryKey: ["assignedGifts"] });
      queryClient.invalidateQueries({ queryKey: ["gifts"] });
      addToast({
        description: "You're no longer assigned to this gift",
        type: "success",
      });
    },
    onError: (error) => {
      addToast({
        description: "Couldn't unassign from gift",
        type: "error",
      });
      console.error("Error unassigning user from gift:", error);
    },
  });

  const unassignUserFromGift = useCallback(
    async (giftId: string, userId: string, giftListId: string) => {
      return mutation.mutateAsync({ giftId, userId });
    },
    [mutation]
  );

  return { unassignUserFromGift };
}
