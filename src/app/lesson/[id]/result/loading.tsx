import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="h-[calc(100svh-3.5rem)] w-full bg-[#f9fafb] px-4 md:px-8 py-6 overflow-hidden flex items-center justify-center">
      <div className="max-w-[1300px] w-full grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-16 items-center">
        
        {/* Left Aligned Content - Asymmetric Hero */}
        <div className="flex flex-col space-y-6 lg:space-y-8">
          <div className="space-y-4 lg:space-y-6 max-w-2xl">
            <Skeleton className="h-6 w-28 rounded-full" />
            
            <div className="space-y-3">
              <Skeleton className="h-[4rem] w-full max-w-md rounded-xl" />
            </div>
            
            <div className="space-y-2">
              <Skeleton className="h-5 w-full max-w-[45ch] rounded-lg" />
              <Skeleton className="h-5 w-[35ch] rounded-lg" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 pt-2">
            <Skeleton className="h-12 lg:h-14 w-44 lg:w-48 rounded-full" />
            <Skeleton className="h-12 lg:h-14 w-40 lg:w-44 rounded-full" />
          </div>
          
          <div className="pt-2 lg:pt-4">
            <Skeleton className="h-4 w-28 rounded-lg" />
          </div>
        </div>

        {/* Right Side - Bento Grid 2.0 Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
          
          {/* Main Metric Card */}
          <div className="sm:col-span-2 relative overflow-hidden rounded-[2rem] bg-white p-6 md:p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] ring-1 ring-slate-200/50">
            <div className="flex items-center justify-between mb-6 lg:mb-8">
              <Skeleton className="h-4 w-16 rounded-lg" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            
            <div className="flex items-baseline gap-2 lg:gap-3">
              <Skeleton className="h-20 w-28 rounded-2xl" />
              <Skeleton className="h-5 w-10 rounded-lg" />
            </div>
          </div>

          {/* Accuracy Card */}
          <div className="relative overflow-hidden rounded-[1.5rem] bg-white p-5 md:p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] ring-1 ring-slate-200/50">
            <div className="flex items-center justify-between mb-6">
              <Skeleton className="h-4 w-16 rounded-lg" />
              <Skeleton className="h-4 w-4 rounded-md" />
            </div>
            <div className="flex items-baseline gap-1">
              <Skeleton className="h-10 w-14 rounded-xl" />
              <Skeleton className="h-4 w-5 rounded-lg" />
            </div>
            <div className="mt-4 lg:mt-5 space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-3 w-20 rounded-md" />
                <Skeleton className="h-3 w-8 rounded-md" />
              </div>
              <Skeleton className="h-1.5 w-full rounded-full" />
            </div>
          </div>

          {/* Stars Card */}
          <div className="relative overflow-hidden rounded-[1.5rem] bg-white p-5 md:p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] ring-1 ring-slate-200/50">
            <div className="flex items-center justify-between mb-4 lg:mb-6">
              <Skeleton className="h-4 w-12 rounded-lg" />
              <Skeleton className="h-4 w-4 rounded-md" />
            </div>
            <div className="flex items-center gap-1 lg:gap-1.5 mt-auto pt-2">
              {[1, 2, 3].map((n) => (
                <Skeleton key={n} className="w-7 h-7 lg:w-8 lg:h-8 rounded-full" />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
