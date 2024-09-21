// hooks/use-create-gift-list.ts
import { useState } from "react";
import { useRouter } from "next/navigation";
import { GiftList } from "@/types/gift-list";
import { useGiftList } from "@/context/gift-list-context";
import { useUser } from "@/context/user-context";
import { useToast } from "@/context/toast-context";

export const useCreateGiftList = () => {
  const { mutate } = useGiftList();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { addToast } = useToast();

  const createGiftList = async (
    name: string,
    description: string | null,
    date: string | null
  ) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/gift-lists", {
        method: "POST",
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
        const giftList: GiftList = await response.json();
        mutate();
        addToast({
          description: "Gift list created successfully",
          type: "success",
        });
        router.push(`/gift-list/${giftList.id}`);
      } else {
        throw new Error("Failed to create gift list");
      }
    } catch (error) {
      addToast({
        description: "Failed to create gift list",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { createGiftList, isLoading };
};
