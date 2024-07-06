// app/dashboard/page.tsx

"use client";

import { useState, useEffect } from "react";
import { User } from "@/types/user";
import { GiftList } from "@/types/gift-list";
import { GiftTable } from "@/components/dashboard/gift-table";
import { Sidebar } from "@/components/dashboard/sidebar";
import Spinner from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

interface DashboardProps {
  user: User;
}

export default function DashboardPage({ user }: DashboardProps) {
  const [giftLists, setGiftLists] = useState<GiftList[]>([]);
  const [currentListId, setCurrentListId] = useState<number | null>(null);
  const [showEditListModal, setShowEditListModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchGiftLists = async () => {
      setIsLoading(true);
      const response = await fetch("/api/gift-lists");
      const data: GiftList[] = await response.json();
      setGiftLists(data);
      if (data.length > 0) setCurrentListId(data[0].id);
      setIsLoading(false);
    };

    fetchGiftLists();
  }, []);

  const currentList = giftLists.find((list) => list.id === currentListId);

  const handleAddGift = async (url: string) => {
    if (currentListId === null || !url) return;
    const response = await fetch("/api/get-gift-details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    const giftDetails = await response.json();

    const newGift = {
      id: currentList ? currentList.gifts.length + 1 : 1,
      ...giftDetails,
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
    setIsLoading(true);
    await fetch("/api/logout");
    setTimeout(() => {
      setIsLoading(false);
      router.push("/");
    }, 500);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      {isLoading && <Spinner />}
      <Sidebar
        user={user}
        giftLists={giftLists}
        currentListId={currentListId}
        setCurrentListId={setCurrentListId}
        handleEditList={handleEditList}
        handleLogout={handleLogout}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <main className="flex-1 p-6 ml-auto">
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
