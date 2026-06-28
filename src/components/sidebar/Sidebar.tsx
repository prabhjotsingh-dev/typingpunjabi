"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import { cn } from "@/lib/utils";
import { SidebarContent } from "./SidebarContent";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarContextType {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | null>(null);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

interface SidebarProviderProps {
  children: React.ReactNode;
  defaultCollapsed?: boolean;
}

export function SidebarProvider({
  children,
  defaultCollapsed = true,
}: SidebarProviderProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const isMobile = useIsMobile();
  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  }, [isMobile]);

  return (
    <SidebarContext.Provider
      value={{ isCollapsed, setIsCollapsed }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function Sidebar() {
  const { isCollapsed, setIsCollapsed } = useSidebar();

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 top-14 z-40 backdrop-blur-sm transition-opacity duration-300 bg-black/50 md:hidden",
          !isCollapsed ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={() => setIsCollapsed(true)}
      />

      {/* Mobile Spacer */}
      <div className="w-12 shrink-0 md:hidden" />

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "overflow-hidden fixed left-0 z-50 border-r shadow-2xl backdrop-blur-xl top-15 h-[calc(100svh-3.5rem)] bg-glass-bg/95 border-glass-border md:hidden",
          "transition-all duration-300 ease-out",
          isCollapsed ? "w-12" : "w-64",
        )}
      >
        <SidebarContent
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </aside>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden sticky flex-col border-r backdrop-blur-xl top-16 md:flex h-[calc(100svh-3.5rem)] bg-glass-bg/95 border-glass-border",
          "transition-all duration-300 ease-out",
          isCollapsed ? "w-12" : "w-64",
        )}
      >
        <SidebarContent
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </aside>
    </>
  );
}

export default Sidebar;
