import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="flex flex-col gap-2 md:gap-4 p-4 md:p-8 w-full max-w-5xl mx-auto min-h-full">
      <div className="flex flex-col pb-4 w-full">
        {/* Header Skeleton */}
        <div className="mb-2">
          <Skeleton className="w-48 h-9 md:h-10 mb-2" />
          <Skeleton className="w-72 h-5 mt-2" />
        </div>

        {/* Configurator Skeleton */}
        <div className="flex flex-col gap-4 w-full mt-4">
          <div className="p-4 lg:p-6 bg-card border border-border/50 rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] flex flex-col lg:flex-row gap-6 lg:items-stretch max-w-4xl mx-auto w-full">
            {/* Left side (Duration) */}
            <div className="flex flex-col flex-1 justify-center space-y-4">
              <div className="space-y-2">
                <Skeleton className="w-40 h-8" />
                <Skeleton className="w-64 h-4" />
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-[90px] rounded-2xl" />
                ))}
                <Skeleton className="h-[68px] rounded-2xl col-span-3 lg:col-span-1" />
              </div>
            </div>

            {/* Right side (Total Time) */}
            <div className="flex flex-col justify-center items-center p-5 bg-muted/20 rounded-2xl border border-border/30 w-full lg:w-[260px] space-y-4">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="flex flex-col items-center gap-2">
                <Skeleton className="w-20 h-4" />
                <Skeleton className="w-28 h-10" />
              </div>
              <Skeleton className="w-full h-12 rounded-xl mt-2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
