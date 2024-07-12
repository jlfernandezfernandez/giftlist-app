"use client";

import { useParams } from "next/navigation";
import { GiftTable } from "@/components/dashboard/gift-table";
import Spinner from "@/components/ui/spinner";
import { useUser } from "@/context/user-context";
import { useFetchGiftList } from "@/hooks/use-fetch-gift-list";

export default function GiftListPage() {
  const { id } = useParams(); // Obtener el id de los parámetros de la ruta
  const { user, isLoadingUser } = useUser();
  const { giftLists, isLoadingGiftList } = useFetchGiftList(user);

  const giftList = giftLists.find((list) => list.id === id);

  if (isLoadingUser || isLoadingGiftList) {
    return <Spinner />;
  }

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      <main className="flex-1 p-6 ml-auto">
        {giftList && <GiftTable user={user} currentListId={giftList.id} />}
      </main>
    </div>
  );
}
