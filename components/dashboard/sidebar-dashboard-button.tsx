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
      className="block w-full "
    >
      <Button
        variant="green"
        className={cn("w-full h-11 px-4 py-2 mb-4 lg:mb-6")}
      >
        <LayoutDashboard className="mr-2 h-4 w-4" />
        <span className="text-sm font-medium">My Dashboard</span>
      </Button>
    </Link>
  );
}
