import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GiftList } from "@/types/gift-list";
import { AuthenticatedUser } from "@/types/authenticated-user";
import { AvatarSection } from "./avatar-section";
import { MenuIcon, XIcon, GiftIcon, UserIcon } from "lucide-react";

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
  const userGiftLists = giftLists.filter((list) =>
    list.users.some(
      (userItem) => userItem.userId === user.uid && userItem.role === "owner"
    )
  );

  const invitedGiftLists = giftLists.filter((list) =>
    list.users.some(
      (userItem) => userItem.userId === user.uid && userItem.role === "guest"
    )
  );

  const groupedInvitedLists = invitedGiftLists.reduce<{
    [key: string]: GiftList[];
  }>((acc, list) => {
    list.users.forEach((userItem) => {
      if (userItem.role === "owner") {
        if (!acc[userItem.displayName]) {
          acc[userItem.displayName] = [];
        }
        acc[userItem.displayName].push(list);
      }
    });
    return acc;
  }, {});

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
                {userGiftLists.map((list) => (
                  <Link
                    key={list.id}
                    href="#"
                    onClick={() => handleEditList(list.id)}
                    className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground ${
                      list.id === currentListId
                        ? "bg-muted text-foreground"
                        : ""
                    }`}
                    prefetch={false}
                  >
                    <GiftIcon className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span className="truncate" title={list.name}>
                      {list.name}
                    </span>
                  </Link>
                ))}
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
                <div>
                  {Object.keys(groupedInvitedLists).map((owner) => (
                    <div key={owner} className="mt-4">
                      <div className="flex items-center font-medium text-muted-foreground">
                        <UserIcon className="h-4 w-4 mr-1 flex-shrink-0" />
                        <span className="truncate" title={owner}>
                          {owner}
                        </span>
                      </div>
                      {groupedInvitedLists[owner].map((list) => (
                        <Link
                          key={list.id}
                          href="#"
                          onClick={() => handleEditList(list.id)}
                          className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground ${
                            list.id === currentListId
                              ? "bg-muted text-foreground"
                              : ""
                          }`}
                          prefetch={false}
                        >
                          <GiftIcon className="h-4 w-4 mr-1 flex-shrink-0" />
                          <span className="truncate" title={list.name}>
                            {list.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
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
