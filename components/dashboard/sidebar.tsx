// components/dashboard/sidebar.tsx
"use client";

import { Button } from "@/components/ui/button";
import { AvatarSection } from "./avatar-section";
import { LogOutIcon } from "lucide-react";
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
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 xl:hidden transition-opacity duration-300 ease-in-out"
          onClick={closeSidebar}
        />
      )}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full flex flex-col transition-all duration-300 ease-in-out bg-background border-r border-border",
          "w-3/4 sm:w-80 lg:w-72 xl:w-80",
          "lg:relative lg:translate-x-0",
          isSidebarOpen ? "translate-x-0 shadow-lg" : "-translate-x-full",
          isSidebarLoading ? "opacity-0" : "opacity-100"
        )}
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

        <div className="border-t border-border p-4 mt-auto">
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
