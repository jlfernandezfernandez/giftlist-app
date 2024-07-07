// components/dashboard/Sidebar.tsx
import { Button } from "@/components/ui/button";
import { GiftList } from "@/types/gift-list";
import { AuthenticatedUser } from "@/types/authenticated-user";
import { AvatarSection } from "./avatar-section";
import { MenuIcon, XIcon } from "lucide-react";
import { useGiftLists } from "@/hooks/use-gift-lists";
import { SidebarOwnList } from "./sidebar-own-list";
import { SidebarSharedList } from "./sidebar-shared-list";

interface SidebarProps {
  user: AuthenticatedUser;
  giftLists: GiftList[];
  currentListId: string | null;
  setCurrentListId: (id: string) => void;
  handleEditList: (listId: string) => void;
  handleLogout: () => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}

export function Sidebar({
  user,
  giftLists,
  currentListId,
  setCurrentListId,
  handleEditList,
  handleLogout,
  isOpen,
  toggleSidebar,
}: SidebarProps) {
  const { userGiftLists, groupedInvitedLists } = useGiftLists(giftLists, user);

  return (
    <>
      <button
        className="md:hidden p-4"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        {isOpen ? (
          <XIcon className="h-6 w-6" />
        ) : (
          <MenuIcon className="h-6 w-6" />
        )}
      </button>
      <aside
        className={`bg-background border-r border-border p-4 fixed md:relative z-20 h-full md:h-screen transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
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
                <SidebarOwnList
                  giftLists={userGiftLists}
                  currentListId={currentListId}
                  handleEditList={handleEditList}
                />
                <Button
                  className="mt-2 w-full"
                  onClick={() =>
                    alert("Add Gift List functionality not implemented")
                  }
                >
                  Add Gift List
                </Button>
              </div>
              {Object.keys(groupedInvitedLists).length > 0 && (
                <SidebarSharedList
                  groupedSharedLists={groupedInvitedLists}
                  currentListId={currentListId}
                  handleEditList={handleEditList}
                />
              )}
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
