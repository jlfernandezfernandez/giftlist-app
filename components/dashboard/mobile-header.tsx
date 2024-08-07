// components/dashboard/mobile-header.tsx
"use client";

import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/context/sidebar-context";

export function MobileHeader() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-10 md:hidden flex items-center justify-between h-16 px-4 bg-background border-b border-border">
      <h1 className="text-lg font-semibold">GiftList AI</h1>
      <Button variant="ghost" size="icon" onClick={toggleSidebar}>
        <MenuIcon className="h-6 w-6" />
      </Button>
    </header>
  );
}
