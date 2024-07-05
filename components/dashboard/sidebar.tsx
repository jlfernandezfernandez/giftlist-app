import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GiftList } from "@/types/gift-list";
import { User } from "@/types/user";
import { AvatarSection } from "./avatar-section";

interface SidebarProps {
  user: User;
  giftLists: GiftList[];
  currentListId: number | null;
  setCurrentListId: (id: number) => void;
  handleEditList: (listId: number) => void;
  handleLogout: () => void;
}

export function Sidebar({
  user,
  giftLists,
  currentListId,
  setCurrentListId,
  handleEditList,
  handleLogout,
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
    <aside className="bg-background border-r border-border p-4 hidden md:flex flex-col justify-between">
      <div>
        <AvatarSection user={user} />
        <nav className="flex flex-col gap-2">
          {Object.keys(groupedInvitedLists).map((owner) => (
            <div key={owner} className="grid gap-2">
              <div className="font-medium text-muted-foreground">{owner}</div>
              {groupedInvitedLists[owner].map((list) => (
                <Link
                  key={list.id}
                  href="#"
                  onClick={() => handleEditList(list.id)}
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground ${
                    list.id === currentListId ? "bg-muted text-foreground" : ""
                  }`}
                  prefetch={false}
                >
                  {list.name}
                </Link>
              ))}
            </div>
          ))}
          {userGiftLists.map((list) => (
            <Link
              key={list.id}
              href="#"
              onClick={() => handleEditList(list.id)}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground ${
                list.id === currentListId ? "bg-muted text-foreground" : ""
              }`}
              prefetch={false}
            >
              {list.name}
            </Link>
          ))}
          <Button
            className="mt-4"
            onClick={() => alert("Add Gift List functionality not implemented")}
          >
            Add Gift List
          </Button>
        </nav>
      </div>
      <Button className="mt-4" onClick={handleLogout}>
        Logout
      </Button>
    </aside>
  );
}
