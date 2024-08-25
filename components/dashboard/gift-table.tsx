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
import { ShareGiftListModal } from "../share-gift-list-modal";
import { motion, AnimatePresence } from "framer-motion";
import { useAssignUserToGift } from "@/hooks/use-assign-user-to-gift";
import { useUnassignUserFromGift } from "@/hooks/user-unassign-user-from-gift";
import { useFilteredGifts } from "@/hooks/use-filtered-gifts";
import { useSortGifts } from "@/hooks/use-sort-gifts";
import GiftFilter from "./gift-filter";
import { SortGifts } from "./sort-gifts";

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
  const [filter, setFilter] = useState("All Gifts");
  const { isAddingGift, handleAddGift } = useAddGift(authenticatedUser);
  const { deleteGift, isDeletingGift } = useDeleteGift();
  const { updateGift, isUpdatingGift } = useUpdateGift();
  const { assignUserToGift, isAssigningUser } = useAssignUserToGift();
  const { unassignUserFromGift, isUnassigningUser } = useUnassignUserFromGift();
  const { deleteGiftList, isDeletingGiftList } = useDeleteGiftList();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const giftListRef = useRef<HTMLDivElement>(null);

  const filteredGifts = useFilteredGifts({ gifts, filter });
  const { sortedGifts, sortBy, setSortBy } = useSortGifts(filteredGifts);

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
    async (gift: Gift) => {
      if (!gift.id) return;
      if (
        window.confirm("¿Estás seguro de que quieres eliminar este regalo?")
      ) {
        const success = await deleteGift(currentList.id, gift.id);
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
      if (!updatedGift.id) return;
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
    },
    [currentList.id, updateGift]
  );

  const handleAssignGift = useCallback(
    async (gift: Gift) => {
      if (!gift.id) return;
      const success = await assignUserToGift(
        gift.id,
        authenticatedUser.uid,
        currentList.id
      );
      if (success) {
        console.log("Usuario asignado al regalo con éxito");
      } else {
        console.error("No se pudo asignar el usuario al regalo");
      }
    },
    [assignUserToGift, authenticatedUser.uid, currentList.id]
  );

  const handleUnassignGift = useCallback(
    async (gift: Gift) => {
      if (!gift.id) return;
      const success = await unassignUserFromGift(
        gift.id,
        authenticatedUser.uid,
        currentList.id
      );
      if (success) {
        console.log("Usuario desasignado del regalo con éxito");
      } else {
        console.error("No se pudo desasignar el usuario del regalo");
      }
    },
    [unassignUserFromGift, authenticatedUser.uid, currentList.id]
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
    setIsShareModalOpen(true);
  }, []);

  return (
    <div className="space-y-7 pb-10 lg:pb-0">
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
        <GiftFilter filter={filter} setFilter={setFilter} />
        <SortGifts sortBy={sortBy} setSortBy={setSortBy} />
      </div>
      <div
        ref={giftListRef}
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5"
      >
        <AnimatePresence>
          {sortedGifts.map((gift) => (
            <motion.div
              key={`gift-${gift.id}`}
              id={`gift-${gift.id}`}
              initial={false}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <GiftCard
                authenticatedUser={authenticatedUser}
                gift={gift}
                isOwner={isOwner}
                handleRemoveGift={() => handleRemoveGift(gift)}
                handleEditGift={handleEditGift}
                handleAssignGift={() => handleAssignGift(gift)}
                handleUnassignGift={() => handleUnassignGift(gift)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
        {sortedGifts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="col-span-full text-center py-8"
          >
            <p className="text-lg font-semibold text-gray-600">
              {filter === "All Gifts"
                ? "There are no gifts in this list yet"
                : "No gifts match the selected filter"}
            </p>
            {!isOwner && filter === "All Gifts" && (
              <p className="mt-2 text-sm text-gray-500">
                Check back later to see if any gifts have been added
              </p>
            )}
          </motion.div>
        )}
      </div>
      <EditGiftListModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        giftList={currentList}
      />
      <ShareGiftListModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        giftList={currentList}
      />
    </div>
  );
}
