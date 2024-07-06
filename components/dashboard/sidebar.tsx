import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GiftList } from "@/types/gift-list";
import { User } from "@/types/user";
import { AvatarSection } from "./avatar-section";
import { MenuIcon, XIcon, GiftIcon, UserIcon } from "lucide-react";

interface SidebarProps {
  user: User;
  giftLists: GiftList[];
  currentListId: number | null;
  setCurrentListId: (id: number) => void;
  handleEditList: (listId: number) => void;
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
    list.gifts.some((gift) =>
      gift.assignedTo.some((assignee) => assignee.uid === user.uid)
    )
  );

  const invitedGiftLists = giftLists.filter((list) =>
    list.gifts.some((gift) =>
      gift.assignedTo.some((assignee) => assignee.uid !== user.uid)
    )
  );

  const groupedInvitedLists = invitedGiftLists.reduce<{
    [key: string]: GiftList[];
  }>((acc, list) => {
    if (!acc[list.owner]) {
      acc[list.owner] = [];
    }
    acc[list.owner].push(list);
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
          <div className="flex-grow">
            <AvatarSection user={user} />
            <nav className="flex flex-col gap-4">
              {Object.keys(groupedInvitedLists).map((owner) => (
                <div key={owner} className="grid gap-2">
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
              {userGiftLists.map((list) => (
                <Link
                  key={list.id}
                  href="#"
                  onClick={() => handleEditList(list.id)}
                  className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground ${
                    list.id === currentListId ? "bg-muted text-foreground" : ""
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
                className="mt-4"
                onClick={() =>
                  alert("Add Gift List functionality not implemented")
                }
              >
                Add Gift List
              </Button>
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
