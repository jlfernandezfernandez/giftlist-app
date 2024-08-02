// components/dashboard/sidebar.tsx
"use client";

import { Button } from "@/components/ui/button";
import { AvatarSection } from "./avatar-section";
import { XIcon } from "lucide-react";
import { useLogout } from "@/hooks/use-logout";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/spinner";
import { useUser } from "@/context/user-context";
import { useGiftList } from "@/context/gift-list-context";
import { OwnGiftList } from "./sidebar-own-gift-list";
import { GuestGiftList } from "./sidebar-guest-gift-list";
import { useSidebar } from "@/context/sidebar-context";
import { AssignedGifts } from "./sidebar-assigned-gifts";

export function Sidebar() {
  const { isSidebarOpen, closeSidebar } = useSidebar();
  const { user, isLoadingUser } = useUser();
  const { giftLists, isLoadingGiftList } = useGiftList();
  const router = useRouter();
  const handleLogout = useLogout();

  if (isLoadingUser || isLoadingGiftList) {
    return <Spinner />;
  }

  const ownGiftLists = giftLists.filter((list) => list.isOwner);
  const guestGiftLists = giftLists.filter((list) => !list.isOwner);

  const handleListClick = (url: string) => {
    router.push(url);
    closeSidebar();
  };

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-5 z-40 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}
      <aside
        className={`bg-background border-r border-border p-4 fixed md:relative z-50 h-full md:h-screen transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 w-64 md:w-64 flex flex-col overflow-hidden`}
      >
        <div className="flex justify-end items-center md:hidden mb-4">
          <Button variant="ghost" size="icon" onClick={closeSidebar}>
            <XIcon className="h-6 w-6" />
          </Button>
        </div>
        <AvatarSection user={user} />
        <nav className="flex-1 overflow-y-auto mt-6">
          <div className="space-y-6">
            <section>
              <div className="flex items-center font-medium text-muted-foreground mb-2">
                My Lists
              </div>
              <div className="space-y-2 ml-2">
                {ownGiftLists.map((list) => (
                  <OwnGiftList
                    key={list.id}
                    list={list}
                    onClick={() => handleListClick(`/gift-list/${list.id}`)}
                  />
                ))}
                <Button
                  className="mt-3 w-full"
                  onClick={() => {
                    router.push("/gift-list/create");
                    closeSidebar();
                  }}
                >
                  New Gift List
                </Button>
              </div>
            </section>

            <section>
              <div className="flex items-center font-medium text-muted-foreground mb-2">
                Assigned Gifts
              </div>
              <div className="ml-2">
                <AssignedGifts />
              </div>
            </section>

            <section>
              <div className="flex items-center font-medium text-muted-foreground mb-2">
                Shared
              </div>
              <div className="ml-2">
                <GuestGiftList
                  lists={guestGiftLists}
                  onListClick={handleListClick}
                />
              </div>
            </section>
          </div>
        </nav>
        <div className="border-t border-border mt-8 pt-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-500"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
}
