import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="min-h-[100dvh] bg-surface-muted px-4 py-12 md:p-12 lg:p-16">
      <div className="mx-auto space-y-12 max-w-7xl">
        {/* HEADER SECTION SKELETON */}
        <header className="flex flex-col gap-6 justify-between md:flex-row md:items-end">
          <div className="space-y-4">
            <div className="flex gap-3 items-center">
              <Skeleton className="w-64 h-10 md:h-12 md:w-80" />
              <Skeleton className="w-20 h-6 rounded-full" />
            </div>
            <Skeleton className="w-48 h-6" />
          </div>

          <Skeleton className="h-14 w-full md:w-[450px] rounded-3xl" />
        </header>

        {/* BENTO GRID 2.0 SKELETON */}
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">
          {/* PRIMARY METRIC CARD */}
          <Skeleton className="col-span-1 md:col-span-2 xl:col-span-2 rounded-[2.5rem] min-h-[260px]" />

          {/* SECONDARY METRIC CARD */}
          <Skeleton className="col-span-1 rounded-[2.5rem] min-h-[260px]" />

          {/* ACCURACY CARD */}
          <Skeleton className="col-span-1 rounded-[2.5rem] min-h-[260px]" />

          {/* RECENT LESSON */}
          <Skeleton className="col-span-1 md:col-span-2 xl:col-span-3 rounded-[2.5rem] min-h-[200px]" />

          {/* CONSISTENCY CARD */}
          <Skeleton className="col-span-1 md:col-span-1 xl:col-span-1 rounded-[2.5rem] min-h-[200px]" />
        </div>

        {/* LESSON HISTORY LIST SKELETON */}
        <Skeleton className="w-full rounded-[2.5rem] min-h-[300px]" />
      </div>
    </div>
  );
}
