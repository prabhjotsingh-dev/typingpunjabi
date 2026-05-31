import React from "react";

export default function Loading() {
  return (
    <main className="flex w-full min-h-[calc(100svh-3.5rem)] bg-background font-sans">
      {/* Sidebar Skeleton */}
      <aside className="w-[280px] hidden md:flex flex-col border-r border-border bg-card p-6 animate-pulse">
        <div className="mb-10 w-3/4 h-8 rounded-md bg-muted"></div>

        <div className="space-y-4">
          <div className="w-full h-10 rounded-lg bg-muted/70"></div>
          <div className="w-full h-10 rounded-lg bg-muted/40"></div>
          <div className="w-full h-10 rounded-lg bg-muted/40"></div>
        </div>

        <div className="mt-auto w-full h-12 rounded-xl bg-muted/70"></div>
      </aside>

      {/* Main Content Skeleton */}
      <section className="flex overflow-hidden flex-col flex-1 gap-8 p-6 animate-pulse md:p-10">
        {/* Section Header Skeleton */}
        <div className="space-y-3">
          <div className="w-48 h-10 rounded-lg bg-muted"></div>
          <div className="w-72 h-5 rounded-md bg-muted/60"></div>
        </div>

        {/* Lessons Group Skeleton 1 */}
        <div className="space-y-4 w-full max-w-4xl">
          <div className="ml-2 w-32 h-6 rounded bg-muted"></div>
          <div className="bg-card border border-border/60 shadow-sm rounded-[1.5rem] p-2.5 space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-[72px] bg-background rounded-xl border border-border/50 flex items-center justify-between px-6"
              >
                <div className="w-1/3 h-5 rounded bg-muted"></div>
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-muted"></div>
                  <div className="w-6 h-6 rounded-full bg-muted"></div>
                  <div className="w-6 h-6 rounded-full bg-muted"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lessons Group Skeleton 2 */}
        <div className="mt-4 space-y-4 w-full max-w-4xl opacity-70">
          <div className="ml-2 w-40 h-6 rounded bg-muted"></div>
          <div className="bg-card border border-border/60 shadow-sm rounded-[1.5rem] p-2.5 space-y-2">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-[72px] bg-background rounded-xl border border-border/50 flex items-center justify-between px-6"
              >
                <div className="w-1/4 h-5 rounded bg-muted"></div>
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-muted"></div>
                  <div className="w-6 h-6 rounded-full bg-muted"></div>
                  <div className="w-6 h-6 rounded-full bg-muted"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
