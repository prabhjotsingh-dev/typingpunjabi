"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import {
  ArrowRight,
  BookOpen,
  Target,
  Gauge,
  User,
  GraduationCap,
  Trophy,
  ChevronDown,
  PanelLeft,
  PanelRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
interface SidebarContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
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
  defaultCollapsed = false,
}: SidebarProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  // Collapse sidebar on initial load for mobile
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setIsCollapsed(true);
    }
  }, []);

  return (
    <SidebarContext.Provider
      value={{ isOpen, setIsOpen, isCollapsed, setIsCollapsed }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

// Mobile Trigger (No longer used, but kept for compatibility)
export function SidebarTrigger({ className }: { className?: string }) {
  return null;
}

// Menu items configuration
const menuItems = [
  {
    id: "learn",
    label: "Learn",
    Icon: BookOpen,
    children: [
      { id: "beginner", label: "Beginner", Icon: User },
      { id: "intermediate", label: "Intermediate", Icon: GraduationCap },
      { id: "advance", label: "Advanced", Icon: Trophy },
    ],
  },
  {
    id: "practice",
    label: "Practice",
    Icon: Target,
    children: [
      { id: "Practice", label: "Practice", Icon: Target },
      { id: "test", label: "Speed Test", Icon: Gauge },
    ],
  },
];

interface SidebarProps {
  selectedValue: string;
  onValueChange: (value: string) => void;
}

export function Sidebar({ selectedValue, onValueChange }: SidebarProps) {
  const { isOpen, setIsOpen, isCollapsed, setIsCollapsed } = useSidebar();
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "learn",
    "practice",
  ]);

  const handleSelect = (value: string) => {
    onValueChange(value);
    setIsOpen(false);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-glass-border/50">
        <div
          className={cn(
            "flex items-center gap-2 transition-all duration-300 overflow-hidden whitespace-nowrap",
            isCollapsed && "opacity-0 w-0 min-w-0",
          )}
        >
          <span className="text-sm font-semibold text-text">Navigation</span>
        </div>
        <Button
          onClick={() => setIsCollapsed(!isCollapsed)}
          variant="ghost"
          size="icon-sm"
          className="flex rounded-lg text-text-muted hover:text-text hover:bg-glass-hover"
        >
          {isCollapsed ? (
            <PanelRight className="w-4 h-4" />
          ) : (
            <PanelLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Menu Items */}
      <nav className="overflow-y-auto flex-1 px-2 py-3 space-y-1 hide-scrollbar">
        {menuItems.map((section) => (
          <Collapsible
            key={section.id}
            open={expandedSections.includes(section.id)}
            onOpenChange={(isOpen) => {
              setExpandedSections((prev) =>
                isOpen
                  ? [...prev, section.id]
                  : prev.filter((id) => id !== section.id),
              );
            }}
            className={isCollapsed ? "mb-8" : "mb-4"}
          >
            {/* Section Header */}
            <CollapsibleTrigger
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200",
                "text-text-muted hover:text-text hover:bg-glass-hover",
                "justify-center px-2",
                isCollapsed && "hidden",
              )}
            >
              <section.Icon className="flex-shrink-0 w-5 h-5" />
              <span
                className={cn(
                  "flex-1 text-sm font-medium transition-all duration-300",
                  isCollapsed && "hidden",
                )}
              >
                {section.label}
              </span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform duration-200",
                  expandedSections.includes(section.id) && "rotate-180",
                  isCollapsed && "hidden",
                )}
              />
            </CollapsibleTrigger>

            {/* Section Children */}
            <CollapsibleContent
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                expandedSections.includes(section.id)
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0",
              )}
            >
              <div
                className={`${isCollapsed ? "pl-0" : "pl-2"} mt-1 space-y-0.5`}
              >
                {section.children.map((item) => {
                  const isSelected = selectedValue === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item.id)}
                      className={cn(
                        "flex gap-3 items-center py-2 w-full text-left rounded-xl transition-all duration-200",
                        isSelected
                          ? "font-medium bg-primary-dark/10 text-primary-dark"
                          : "text-text-muted hover:text-text hover:bg-glass-hover",
                        isCollapsed ? "px-2" : "px-3",
                      )}
                    >
                      <item.Icon
                        className={cn(
                          "w-4 h-4 flex-shrink-0",
                          isSelected && "text-primary-dark",
                        )}
                      />
                      <span className="text-sm">{item.label}</span>
                      {isSelected && (
                        <ArrowRight className="ml-auto w-4 h-4 text-primary-dark" />
                      )}
                    </button>
                  );
                })}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </nav>
    </div>
  );

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
        <SidebarContent />
      </aside>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden sticky flex-col border-r backdrop-blur-xl top-16 md:flex h-[calc(100svh-3.5rem)] bg-glass-bg/95 border-glass-border",
          "transition-all duration-300 ease-out",
          isCollapsed ? "w-12" : "w-64",
        )}
      >
        <SidebarContent />
      </aside>
    </>
  );
}

export default Sidebar;
