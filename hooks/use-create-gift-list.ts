// hooks/use-create-gift-list.ts
import { useState } from "react";
import { useRouter } from "next/navigation";
import { GiftList } from "@/types/gift-list";
import { useGiftList } from "@/context/gift-list-context";
import { useUser } from "@/context/user-context";

export const useCreateGiftList = () => {
  const { mutate } = useGiftList();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const createGiftList = async (
    name: string,
    description: string | null,
    date: string | null
  ) => {
    setIsLoading(true);

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
      mutate(); // Llamamos a mutate para actualizar el contexto
      router.push(`/gift-list/${giftList.id}`);
    } else {
      setIsLoading(false);
      alert("Failed to create gift list");
    }
  };

  return { createGiftList, isLoading };
};
