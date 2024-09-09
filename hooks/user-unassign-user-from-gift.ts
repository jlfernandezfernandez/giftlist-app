// hooks/use-unassign-user-from-gift.ts

import { useState } from "react";
import { mutate } from "swr";
import { useToast } from "@/context/toast-context";

export function useUnassignUserFromGift() {
  const [isUnassigningUser, setIsUnassigningUser] = useState(false);
  const { addToast } = useToast();

  const unassignUserFromGift = async (
    giftId: string,
    userId: string,
    giftListId: string
  ) => {
    setIsUnassigningUser(true);
    try {
      const response = await fetch(`/api/gifts/${giftId}/user/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to unassign user from gift");
      }

      // Actualizar el caché de SWR para la lista de regalos y los regalos asignados
      mutate(`/api/gift-lists/${giftListId}/gift`);
      mutate(`/api/gifts/user/${userId}`);

      addToast({
        title: "Success",
        description: "You're no longer assigned to this gift",
      });

      return true;
    } catch (error) {
      addToast({
        title: "Error",
        description: "Couldn't unassign from gift",
      });
      console.error("Error unassigning user from gift:", error);
      return false;
    } finally {
      setIsUnassigningUser(false);
    }
  };

  return { unassignUserFromGift, isUnassigningUser };
}
