import React from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="h-[calc(100svh-3.5rem)] flex flex-col items-center pt-2 pb-24 bg-background font-sans selection:bg-muted">
      {/* Header Area Skeleton */}
      <div className="flex flex-col gap-4 justify-between items-start px-6 mb-6 w-full max-w-5xl md:flex-row md:items-end">
        <div className="space-y-1 cursor-default">
          <Skeleton className="h-9 md:h-10 w-48" />
        </div>
      </div>

      {/* Timer and Stats Panel Skeleton */}
      <Card className="flex flex-row flex-nowrap gap-4 items-center px-5 py-2.5 mb-6 whitespace-nowrap rounded-full shadow-sm backdrop-blur-md cursor-default border-border/60 bg-card/80">
        <div className="flex items-center">
          <Skeleton className="h-5 w-12" />
        </div>
        <div className="flex items-center border-l border-border pl-4">
          <Skeleton className="h-5 w-16" />
        </div>
      </Card>

      {/* Main Typing Area Skeleton */}
      <div className="relative px-4 w-full max-w-5xl md:px-6">
        <Card className="w-full border-border/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] rounded-[2.5rem] bg-card overflow-hidden cursor-text flex flex-col">
          {/* Placeholder characters */}
          <div className="p-6 md:p-10 flex flex-wrap content-start min-h-[250px] gap-2 md:gap-3 transition-all flex-1">
            {Array.from({ length: 20 }).map((_, i) => (
              <Skeleton
                key={i}
                className="w-[3rem] h-[3.5rem] rounded-xl"
                style={{
                  opacity: 1 - i * 0.03,
                }}
              />
            ))}
          </div>

          {/* Input feedback banner Skeleton */}
          <div className="flex justify-between items-center px-8 py-4 font-mono text-sm border-t cursor-default bg-background border-border text-muted-foreground mt-auto">
            <div className="flex gap-6 items-center">
              <span className="flex gap-2 items-center">
                <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground/70">
                  Typed
                </span>
                <Skeleton className="h-[28px] w-[2.5rem] rounded-md" />
              </span>
              <span className="flex gap-2 items-center">
                <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground/70">
                  Target
                </span>
                <Skeleton className="h-[28px] w-[2.5rem] rounded-md" />
              </span>
            </div>
            <div className="hidden md:block">
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
        </Card>
      </div>

      {/* Keyboard visualization Skeleton */}
      <div className="w-[90vw] md:w-[60vw] h-[24vw] md:h-[16vw] my-10 bg-card/50 rounded-3xl border border-border/50 shadow-sm flex flex-col justify-between p-4 md:p-6 opacity-60">
        <Skeleton className="w-full h-[18%] rounded-lg" />
        <Skeleton className="w-[95%] h-[18%] rounded-lg mx-auto" />
        <Skeleton className="w-[90%] h-[18%] rounded-lg mx-auto" />
        <Skeleton className="w-[85%] h-[18%] rounded-lg mx-auto" />
      </div>
    </main>
  );
}
