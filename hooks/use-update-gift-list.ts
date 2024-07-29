// hooks/use-update-gift-list.ts
import { useState } from "react";
import { useRouter } from "next/navigation";
import { GiftList } from "@/types/gift-list";
import { useGiftList } from "@/context/gift-list-context";
import { useUser } from "@/context/user-context";
import { useToast } from "@/context/toast-context";

export const useUpdateGiftList = () => {
  const { mutate, setCurrentList } = useGiftList();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
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
        const updatedGiftList: GiftList = await response.json();
        mutate();
        setCurrentList(updatedGiftList);
        addToast({
          title: "Success",
          description: "Gift list updated successfully",
        });
        router.push(`/gift-list/${updatedGiftList.id}`);
      } else {
        throw new Error("Failed to update gift list");
      }
    } catch (error) {
      addToast({
        title: "Error",
        description: "Failed to update gift list",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { updateGiftList, isLoading };
};
