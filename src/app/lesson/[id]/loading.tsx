import React from "react";
import { Card } from "@/components/ui/card";

export default function Loading() {
  return (
    <main className="min-h-[100dvh] flex flex-col items-center pt-8 md:pt-16 pb-24 bg-background font-sans overflow-hidden">
      {/* Header Area Skeleton */}
      <div className="flex flex-col gap-6 justify-between items-start px-6 mb-8 w-full max-w-5xl md:flex-row md:items-end">
        <div className="space-y-3 w-full max-w-xs animate-pulse">
          <div className="w-3/4 h-9 rounded-lg md:h-10 bg-muted"></div>
          <div className="w-full h-4 rounded-md md:h-5 bg-muted/60"></div>
        </div>

        {/* Timer and Stats Panel Skeleton */}
        <Card className="px-6 py-3 border-border/60 shadow-sm flex items-center gap-6 rounded-full bg-card/80 h-[52px] md:h-[56px] w-full md:w-[280px] animate-pulse">
          <div className="w-full h-5 rounded bg-muted/50"></div>
          <div className="w-full h-5 rounded border-l bg-muted/50 border-border"></div>
        </Card>
      </div>

      {/* Main Typing Area Skeleton */}
      <div className="relative px-4 w-full max-w-5xl md:px-6">
        <Card className="w-full border-border/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] rounded-[2.5rem] bg-card overflow-hidden flex flex-col min-h-[385px] animate-pulse">
          {/* Placeholder characters */}
          <div className="flex flex-wrap flex-1 gap-4 content-start p-8 md:p-16">
            {Array.from({ length: 18 }).map((_, i) => (
              <div
                key={i}
                className="w-[3rem] h-[3.5rem] bg-muted/70 rounded-xl"
                style={{
                  opacity: 1 - i * 0.04, // Fades out nicely to the right
                }}
              ></div>
            ))}
          </div>

          {/* Input feedback banner Skeleton */}
          <div className="bg-background border-t border-border py-4 px-8 flex items-center justify-between h-[61px]">
            <div className="flex gap-6 items-center">
              <div className="w-24 h-6 rounded-md bg-muted"></div>
              <div className="w-24 h-6 rounded-md bg-muted"></div>
            </div>
          </div>
        </Card>
      </div>

      {/* Keyboard visualization Skeleton */}
      <div className="px-4 mt-12 w-full max-w-4xl md:px-0">
        <div className="w-full h-[220px] md:h-[260px] bg-card rounded-[2rem] border border-border shadow-sm animate-pulse flex flex-col justify-between p-6">
          {/* Fake keyboard rows */}
          <div className="w-full h-10 rounded-xl md:h-12 bg-muted/30"></div>
          <div className="w-[95%] h-10 md:h-12 bg-muted/30 rounded-xl mx-auto"></div>
          <div className="w-[90%] h-10 md:h-12 bg-muted/30 rounded-xl mx-auto"></div>
          <div className="w-[85%] h-10 md:h-12 bg-muted/30 rounded-xl mx-auto"></div>
        </div>
      </div>
    </main>
  );
}
