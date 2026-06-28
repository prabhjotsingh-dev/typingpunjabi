"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
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
import Routes from "@/comman/routes";

const menuItems = [
  {
    id: "learn",
    label: "Learn",
    Icon: BookOpen,
    children: [
      { id: "beginner", label: "Beginner", Icon: User, route: Routes.lessons },
      { id: "intermediate", label: "Intermediate", Icon: GraduationCap, route: Routes.lessons },
      { id: "advance", label: "Advanced", Icon: Trophy, route: Routes.lessons },
    ],
  },
  {
    id: "practice",
    label: "Practice",
    Icon: Target,
    children: [
      { id: "typing-practice", label: "Typing Practice", Icon: Target, route: Routes.typingPractice },
      { id: "typing-speed-test", label: "Speed Test", Icon: Gauge, route: Routes.typingSpeedTest },
    ],
  },
];

interface SidebarContentProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export function SidebarContent({
  isCollapsed,
  setIsCollapsed,
}: SidebarContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "learn",
    "practice",
  ]);

  const handleSelect = (value: string, route?: string) => {
    if (route) {
      let targetRoute = route;
      if (route === Routes.lessons && value !== "learn" && value !== "practice") {
        targetRoute = `${route}?stage=${value}`;
      }
      
      if (pathname !== route || (route === Routes.lessons && searchParams.get("plan") !== value)) {
        router.push(targetRoute);
      }
    }
    
    if (window.innerWidth < 768) {
      setIsCollapsed(true);
    }
  };

  let selectedValue = "beginner";
  if (pathname === Routes.typingSpeedTest) {
    selectedValue = "typing-speed-test";
  } else if (pathname === Routes.typingPractice) {
    selectedValue = "typing-practice";
  } else if (pathname === Routes.lessons) {
    const stage = searchParams.get("stage");
    if (stage) selectedValue = stage;
  }

  return (
    <div className="flex flex-col h-full">
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
                      onClick={() => handleSelect(item.id, item.route)}
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
}
