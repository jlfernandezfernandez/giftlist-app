// components/dashboard/sidebar.tsx
"use client";

import { Button } from "@/components/ui/button";
import { AvatarSection } from "./avatar-section";
import { LogOutIcon, GiftIcon, Share2 } from "lucide-react";
import { useLogout } from "@/hooks/use-logout";
import { useUser } from "@/context/user-context";
import { useGiftList } from "@/context/gift-list-context";
import { useSidebar } from "@/context/sidebar-context";
import { OwnGiftList } from "./sidebar-own-gift-list";
import { GuestGiftList } from "./sidebar-guest-gift-list";
import { AssignedGifts } from "./sidebar-assigned-gifts";
import { cn } from "@/lib/utils";
import { DashboardButton } from "./sidebar-dashboard-button";

export function Sidebar() {
  const { isSidebarOpen, isSidebarLoading, closeSidebar } = useSidebar();
  const { user } = useUser();
  const { giftLists } = useGiftList();
  const handleLogout = useLogout();

  const ownGiftLists = giftLists?.filter((list) => list.isOwner) ?? [];
  const guestGiftLists = giftLists?.filter((list) => !list.isOwner) ?? [];

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
          "fixed left-0 top-0 z-50 flex flex-col transition-all duration-300 ease-in-out bg-background border-r border-border",
          "w-64 sm:w-72 lg:w-64 xl:w-72",
          "h-full lg:h-[100dvh]",
          "lg:sticky lg:top-0",
          isSidebarOpen
            ? "translate-x-0 shadow-lg"
            : "-translate-x-full lg:translate-x-0",
          isSidebarLoading ? "opacity-0" : "opacity-100"
        )}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {" "}
          <div className="flex-shrink-0 mt-2 lg:mt-4">
            <AvatarSection user={user} />
          </div>
          <nav className="flex-grow overflow-y-auto pt-2 pb-6 px-4">
            <div className="space-y-1">
              <DashboardButton closeSidebar={closeSidebar} />
              <section>
                <OwnGiftList lists={ownGiftLists} />
              </section>
            </div>

            <div className="mt-10 space-y-6">
              <section>
                <h3 className="text-lg font-bold text-foreground mb-3">
                  Shared With Me
                </h3>
                <GuestGiftList lists={guestGiftLists} />
              </section>
              <section>
                <h3 className="text-lg font-bold text-foreground mb-3">
                  Assigned Gifts
                </h3>
                <AssignedGifts />
              </section>
            </div>
          </nav>
          <div className="flex-shrink-0 p-4 pb-safe mt-auto safe-area-bottom">
            <Button
              variant="ghost"
              className="w-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-200 h-14"
              onClick={handleLogout}
              alignment="left"
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
