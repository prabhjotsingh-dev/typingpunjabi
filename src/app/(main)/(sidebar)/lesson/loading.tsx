import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="flex flex-col flex-1 gap-6 p-4 md:p-8 w-full max-w-5xl mx-auto hide-scrollbar">
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
  );
}
