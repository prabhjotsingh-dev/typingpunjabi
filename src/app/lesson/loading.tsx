import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="flex w-full min-h-[calc(100svh-4rem)] bg-background font-sans">
      {/* Sidebar Skeleton */}
      <aside className="w-[280px] hidden md:flex flex-col border-r border-border bg-card p-6">
        <Skeleton className="mb-10 w-3/4 h-8" />

        <div className="space-y-4">
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
        </div>

        <Skeleton className="mt-auto w-full h-12" />
      </aside>

      {/* Main Content Skeleton */}
      <section className="flex overflow-hidden flex-col flex-1 gap-6 p-6 w-full md:p-10 hide-scrollbar">
        {/* Section Header Skeleton */}
        <div>
          <Skeleton className="w-48 h-9 md:h-10 mb-2" />
          <Skeleton className="w-72 h-5 mt-2" />
        </div>

        <div className="flex flex-col gap-10 w-full mt-4">
          {/* Lessons Group Skeleton 1 */}
          <div className="flex flex-col space-y-4 w-full">
            <Skeleton className="ml-2 w-32 h-7" />
            
            <div className="bg-card border border-border shadow-sm rounded-[1.5rem] p-2.5 space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-6 h-[72px] rounded-xl border bg-background border-border/40"
                >
                  <Skeleton className="w-1/3 h-5" />
                  
                  <div className="flex gap-1.5 items-center">
                    <Skeleton className="w-5 h-5 rounded-full" />
                    <Skeleton className="w-5 h-5 rounded-full" />
                    <Skeleton className="w-5 h-5 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lessons Group Skeleton 2 */}
          <div className="flex flex-col space-y-4 w-full opacity-70">
            <Skeleton className="ml-2 w-40 h-7" />
            
            <div className="bg-card border border-border shadow-sm rounded-[1.5rem] p-2.5 space-y-2">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-6 h-[72px] rounded-xl border bg-background border-border/40"
                >
                  <Skeleton className="w-1/4 h-5" />
                  
                  <div className="flex gap-1.5 items-center">
                    <Skeleton className="w-5 h-5 rounded-full" />
                    <Skeleton className="w-5 h-5 rounded-full" />
                    <Skeleton className="w-5 h-5 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
