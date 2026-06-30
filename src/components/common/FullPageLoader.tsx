"use client";

import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

interface FullPageLoaderProps {
  message?: string;
  className?: string;
  overlay?: boolean;
}

export default function FullPageLoader({
  message = "Loading...",
  className,
  overlay = true,
}: FullPageLoaderProps) {
  const content = (
    <div className="flex flex-col items-center gap-3">
      <Spinner className="size-7 opacity-60" />
      {message && (
        <p className="text-sm font-medium tracking-tight text-muted-foreground/70">
          {message}
        </p>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center",
          "bg-background/50 backdrop-blur-sm",
          "animate-in fade-in duration-500 fill-mode-both",
          className
        )}
      >
        <div
          className={cn(
            "flex flex-col items-center gap-3",
            "px-6 py-5 rounded-2xl",
            "bg-background/40 border border-border/30",
            "shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
          )}
        >
          {content}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "h-[calc(100svh-3.5rem)] flex items-center justify-center bg-background text-muted-foreground font-sans overflow-hidden",
        className
      )}
    >
      {content}
    </div>
  );
}
