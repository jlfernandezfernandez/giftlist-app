// hooks/use-shared-gift-list.ts
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/user-context";
import { useGiftList } from "@/context/gift-list-context";

export const useSharedGiftList = (giftListId: string) => {
  const router = useRouter();
  const { user, isLoadingUser } = useUser();
  const { mutate } = useGiftList();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoadingUser && !user) {
      const currentPath = `/gift-list/${giftListId}/shared`;
      router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
    }
  }, [user, isLoadingUser, giftListId, router]);

  useEffect(() => {
    const associateUser = async () => {
      if (user && !isLoading) {
        setIsLoading(true);
        setError(null);

        try {
          const response = await fetch(`/api/gift-lists/${giftListId}/share`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: user.uid, role: "guest" }),
          });

          if (response.status === 200 || response.status === 409) {
            // 200: Asociación exitosa, 409: Usuario ya asociado
            await mutate(); // Actualizamos el contexto de las listas de regalos
            router.push(`/gift-list/${giftListId}`);
          } else {
            throw new Error("Failed to associate user with gift list");
          }
        } catch (err) {
          setError(
            err instanceof Error ? err.message : "An unknown error occurred"
          );
        } finally {
          setIsLoading(false);
        }
      }
    };

    associateUser();
  }, [user, giftListId, router, mutate]);

  return { isLoading, error };
};
