// context/sidebar-context.tsx

"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

interface SidebarContextType {
  isSidebarOpen: boolean;
  isSidebarLoading: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarLoading, setIsSidebarLoading] = useState(true);

  const toggleSidebar = useCallback(() => setIsSidebarOpen((prev) => !prev), []);
  const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSidebarLoading(false);
    }, 500); // Ajusta este tiempo según sea necesario

    return () => clearTimeout(timer);
  }, []);

  const value = React.useMemo(
    () => ({ isSidebarOpen, isSidebarLoading, toggleSidebar, closeSidebar }),
    [isSidebarOpen, isSidebarLoading, toggleSidebar, closeSidebar]
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
