// app/gift-list/[id]/shared/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useSharedGiftList } from "@/hooks/use-shared-gift-list";
import Spinner from "@/components/ui/spinner";

export default function SharedGiftListPage() {
  const { id } = useParams();
  const { isLoading, error } = useSharedGiftList(id as string);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Esta página no renderizará nada más, ya que redirigirá a la página principal de la lista de regalos
  return null;
}
