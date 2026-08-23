"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import ResultPageUI from "@/components/pages/resultPageUI";

interface GuestResultProps {
  lessonId: string;
  listLink: string;
  againLink: string;
  nextLink?: string;
  listLabel?: string;
  againLabel?: string;
}

interface GuestResultEntry {
  accuracy: number;
  wpm: number;
  lesson_title: string;
  lesson_id: string;
  created_at: string;
}

export default function GuestResult({
  lessonId,
  listLink,
  againLink,
  nextLink,
  listLabel,
  againLabel,
}: GuestResultProps) {
  const [result, setResult] = useState<GuestResultEntry | null | undefined>(
    undefined
  );

  useEffect(() => {
    try {
      const guestResults = JSON.parse(
        localStorage.getItem("guest_typing_results") || "[]"
      ) as GuestResultEntry[];

      const matches = guestResults
        .filter((r) => r.lesson_id === lessonId)
        .sort((a, b) => (a.created_at < b.created_at ? 1 : -1));

      setResult(matches[0] || null);
    } catch {
      setResult(null);
    }
  }, [lessonId]);

  if (result === undefined) {
    return (
      <div className="h-[calc(100svh-3.5rem)] flex items-center justify-center bg-background text-muted-foreground font-sans overflow-hidden">
        <Loader2 className="w-8 h-8 opacity-50 animate-spin" />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="h-[calc(100svh-3.5rem)] flex items-center justify-center bg-background text-muted-foreground font-sans overflow-hidden">
        <div className="flex flex-col gap-4 items-center">
          <Loader2 className="w-8 h-8 opacity-50 animate-spin" />
          <p className="text-sm font-medium tracking-tight">
            Error loading result
          </p>
        </div>
      </div>
    );
  }

  return (
    <ResultPageUI
      speed={result.wpm ?? 0}
      accuracy={result.accuracy ?? 0}
      lesson_title={result.lesson_title}
      listLink={listLink}
      againLink={againLink}
      nextLink={nextLink}
      listLabel={listLabel}
      againLabel={againLabel}
    />
  );
}