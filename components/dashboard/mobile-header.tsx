// components/dashboard/mobile-header.tsx
"use client";

import Image from "next/image";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/context/sidebar-context";

export function MobileHeader() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-10 lg:hidden flex items-center h-14 px-4 bg-background border-b border-border">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <MenuIcon className="h-5 w-5" />
      </Button>
      <div className="flex-1 flex justify-center items-center">
        <Image src="/logo.png" alt="GiftList AI Logo" width={40} height={40} />
        <h1 className="text-lg font-semibold">GiftList AI</h1>
      </div>
      <div className="w-10" />
    </header>
  );
}
