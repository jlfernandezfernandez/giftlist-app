// app/gift-list/[id]/shared/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/spinner";

export default function SharedGiftList({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuthAndAssociate = async () => {
      try {
        // Verificar si el usuario está autenticado
        const userResponse = await fetch("/api/get-authenticated-user");
        if (!userResponse.ok) {
          // Si no está autenticado, redirigir al login
          router.push(
            `/login?redirect=${encodeURIComponent(
              `/gift-list/${params.id}/shared`
            )}`
          );
          return;
        }

        // Si está autenticado, asociar el usuario a la lista de regalos
        const shareResponse = await fetch(
          `/api/gift-lists/${params.id}/share`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ role: "guest" }),
          }
        );

        if (!shareResponse.ok) {
          throw new Error("Failed to associate user");
        }

        // Redirigir a la página de la lista de regalos
        router.push(`/gift-list/${params.id}`);
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to join the gift list. Please try again.");
      }
    };

    checkAuthAndAssociate();
  }, [params.id, router]);

  if (error) {
    return <div>{error}</div>;
  }
  return <Spinner />;
}
