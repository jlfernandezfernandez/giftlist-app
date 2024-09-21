// hooks/use-unassign-user-from-gift.ts

import { useCallback } from "react";
import { mutate } from "swr";
import { useToast } from "@/context/toast-context";
import { useGifts } from "@/context/gifts-context";
import { Gift } from "@/types/gift";

export function useUnassignUserFromGift() {
  const { updateGift } = useGifts();
  const { addToast } = useToast();

  const unassignUserFromGift = useCallback(
    async (giftId: string, userId: string, giftListId: string) => {
      try {
        const response = await fetch(`/api/gifts/${giftId}/user/${userId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to unassign user from gift");
        }

        const updatedGift: Gift = await response.json();

        // Update the context with the returned gift data
        updateGift(giftListId, updatedGift);

        // Update SWR cache
        await mutate(`/api/gifts/user/${userId}`);
        await mutate(`/api/gifts/${giftId}`);

        addToast({
          description: "You're no longer assigned to this gift",
          type: "success",
        });

        return updatedGift;
      } catch (error) {
        addToast({
          description: "Couldn't unassign from gift",
          type: "error",
        });
        console.error("Error unassigning user from gift:", error);
        throw error;
      }
    },
    [updateGift, addToast]
  );

  return { unassignUserFromGift };
}
