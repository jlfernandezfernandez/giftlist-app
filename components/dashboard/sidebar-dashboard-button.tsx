import React from "react";
import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function DashboardButton({
  closeSidebar,
}: {
  closeSidebar: () => void;
}) {
  return (
    <Link
      href="/gift-list/dashboard"
      onClick={closeSidebar}
      className="block w-full"
    >
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start",
          "text-muted-foreground hover:text-foreground",
          "bg-transparent hover:bg-muted",
          "transition-colors duration-200",
          "h-12 px-4 py-2 mb-2",
          "rounded-md",
          "flex items-center",
          "group"
        )}
      >
        <LayoutDashboard className="mr-2 h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
        <span className="text-sm font-medium">My Dashboard</span>
      </Button>
    </Link>
  );
}
