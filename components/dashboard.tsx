"use client";

import { useState, useEffect } from "react";
import { User } from "@/types/user";
import { GiftList } from "@/types/gift-list";
import { GiftTable } from "@/components/dashboard/gift-table";
import { Sidebar } from "@/components/dashboard/sidebar";
import { useRouter } from "next/navigation"; // Import useRouter

interface DashboardProps {
  user: User;
}

export function Dashboard({ user }: DashboardProps) {
  const [giftLists, setGiftLists] = useState<GiftList[]>([]);
  const [currentListId, setCurrentListId] = useState<number | null>(null);
  const [showEditListModal, setShowEditListModal] = useState(false);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const fetchGiftLists = async () => {
      const response = await fetch("/api/gift-lists");
      const data: GiftList[] = await response.json();
      setGiftLists(data);
      if (data.length > 0) setCurrentListId(data[0].id); // Set the first list as the current one
    };

    fetchGiftLists();
  }, []);

  const currentList = giftLists.find((list) => list.id === currentListId);

  const handleAddGift = async (url: string) => {
    if (currentListId === null || !url) return;

    // Mocking ChatGPT API response
    const giftDetails = {
      name: "Mock Gift Name",
      prize: 99.99,
      currency: "EUR",
      website: "Amazon",
      url: "https://www.amazon.es",
      status: "Pendiente",
    };

    const newGift = {
      id: currentList ? currentList.gifts.length + 1 : 1,
      name: giftDetails.name,
      prize: giftDetails.prize,
      currency: giftDetails.currency,
      website: giftDetails.website,
      url: giftDetails.url,
      status: giftDetails.status,
      assignedTo: [],
    };

    setGiftLists((prevLists) => {
      const updatedList = prevLists.map((list) => {
        if (list.id === currentListId) {
          return {
            ...list,
            gifts: [...list.gifts, newGift],
          };
        }
        return list;
      });
      return updatedList;
    });
  };

  const handleEditList = (listId: number) => {
    setCurrentListId(listId);
    setShowEditListModal(true);
  };

  const handleUpdateList = (updatedList: GiftList) => {
    setGiftLists((prevLists) =>
      prevLists.map((list) => (list.id === updatedList.id ? updatedList : list))
    );
    setShowEditListModal(false);
  };

  const handleRemoveGift = (listId: number, giftId: number) => {
    setGiftLists((prevLists) =>
      prevLists.map((list) => {
        if (list.id === listId) {
          return {
            ...list,
            gifts: list.gifts.filter((gift) => gift.id !== giftId),
          };
        }
        return list;
      })
    );
  };

  const handleShareList = () => {
    console.log("Sharing gift list:", currentList?.name);
  };

  const handleLogout = async () => {
    await fetch("/api/logout");
    router.push("/");
  };

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar
        user={user}
        giftLists={giftLists}
        currentListId={currentListId}
        setCurrentListId={setCurrentListId}
        handleEditList={handleEditList}
        handleLogout={handleLogout}
      />
      <main className="flex-1 p-6">
        {currentList && (
          <GiftTable
            currentList={currentList}
            setShowEditListModal={setShowEditListModal}
            handleShareList={handleShareList}
            handleRemoveGift={handleRemoveGift}
            handleAddGift={handleAddGift}
          />
        )}
      </main>
    </div>
  );
}
