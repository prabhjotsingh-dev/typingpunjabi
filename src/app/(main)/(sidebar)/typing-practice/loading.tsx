import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="flex flex-col gap-2 p-4 mx-auto w-full max-w-5xl min-h-full md:gap-4 md:p-8">
      <div className="flex flex-col pb-4 w-full">
        {/* Practice Configurator Skeleton */}
        <div className="flex flex-col gap-6 mt-4 lg:flex-row">
          {/* Left Column: Practice Mode */}
          <div className="flex flex-col w-full lg:w-[65%] gap-6">
            <div className="rounded-2xl border border-border/50 bg-card shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden">
              <div className="px-5 py-6 border-b border-border/30 bg-muted/10">
                <Skeleton className="w-48 h-7" />
              </div>
              <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} className="h-[72px] rounded-2xl" />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Time & Launch */}
          <div className="flex flex-col w-full lg:w-[35%] gap-6">
            <div className="p-4 bg-card border border-border/50 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] flex flex-col gap-6 w-full">
              <div className="flex flex-col flex-1 gap-2 justify-center">
                <Skeleton className="w-36 h-7" />
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-[82px] rounded-2xl" />
                  ))}
                  <Skeleton className="h-[68px] rounded-2xl col-span-3" />
                </div>
              </div>

              <div className="flex flex-col gap-4 justify-center items-center p-5 w-full rounded-2xl border bg-muted/20 border-border/30">
                <div className="text-center">
                  <Skeleton className="mx-auto mb-2 w-20 h-3" />
                  <Skeleton className="mx-auto w-28 h-9" />
                </div>
                <Skeleton className="w-full h-12 rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
