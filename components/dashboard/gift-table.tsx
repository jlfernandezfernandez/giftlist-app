// components/dashboard/gift-table.tsx

import { useState, useRef, useEffect, useCallback } from "react";
import { GiftListHeader } from "./gift-list-header";
import { AddGiftCard } from "./add-gift-card";
import { GiftCard } from "./gift-card";
import { GiftList } from "@/types/gift-list";
import { Gift } from "@/types/gift";
import { AuthenticatedUser } from "@/types/authenticated-user";
import { useAddGift } from "@/hooks/use-add-gift";

interface GiftTableProps {
  authenticatedUser: AuthenticatedUser;
  currentList: GiftList;
  gifts: Gift[];
  isOwner: boolean;
}

export function GiftTable({
  authenticatedUser,
  currentList,
  gifts,
  isOwner,
}: GiftTableProps) {
  const [newGiftId, setNewGiftId] = useState<string | null>(null);
  const newGiftRef = useRef<HTMLDivElement>(null);
  const { isAddingGift, handleAddGift } = useAddGift(authenticatedUser);

  const handleAddGiftClick = useCallback(
    async (url: string) => {
      if (url) {
        const newGift = await handleAddGift(currentList.id, url);
        if (newGift && newGift.id) {
          setNewGiftId(newGift.id);
        }
      }
    },
    [currentList.id, handleAddGift]
  );

  useEffect(() => {
    if (newGiftId && newGiftRef.current) {
      newGiftRef.current.scrollIntoView({ behavior: "smooth" });
      setNewGiftId(null);
    }
  }, [newGiftId]);

  return (
    <div className="space-y-4 px-2 sm:px-4 md:px-6">
      <GiftListHeader
        currentList={currentList}
        isOwner={isOwner}
        handleEditList={() => {
          /* Implementar lógica de edición */
        }}
        handleShareList={() => {
          /* Implementar lógica de compartir */
        }}
      />
      {isOwner && (
        <AddGiftCard
          isAddingGift={isAddingGift}
          handleAddGift={handleAddGiftClick}
        />
      )}
      {gifts.length > 0 ? (
        <div className="space-y-3">
          {gifts.map((gift) => (
            <div key={gift.id} ref={gift.id === newGiftId ? newGiftRef : null}>
              <GiftCard
                authenticatedUser={authenticatedUser}
                gift={gift}
                isOwner={isOwner}
                handleRemoveGift={() => {
                  /* Implementar lógica de eliminación */
                }}
                handleAssignGift={() => {
                  /* Implementar lógica de asignación */
                }}
                handleUnassignGift={() => {
                  /* Implementar lógica de desasignación */
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-lg font-semibold text-gray-600">
            No hay regalos en esta lista aún
          </p>
          {!isOwner && (
            <p className="mt-2 text-sm text-gray-500">
              Vuelve más tarde para ver si se han añadido regalos
            </p>
          )}
        </div>
      )}
    </div>
  );
}
