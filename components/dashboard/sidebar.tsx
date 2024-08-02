// components/dashboard/sidebar.tsx
"use client";

import { Button } from "@/components/ui/button";
import { AvatarSection } from "./avatar-section";
import { XIcon, PlusIcon, LogOutIcon } from "lucide-react";
import { useLogout } from "@/hooks/use-logout";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/spinner";
import { useUser } from "@/context/user-context";
import { useGiftList } from "@/context/gift-list-context";
import { useSidebar } from "@/context/sidebar-context";
import { OwnGiftList } from "./sidebar-own-gift-list";
import { GuestGiftList } from "./sidebar-guest-gift-list";
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

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-5 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}
      <aside
        className={`bg-background border-r border-border fixed md:relative z-50 h-full md:h-screen transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 w-64 flex flex-col overflow-hidden`}
      >
        <div className="p-4">
          <AvatarSection user={user} />
        </div>
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-6">
            <section>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                My Lists
              </h3>
              <OwnGiftList
                lists={ownGiftLists}
                onCreateNewList={() => {
                  router.push("/gift-list/create");
                  closeSidebar();
                }}
                onListClick={(url) => {
                  router.push(url);
                  closeSidebar();
                }}
              />
            </section>

            <section>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                Assigned Gifts
              </h3>
              <AssignedGifts />
            </section>

            <section>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                Shared Lists
              </h3>
              <GuestGiftList
                lists={guestGiftLists}
                onListClick={(url) => {
                  router.push(url);
                  closeSidebar();
                }}
              />
            </section>
          </div>
        </nav>
        <div className="border-t border-border p-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground"
            onClick={handleLogout}
          >
            <LogOutIcon className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
}
