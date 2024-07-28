// hooks/use-associate-user-to-gift-list.ts
import { useState } from "react";
import { useUser } from "@/context/user-context";

export const useAssociateUserToGiftList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  const associateUserToGiftList = async (giftListId: string, role: string) => {
    if (!user) {
      setError("User not authenticated");
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/gift-lists/${giftListId}/share`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.uid, role }),
      });

      if (!response.ok) {
        throw new Error("Failed to associate user to gift list");
      }

      const result = await response.json();
      return result;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { associateUserToGiftList, isLoading, error };
};
