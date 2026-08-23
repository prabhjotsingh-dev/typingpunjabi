"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export interface NavItem {
  id?: string;
  href?: string;
  label?: React.ReactNode;
  icon?: React.ElementType | React.ReactNode;
  badge?: string | number;
  suffix?: React.ReactNode | ((isActive: boolean) => React.ReactNode);
  onClick?: (e: React.MouseEvent) => void;
  [key: string]: any;
}

export interface AnimateNavigationProps {
  /** List of navigation items */
  items: NavItem[];
  /** Layout orientation: horizontal for top navs/tabs, vertical for sidebars/menus */
  orientation?: "horizontal" | "vertical";
  /** Controlled active item ID or href. If not provided, compares item.href with current pathname */
  activeIdOrHref?: string;
  /** Callback fired when an item is selected */
  onSelect?: (item: NavItem, index: number) => void;
  /** Whether to show the smooth gliding background indicator */
  enableIndicator?: boolean;
  /** Custom class for the gliding background indicator */
  indicatorClassName?: string;
  /** Whether to enable staggered entrance animations when mounted */
  enableStagger?: boolean;
  /** Delay per item in ms for entrance animations (capped to prevent fatigue) */
  staggerDelayMs?: number;
  /** Entrance animation class from tailwindcss-motion */
  entranceAnimationClass?: string;
  /** Container className */
  className?: string;
  /** Base item className applied to every link/button */
  itemClassName?: string;
  /** ClassName applied to the currently active link/button */
  activeItemClassName?: string;
  /** ClassName applied to inactive links/buttons */
  inactiveItemClassName?: string;
  /** Custom render function if you need complete control over item content */
  renderItem?: (item: NavItem, isActive: boolean, index: number) => React.ReactNode;
}

export function AnimateNavigation({
  items,
  orientation = "horizontal",
  activeIdOrHref,
  onSelect,
  enableIndicator = true,
  indicatorClassName,
  enableStagger = true,
  staggerDelayMs = 50,
  entranceAnimationClass,
  className,
  itemClassName,
  activeItemClassName,
  inactiveItemClassName,
  renderItem,
}: AnimateNavigationProps) {
  const pathname = usePathname();
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    opacity: 0,
  });

  // Determine if an item is active
  const isItemActive = (item: NavItem): boolean => {
    if (activeIdOrHref !== undefined) {
      return item.id === activeIdOrHref || item.href === activeIdOrHref;
    }
    if (item.href && pathname) {
      // Exact match or base path match depending on route
      return pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/");
    }
    return false;
  };

  // Recalculate indicator position & dimensions
  useEffect(() => {
    if (!enableIndicator) return;

    const updateIndicator = () => {
      const activeIndex = items.findIndex((item) => isItemActive(item));
      if (activeIndex !== -1 && itemRefs.current[activeIndex]) {
        const el = itemRefs.current[activeIndex];
        if (el) {
          setIndicatorStyle({
            left: el.offsetLeft,
            top: el.offsetTop,
            width: el.offsetWidth,
            height: el.offsetHeight,
            opacity: 1,
          });
          return;
        }
      }
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [items, pathname, activeIdOrHref, enableIndicator]);

  const defaultEntranceClass =
    orientation === "horizontal"
      ? "motion-preset-slide-up motion-duration-200"
      : "motion-preset-slide-right motion-duration-200";

  const defaultIndicatorClass =
    orientation === "horizontal"
      ? "bg-glass-active border border-primary-light shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]"
      : "bg-primary-dark/10 border border-primary-light/40 shadow-sm";

  return (
    <nav
      className={cn(
        "relative flex",
        orientation === "horizontal" ? "flex-row items-center gap-1.5" : "flex-col gap-1 w-full",
        className
      )}
    >
      {/* Gliding Shared Indicator */}
      {enableIndicator && (
        <span
          className={cn(
            "absolute rounded-xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none z-0",
            defaultIndicatorClass,
            indicatorClassName
          )}
          style={{
            left: `${indicatorStyle.left}px`,
            top: `${indicatorStyle.top}px`,
            width: `${indicatorStyle.width}px`,
            height: `${indicatorStyle.height}px`,
            opacity: indicatorStyle.opacity,
          }}
        />
      )}

      {/* Navigation Items */}
      {items.map((item, index) => {
        const active = isItemActive(item);
        const Icon = item.icon;

        const baseClasses = cn(
          "relative z-10 flex items-center rounded-xl text-sm font-medium transition-colors duration-200 select-none cursor-pointer text-left",
          orientation === "horizontal" ? "gap-2 px-4 py-1.5" : "gap-3 px-3 py-2.5 w-full",
          "active:scale-95 cubic-transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-dark/40",
          active
            ? cn("text-primary-dark font-semibold", activeItemClassName)
            : cn("text-text-muted hover:text-text hover:bg-glass-hover/60", inactiveItemClassName),
          itemClassName
        );

        const motionStyle = enableStagger
          ? { animationDelay: `${index * staggerDelayMs}ms` }
          : undefined;

        const motionClass = enableStagger
          ? entranceAnimationClass || defaultEntranceClass
          : "";

        const handleClick = (e: React.MouseEvent) => {
          if (item.onClick) item.onClick(e);
          if (onSelect) onSelect(item, index);
        };

        const content = renderItem ? (
          renderItem(item, active, index)
        ) : (
          <>
            {Icon && (
              <span className="flex items-center justify-center flex-shrink-0">
                {React.isValidElement(Icon) ? (
                  Icon
                ) : (
                  // @ts-ignore
                  <Icon className={cn("w-4 h-4", active && "text-primary-dark")} />
                )}
              </span>
            )}

            {item.label !== null && item.label !== undefined && (
              typeof item.label === "string" || typeof item.label === "number" ? (
                <span className="flex-1 truncate text-left leading-normal">{item.label}</span>
              ) : (
                <div className="flex-1 flex items-center gap-2 truncate text-left leading-normal">{item.label}</div>
              )
            )}

            {item.badge !== undefined && (
              <span
                className={cn(
                  "px-2 py-0.5 text-[10px] font-bold rounded-full flex-shrink-0",
                  active
                    ? "bg-primary-dark text-brand-white"
                    : "bg-surface-muted text-text-muted"
                )}
              >
                {item.badge}
              </span>
            )}

            {item.suffix && (
              <span className="ml-auto flex items-center justify-center flex-shrink-0">
                {typeof item.suffix === "function" ? item.suffix(active) : item.suffix}
              </span>
            )}
          </>
        );

        // If item has href and no custom onClick override, render Next.js Link
        if (item.href && !item.onClick) {
          return (
            <Link
              key={item.id || item.href || index}
              href={item.href}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              onClick={handleClick}
              className={cn(baseClasses, motionClass)}
              style={motionStyle}
            >
              {content}
            </Link>
          );
        }

        // Otherwise render standard interactive button/div
        return (
          <button
            key={item.id || item.href || index}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            onClick={handleClick}
            type="button"
            className={cn(baseClasses, motionClass, "text-left")}
            style={motionStyle}
          >
            {content}
          </button>
        );
      })}
    </nav>
  );
}

export default AnimateNavigation;
