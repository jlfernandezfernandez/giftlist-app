// components/dashboard/sidebar.tsx
"use client";

import { Button } from "@/components/ui/button";
import { AvatarSection } from "./avatar-section";
import { LogOutIcon, GiftIcon, StarIcon } from "lucide-react";
import { useLogout } from "@/hooks/use-logout";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/spinner";
import { useUser } from "@/context/user-context";
import { useGiftList } from "@/context/gift-list-context";
import { useSidebar } from "@/context/sidebar-context";
import { OwnGiftList } from "./sidebar-own-gift-list";
import { GuestGiftList } from "./sidebar-guest-gift-list";
import { AssignedGifts } from "./sidebar-assigned-gifts";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const { isSidebarOpen, isSidebarLoading, closeSidebar } = useSidebar();
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
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ease-in-out"
          onClick={closeSidebar}
        />
      )}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full flex flex-col transition-all duration-300 ease-in-out bg-background border-r border-border",
          "w-64 sm:w-72 lg:w-64 xl:w-72", // Ajustado para ser más consistente
          "lg:sticky lg:top-0 lg:h-screen",
          isSidebarOpen
            ? "translate-x-0 shadow-lg"
            : "-translate-x-full lg:translate-x-0",
          isSidebarLoading ? "opacity-0" : "opacity-100"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 flex-shrink-0">
            <AvatarSection user={user} />
          </div>

          <nav className="flex-grow overflow-y-auto pt-2 lg:pt-4 pb-6 px-4">
            <div className="space-y-6">
              <section>
                <h3 className="flex items-center text-base font-semibold text-foreground mb-3">
                  <GiftIcon className="w-5 h-5 mr-2" />
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
                <h3 className="flex items-center text-base font-semibold text-foreground mb-3">
                  <GiftIcon className="w-5 h-5 mr-2" />
                  Shared With Me
                </h3>
                <GuestGiftList
                  lists={guestGiftLists}
                  onListClick={(url) => {
                    router.push(url);
                    closeSidebar();
                  }}
                />
              </section>

              <section>
                <h3 className="flex items-center text-base font-semibold text-foreground mb-3">
                  <StarIcon className="w-5 h-5 mr-2" />
                  Assigned Gifts
                </h3>
                <AssignedGifts />
              </section>
            </div>
          </nav>

          <div className="border-t border-border p-3 lg:p-4 flex-shrink-0">
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-200"
              onClick={handleLogout}
            >
              <LogOutIcon className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
