// hooks/use-assign-user-to-gift.ts

import { useState } from "react";
import { mutate } from "swr";
import { useToast } from "@/context/toast-context";

export function useAssignUserToGift() {
  const [isAssigningUser, setIsAssigningUser] = useState(false);
  const { addToast } = useToast();

  const assignUserToGift = async (
    giftId: string,
    userId: string,
    giftListId: string
  ) => {
    setIsAssigningUser(true);
    try {
      const response = await fetch(`/api/gifts/${giftId}/user/${userId}`, {
        method: "PUT",
      });

      if (!response.ok) {
        throw new Error("Failed to assign user to gift");
      }

      // Actualizar el caché de SWR para la lista de regalos
      mutate(`/api/gift-lists/${giftListId}/gift`);

      addToast({
        title: "Success",
        description: "You're now assigned to this gift",
      });

      return true; // Indicar éxito
    } catch (error) {
      addToast({
        title: "Error",
        description: "Couldn't assign to gift",
      });
      console.error("Error assigning user to gift:", error);
      return false; // Indicar fallo
    } finally {
      setIsAssigningUser(false);
    }
  };

  return { assignUserToGift, isAssigningUser };
}
