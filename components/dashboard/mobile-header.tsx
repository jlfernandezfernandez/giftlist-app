// components/dashboard/mobile-header.tsx
"use client";

import { Gift, MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/context/sidebar-context";

export function MobileHeader() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-10 xl:hidden flex items-center justify-between h-16 px-4 bg-background border-b border-border">
      <div className="flex items-center font-semibold space-x-2">
        <Gift className="w-5 h-5" aria-hidden="true" />
        <h1 className="text-lg">GiftList AI</h1>
      </div>
      <Button variant="ghost" size="icon" onClick={toggleSidebar}>
        <MenuIcon className="h-6 w-6" />
      </Button>
    </header>
  );
}
