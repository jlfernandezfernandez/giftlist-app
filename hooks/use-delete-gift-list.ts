// hooks/use-delete-gift-list.ts

import { useState } from "react";
import { useGiftList } from "@/context/gift-list-context";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/toast-context";

export function useDeleteGiftList() {
  const [isDeletingGiftList, setIsDeleting] = useState(false);
  const { mutate } = useGiftList();
  const router = useRouter();
  const { addToast } = useToast();

  const deleteGiftList = async (listId: string) => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/gift-lists/${listId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete gift list");
      }

      mutate();
      addToast({
        title: "Success",
        description: "Gift list deleted successfully",
      });
      router.push("/gift-list/create");
    } catch (error) {
      addToast({
        title: "Error",
        description: "Failed to delete gift list",
      });
      console.error("Error deleting gift list:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteGiftList, isDeletingGiftList };
}
