// hooks/use-update-gift-list.ts
import { useState } from "react";
import { useGiftList } from "@/context/gift-list-context";
import { useUser } from "@/context/user-context";
import { useToast } from "@/context/toast-context";

export const useUpdateGiftList = () => {
  const { mutate } = useGiftList();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const updateGiftList = async (
    giftListId: string,
    name: string,
    description: string | null,
    date: string | null
  ) => {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/gift-lists/${giftListId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          date,
          userId: user?.uid,
        }),
      });

      if (response.ok) {
        mutate();
        addToast({
          description: "Gift list updated successfully",
          type: "success",
        });
      } else {
        throw new Error("Failed to update gift list");
      }
    } catch (error) {
      addToast({
        description: "Failed to update gift list",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { updateGiftList, isLoading };
};
