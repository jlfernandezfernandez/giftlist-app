"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AvatarSection } from "./avatar-section";
import { MenuIcon, XIcon } from "lucide-react";
import { SidebarOwnList } from "./sidebar-own-list";
import { SidebarSharedList } from "./sidebar-shared-list";
import { useLogout } from "@/hooks/use-logout";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/spinner";
import { useUser } from "@/context/user-context";
import { useGiftList } from "@/context/gift-list-context";

export function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, isLoadingUser } = useUser();
  const { giftLists, isLoadingGiftList } = useGiftList();
  const router = useRouter();
  const handleLogout = useLogout();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  if (isLoadingUser || isLoadingGiftList) {
    return <Spinner />;
  }

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-5 z-10 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}
      <button
        className="md:hidden p-4 fixed z-20"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        {isSidebarOpen ? (
          <XIcon className="h-6 w-6" />
        ) : (
          <MenuIcon className="h-6 w-6" />
        )}
      </button>
      <aside
        className={`bg-background border-r border-border p-4 fixed md:relative z-20 h-full md:h-screen transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 w-64 overflow-hidden`}
      >
        <div className="flex flex-col justify-between">
          <div>
            <AvatarSection user={user} />
            <nav className="flex flex-col gap-4">
              <div>
                <div className="flex items-center font-medium text-muted-foreground mb-2">
                  Mis Listas
                </div>
                <SidebarOwnList giftLists={giftLists} />
                <Button
                  className="mt-2 w-full"
                  onClick={() => router.push("/gift-list/create")}
                >
                  Add Gift List
                </Button>
              </div>
              <SidebarSharedList giftLists={giftLists} />
            </nav>
          </div>
          <hr className="border-t border-border mt-8" />
          <div className="mt-4">
            <Button
              variant={"ghost"}
              alignment={"left"}
              className="w-full text-gray-500"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
