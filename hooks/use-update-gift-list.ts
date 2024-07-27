// hooks/use-update-gift-list.ts
import { useState } from "react";
import { useRouter } from "next/navigation";
import { GiftList } from "@/types/gift-list";
import { useGiftList } from "@/context/gift-list-context";
import { useUser } from "@/context/user-context";

export const useUpdateGiftList = () => {
  const { mutate, setCurrentList } = useGiftList();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const updateGiftList = async (
    giftListId: string,
    name: string,
    description: string | null,
    date: string | null
  ) => {
    setIsLoading(true);

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
      mutate(); // Actualizamos el contexto
      setCurrentList(updatedGiftList); // Actualizamos la lista actual en el contexto
      setIsLoading(false);
      router.push(`/gift-list/${updatedGiftList.id}`);
    } else {
      setIsLoading(false);
      alert("Failed to update gift list");
    }
  };

  return { updateGiftList, isLoading };
};
