// components/dashboard/gift-table.tsx
import { useCallback, useState, useRef, useEffect } from "react";
import { GiftListHeader } from "./gift-list-header";
import { AddGiftCard } from "./add-gift-card";
import { GiftCard } from "./gift-card";
import { GiftList } from "@/types/gift-list";
import { Gift } from "@/types/gift";
import { AuthenticatedUser } from "@/types/authenticated-user";
import { useAddGift } from "@/hooks/use-add-gift";
import { useDeleteGift } from "@/hooks/use-delete-gift";
import { useDeleteGiftList } from "@/hooks/use-delete-gift-list";
import { EditGiftListModal } from "../edit-gift-list-modal";
import { useUpdateGift } from "@/hooks/use-update-gift";

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
  const { isAddingGift, handleAddGift } = useAddGift(authenticatedUser);
  const { deleteGift, isDeletingGift } = useDeleteGift();
  const { updateGift, isUpdatingGift } = useUpdateGift();
  const { deleteGiftList, isDeletingGiftList } = useDeleteGiftList();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const giftListRef = useRef<HTMLDivElement>(null);

  const scrollToGift = useCallback((giftId: string) => {
    const giftElement = document.getElementById(`gift-${giftId}`);
    if (giftElement) {
      giftElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  useEffect(() => {
    if (newGiftId) {
      const observer = new MutationObserver((mutations, obs) => {
        const giftElement = document.getElementById(`gift-${newGiftId}`);
        if (giftElement) {
          scrollToGift(newGiftId);
          setNewGiftId(null);
          obs.disconnect();
        }
      });

      observer.observe(giftListRef.current!, {
        childList: true,
        subtree: true,
      });

      return () => observer.disconnect();
    }
  }, [newGiftId, scrollToGift]);

  const handleAddGiftClick = useCallback(
    async (url: string, details: string) => {
      if (url) {
        const newGift = await handleAddGift(currentList.id, details, url);
        if (newGift && newGift.id) {
          setNewGiftId(newGift.id);
        }
      }
    },
    [currentList.id, handleAddGift]
  );

  const handleRemoveGift = useCallback(
    async (giftId: string) => {
      if (
        window.confirm("¿Estás seguro de que quieres eliminar este regalo?")
      ) {
        const success = await deleteGift(currentList.id, giftId);
        if (success) {
          console.log("Regalo eliminado con éxito");
        } else {
          console.error("No se pudo eliminar el regalo");
        }
      }
    },
    [currentList.id, deleteGift]
  );

  const handleEditGift = useCallback(
    async (updatedGift: Gift) => {
      if (updatedGift.id) {
        const success = await updateGift(
          currentList.id,
          updatedGift.id,
          updatedGift
        );
        if (success) {
          console.log("Regalo actualizado con éxito");
        } else {
          console.error("No se pudo actualizar el regalo");
        }
      }
    },
    [currentList.id, updateGift]
  );

  const handleDeleteList = () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta lista?")) {
      deleteGiftList(currentList.id);
    }
  };

  const handleEditList = useCallback(() => {
    setIsEditModalOpen(true);
  }, []);

  const handleShareList = useCallback(() => {
    // Implementar lógica de compartir
  }, []);

  return (
    <div className="space-y-4 px-2 sm:px-4 md:px-6">
      <GiftListHeader
        currentList={currentList}
        isOwner={isOwner}
        handleEditList={handleEditList}
        handleShareList={handleShareList}
        handleDeleteList={handleDeleteList}
      />
      {isOwner && (
        <AddGiftCard
          isAddingGift={isAddingGift}
          handleAddGift={handleAddGiftClick}
        />
      )}
      <div ref={giftListRef} className="space-y-3">
        {gifts.length > 0 ? (
          gifts.map((gift) => (
            <div key={gift.id} id={`gift-${gift.id}`}>
              <GiftCard
                authenticatedUser={authenticatedUser}
                gift={gift}
                isOwner={isOwner}
                handleRemoveGift={() => gift.id && handleRemoveGift(gift.id)}
                handleEditGift={handleEditGift}
                handleAssignGift={() => {
                  /* Implementar lógica de asignación */
                }}
                handleUnassignGift={() => {
                  /* Implementar lógica de desasignación */
                }}
              />
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-lg font-semibold text-gray-600">
              There are no gifts in this list yet
            </p>
            {!isOwner && (
              <p className="mt-2 text-sm text-gray-500">
                Check back later to see if any gifts have been added
              </p>
            )}
          </div>
        )}
      </div>
      <EditGiftListModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        giftList={currentList}
      />
    </div>
  );
}
