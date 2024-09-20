// hooks/use-delete-gift-list.ts

import { useState } from "react";
import { useGiftList } from "@/context/gift-list-context";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/toast-context";
import { AuthenticatedUser } from "@/types/authenticated-user";

export function useDeleteGiftList(authenticatedUser: AuthenticatedUser | null) {
  const [isDeletingGiftList, setIsDeleting] = useState(false);
  const { mutate } = useGiftList();
  const router = useRouter();
  const { addToast } = useToast();

  const deleteGiftList = async (listId: string) => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/gift-lists/${listId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: authenticatedUser?.uid }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete gift list");
      }

      mutate();
      addToast({
        title: "Success",
        description: "Gift list deleted successfully",
      });
      router.push("/gift-list/dashboard");
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
