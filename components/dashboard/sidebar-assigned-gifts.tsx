// components/dashboard/sidebar-assigned-gifts.tsx
import React from "react";
import Link from "next/link";
import { useSidebar } from "@/context/sidebar-context";
import { useUser } from "@/context/user-context";
import { useAssignedGifts } from "@/hooks/use-assigned-gifts";
import { cn } from "@/lib/utils";

export function SidebarAssignedGifts() {
  const { closeSidebar } = useSidebar();
  const { user } = useUser();
  const { assignedGifts, isLoading } = useAssignedGifts(user?.uid || "");

  if (!user || isLoading) return null;

  if (assignedGifts.length === 0) {
    return (
      <div className="text-sm lg:text-base text-muted-foreground">
        No assigned gifts
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {assignedGifts.map((gift) => (
        <Link
          key={gift.id}
          href={`/gift-list/${gift.giftListId}#${gift.id}`}
          onClick={closeSidebar}
          className={cn(
            "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm lg:text-base transition-colors duration-200",
            "hover:bg-muted text-muted-foreground"
          )}
        >
          <span className="truncate" title={gift.name}>
            {gift.name}
          </span>
        </Link>
      ))}
    </div>
  );
}
