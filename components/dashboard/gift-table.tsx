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
import { useSearchGifts } from "@/hooks/use-search-gifts";
import { SearchGifts } from "@/components/dashboard/search-gifts";

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
  const { searchTerm, setSearchTerm, searchedGifts } =
    useSearchGifts(sortedGifts);

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
    async (url: string, details: string, name?: string, price?: number, currency?: string) => {
      if (url) {
        const newGift = await handleAddGift(currentList.id, details, url, name, price, currency);
        if (newGift?.id) {
          setNewGiftId(newGift.id);
        }
      }
    },
    [currentList.id, handleAddGift]
  );

  const handleRemoveGift = useCallback(
    async (gift: Gift) => {
      if (!gift.id) return;
      if (window.confirm("Are you sure you want to delete this gift?")) {
        const success = await deleteGift(currentList.id, gift.id);
        console.log(success ? "Gift deleted successfully" : "Failed to delete gift");
      }
    },
    [currentList.id, deleteGift]
  );

  const handleEditGift = useCallback(
    async (updatedGift: Gift) => {
      if (!updatedGift.id) return;
      const success = await updateGift(currentList.id, updatedGift.id, updatedGift);
      console.log(success ? "Gift updated successfully" : "Failed to update gift");
    },
    [currentList.id, updateGift]
  );

  const handleAssignGift = useCallback(
    async (gift: Gift) => {
      if (!gift.id) return;
      const success = await assignUserToGift(gift.id, authenticatedUser.uid, currentList.id);
      console.log(success ? "User assigned to gift successfully" : "Failed to assign user to gift");
    },
    [assignUserToGift, authenticatedUser.uid, currentList.id]
  );

  const handleUnassignGift = useCallback(
    async (gift: Gift) => {
      if (!gift.id) return;
      const success = await unassignUserFromGift(gift.id, authenticatedUser.uid, currentList.id);
      console.log(success ? "User unassigned from gift successfully" : "Failed to unassign user from gift");
    },
    [unassignUserFromGift, authenticatedUser.uid, currentList.id]
  );

  const handleDeleteList = useCallback(() => {
    if (window.confirm("Are you sure you want to delete this list?")) {
      deleteGiftList(currentList.id);
    }
  }, [currentList.id, deleteGiftList]);

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
          useExtendedForm={true}
        />
      )}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <GiftFilter filter={filter} setFilter={setFilter} />
          <SortGifts sortBy={sortBy} setSortBy={setSortBy} />
        </div>
        <SearchGifts searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <motion.div
        ref={giftListRef}
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-5"
        layout
        transition={{
          duration: 0.3,
          type: "spring",
          stiffness: 200,
          damping: 25,
        }}
      >
        <AnimatePresence mode="popLayout">
          {searchedGifts.map((gift) => (
            <motion.div
              key={`gift-${gift.id}`}
              id={`gift-${gift.id}`}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 },
                layout: {
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                },
              }}
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
        {searchedGifts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="col-span-full text-center py-8"
          >
            <p className="text-lg font-semibold text-gray-600">
              {filter === "All Gifts" && searchTerm === ""
                ? "There are no gifts in this list yet"
                : "No gifts match the selected filter or search term"}
            </p>
            {!isOwner && filter === "All Gifts" && searchTerm === "" && (
              <p className="mt-2 text-sm text-gray-500">
                Check back later to see if any gifts have been added
              </p>
            )}
          </motion.div>
        )}
      </motion.div>
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
