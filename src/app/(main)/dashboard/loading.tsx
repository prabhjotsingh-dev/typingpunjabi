import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="min-h-[100dvh] bg-surface-muted px-4 py-12 md:p-12 lg:p-16">
      <div className="mx-auto space-y-12 max-w-7xl">
        {/* HEADER SECTION SKELETON */}
        <header className="flex flex-col gap-6 justify-between md:flex-row md:items-end">
          <div className="space-y-4">
            <div className="flex gap-3 items-center">
              <Skeleton className="w-64 h-10 md:h-12 md:w-80 bg-surface border border-border/40 shadow-sm" />
              <Skeleton className="w-20 h-6 rounded-full bg-surface border border-border/40 shadow-sm" />
            </div>
            <Skeleton className="w-48 h-6 bg-surface border border-border/40 shadow-sm" />
          </div>

          <Skeleton className="h-14 w-full md:w-[450px] rounded-3xl bg-surface border border-border/40 shadow-sm" />
        </header>

        {/* BENTO GRID 2.0 SKELETON */}
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">
          {/* PRIMARY METRIC CARD */}
          <Skeleton className="col-span-1 md:col-span-2 xl:col-span-2 rounded-[2.5rem] min-h-[260px] bg-primary/20 border border-primary/30 shadow-sm" />

          {/* SECONDARY METRIC CARD */}
          <Skeleton className="col-span-1 rounded-[2.5rem] min-h-[260px] bg-surface border border-border/40 shadow-sm" />

          {/* ACCURACY CARD */}
          <Skeleton className="col-span-1 rounded-[2.5rem] min-h-[260px] bg-surface border border-border/40 shadow-sm" />

          {/* RECENT LESSON */}
          <Skeleton className="col-span-1 md:col-span-2 xl:col-span-3 rounded-[2.5rem] min-h-[200px] bg-surface border border-border/40 shadow-sm" />

          {/* CONSISTENCY CARD */}
          <Skeleton className="col-span-1 md:col-span-1 xl:col-span-1 rounded-[2.5rem] min-h-[200px] bg-surface border border-border/40 shadow-sm" />
        </div>

        {/* LESSON HISTORY LIST SKELETON */}
        <Skeleton className="w-full rounded-[2.5rem] min-h-[300px] bg-surface border border-border/40 shadow-sm" />
      </div>
    </div>
  );
}
