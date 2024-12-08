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
import { useUpdateGift } from "@/hooks/use-update-gift";
import { ShareGiftListModal } from "../share-gift-list-modal";
import { useAssignUserToGift } from "@/hooks/use-assign-user-to-gift";
import { useUnassignUserFromGift } from "@/hooks/user-unassign-user-from-gift";
import { useFilteredGifts } from "@/hooks/use-filtered-gifts";
import { useSortGifts } from "@/hooks/use-sort-gifts";
import GiftFilter from "./gift-filter";
import { SortGifts } from "./sort-gifts";
import { useSearchGifts } from "@/hooks/use-search-gifts";
import { SearchGifts } from "@/components/dashboard/search-gifts";
import { useMarkGiftAsBought } from "@/hooks/use-mark-gift-as-bought";
import { ScrollToTopButton } from "@/components/ui/scroll-to-top-button";
import GiftListWidgets from "./gift-list-widgets";

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
  const { deleteGift } = useDeleteGift(authenticatedUser);
  const { updateGift } = useUpdateGift(authenticatedUser);
  const { assignUserToGift } = useAssignUserToGift();
  const { unassignUserFromGift } = useUnassignUserFromGift();
  const { deleteGiftList } = useDeleteGiftList(authenticatedUser);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const giftListRef = useRef<HTMLDivElement>(null);
  const { markGiftAsBought } = useMarkGiftAsBought(authenticatedUser);

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

      if (giftListRef.current) {
        observer.observe(giftListRef.current, {
          childList: true,
          subtree: true,
        });
      }

      return () => observer.disconnect();
    }
  }, [newGiftId, scrollToGift]);

  const handleAddGiftClick = useCallback(
    async (
      url: string,
      details: string,
      name?: string,
      price?: number,
      currency?: string
    ) => {
      if (url) {
        const newGift = await handleAddGift(
          currentList.id,
          details,
          url,
          name,
          price,
          currency
        );
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
      return assignUserToGift(gift.id, authenticatedUser.uid, currentList.id);
    },
    [assignUserToGift, authenticatedUser.uid, currentList.id]
  );

  const handleUnassignGift = useCallback(
    async (gift: Gift) => {
      if (!gift.id) return;
      return unassignUserFromGift(
        gift.id,
        authenticatedUser.uid,
        currentList.id
      );
    },
    [unassignUserFromGift, authenticatedUser.uid, currentList.id]
  );

  const handleDeleteList = useCallback(() => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta lista?")) {
      deleteGiftList(currentList.id);
    }
  }, [deleteGiftList, currentList.id]);

  const handleShareList = useCallback(() => {
    setIsShareModalOpen(true);
  }, []);

  const handleMarkAsBought = useCallback(
    async (gift: Gift) => {
      const updatedGift = await markGiftAsBought(gift, currentList.id);
      if (updatedGift) {
        console.log(`Gift marked as bought successfully`);
      } else {
        console.error("Failed to mark gift as bought");
      }
    },
    [currentList.id, markGiftAsBought]
  );

  return (
    <div className="space-y-7 pb-10 lg:pb-0 relative">
      <GiftListHeader
        currentList={currentList}
        isOwner={isOwner}
        handleShareList={handleShareList}
        handleDeleteList={handleDeleteList}
      />
      <GiftListWidgets gifts={gifts} />
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
      <div className="overflow-x-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-5 transition-transform duration-300">
          {searchedGifts.map((gift) => (
            <div
              key={`gift-${gift.id}`}
              id={`gift-${gift.id}`}
              className="transition-all duration-300 opacity-100 scale-100"
            >
              <GiftCard
                authenticatedUser={authenticatedUser}
                gift={gift}
                isOwner={isOwner}
                handleRemoveGift={() => handleRemoveGift(gift)}
                handleEditGift={handleEditGift}
                handleAssignGift={() => handleAssignGift(gift)}
                handleUnassignGift={() => handleUnassignGift(gift)}
                handleMarkAsBought={() => handleMarkAsBought(gift)}
              />
            </div>
          ))}

          {searchedGifts.length === 0 && (
            <div className="col-span-full text-center py-8 transition-opacity duration-300 opacity-100">
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
            </div>
          )}
        </div>
      </div>
      <ShareGiftListModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        giftList={currentList}
      />
      <ScrollToTopButton />
    </div>
  );
}
