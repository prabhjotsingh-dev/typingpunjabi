import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="h-[calc(100svh-3.5rem)] w-full bg-background text-foreground font-sans px-4 md:px-6 flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-[1000px] grid grid-cols-1 gap-6 items-center">
        
        {/* Left Side - Text & Actions */}
        <div className="flex flex-col space-y-5">
          <div className="space-y-3">
            <Skeleton className="h-6 w-32 rounded-full" />
            
            <div className="space-y-2">
              <Skeleton className="h-10 md:h-12 w-full max-w-sm rounded-xl" />
            </div>
            
            <div className="space-y-1.5 pt-1">
              <Skeleton className="h-4 w-full max-w-[35ch] rounded-lg" />
              <Skeleton className="h-4 w-[28ch] rounded-lg" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1">
            <Skeleton className="h-10 rounded-xl" />
            <Skeleton className="h-10 rounded-xl" />
            <Skeleton className="h-10 rounded-xl" />
          </div>
        </div>

        {/* Right Side - Stats Grid */}
        <div className="flex flex-col mb-4 sm:flex-row gap-3">
          
          {/* Speed Card */}
          <Card className="flex-1 overflow-hidden rounded-[1.5rem] shadow-sm bg-card border-border/60">
            <CardHeader className="p-4 md:p-5 pb-0 md:pb-0 flex flex-row items-center justify-between space-y-0">
              <Skeleton className="h-3.5 w-12 rounded-md" />
              <Skeleton className="h-7 w-7 rounded-full" />
            </CardHeader>
            <CardContent className="p-4 md:p-5 pt-2 md:pt-3">
              <div className="flex items-baseline gap-2">
                <Skeleton className="h-[3rem] md:h-[3.75rem] w-20 md:w-24 rounded-lg" />
                <Skeleton className="h-4 w-8 rounded-md" />
              </div>
            </CardContent>
          </Card>

          {/* Accuracy Card */}
          <Card className="flex-1 overflow-hidden rounded-[1.5rem] shadow-sm flex flex-col justify-between bg-card border-border/60">
            <CardHeader className="p-4 md:p-5 pb-0 md:pb-0 flex flex-row items-center justify-between space-y-0">
              <Skeleton className="h-3.5 w-16 rounded-md" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </CardHeader>
            <CardContent className="p-4 md:p-5 pt-3 md:pt-4 flex flex-col justify-end">
              <div className="flex items-baseline gap-1 mb-3">
                <Skeleton className="h-[2.5rem] md:h-[3rem] w-16 md:w-20 rounded-lg" />
                <Skeleton className="h-3 w-4 rounded-md" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-2.5 w-10 rounded-sm" />
                  <Skeleton className="h-2.5 w-6 rounded-sm" />
                </div>
                <Skeleton className="h-1.5 w-full rounded-full" />
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
