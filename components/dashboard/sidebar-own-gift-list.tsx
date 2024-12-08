// components/dashboard/sidebar-own-gift-list.tsx
import React from "react";
import Link from "next/link";
import { ListPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCurrentGiftListId } from "@/hooks/use-current-gift-list-id";
import { GiftList } from "@/types/gift-list";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/context/sidebar-context";

interface OwnGiftListProps {
  lists: GiftList[];
}

export function SidebarOwnGiftList({ lists }: OwnGiftListProps) {
  const currentListId = useCurrentGiftListId();
  const { closeSidebar } = useSidebar();

  return (
    <div className="space-y-3">
      {lists.length === 0 ? (
        <Link href="/gift-list/new" onClick={closeSidebar}>
          <Button className="w-full justify-start" variant="outline">
            <ListPlus className="mr-2 h-4 w-4" />
            Create your first list
          </Button>
        </Link>
      ) : (
        <>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-foreground">My Lists</h3>
            <Link href="/gift-list/new" onClick={closeSidebar}>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8"
                title="Create new list"
              >
                <ListPlus className="h-5 w-5" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-2">
            {lists.map((list) => (
              <Link
                key={list.id}
                href={`/gift-list/${list.id}`}
                onClick={closeSidebar}
                className={cn(
                  "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm lg:text-base transition-colors duration-200",
                  "hover:bg-muted",
                  list.id === currentListId
                    ? "bg-muted font-medium"
                    : "text-muted-foreground"
                )}
              >
                <span className="truncate flex-1" title={list.name}>
                  {list.name}
                </span>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
