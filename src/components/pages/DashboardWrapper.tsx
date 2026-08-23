"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/supabaseServices/AuthProvider";
import DashboardPageUI from "./dashboardPageUI";

interface DashboardWrapperProps {
  initialData: any;
  lessonsHistory: any[];
}

function computeGuestStats(results: any[]) {
  if (!results.length) {
    return { data: null, history: [] };
  }

  const byLesson = new Map<string, any>();
  let sumWpm = 0,
    sumCpm = 0,
    sumAcc = 0,
    totalTime = 0,
    highestWpm = 0,
    highestCpm = 0;
  let firstDate = results[0].created_at;
  let lastDate = results[0].created_at;

  for (const r of results) {
    sumWpm += r.wpm || 0;
    sumCpm += r.cpm || 0;
    sumAcc += r.accuracy || 0;
    totalTime += r.duration_seconds || 0;
    highestWpm = Math.max(highestWpm, r.wpm || 0);
    highestCpm = Math.max(highestCpm, r.cpm || 0);
    if (r.created_at < firstDate) firstDate = r.created_at;
    if (r.created_at > lastDate) lastDate = r.created_at;

    const entry =
      byLesson.get(r.lesson_id) || {
        lesson_id: r.lesson_id,
        lesson_title: r.lesson_title,
        times_played: 0,
        highest_wpm: 0,
        highest_accuracy: 0,
        last_played_at: r.created_at,
      };
    entry.times_played++;
    entry.highest_wpm = Math.max(entry.highest_wpm, r.wpm || 0);
    entry.highest_accuracy = Math.max(
      entry.highest_accuracy,
      r.accuracy || 0
    );
    if (r.created_at > entry.last_played_at) entry.last_played_at = r.created_at;
    byLesson.set(r.lesson_id, entry);
  }

  const n = results.length;
  const history = [...byLesson.values()].sort((a, b) =>
    a.last_played_at < b.last_played_at ? 1 : -1
  );

  return {
    data: {
      username: "Guest",
      account_type: "guest",
      theme_preference: "system",
      is_profile_public: false,
      show_on_leaderboard: false,
      profiles_created_at: firstDate,
      profiles_updated_at: firstDate,
      user_stats_created_at: lastDate,
      user_stats_updated_at: lastDate,
      total_tests_completed: n,
      total_time_typed_seconds: totalTime,
      highest_wpm: highestWpm,
      highest_cpm: highestCpm,
      average_wpm: Math.round(sumWpm / n),
      average_cpm: Math.round(sumCpm / n),
      average_accuracy: sumAcc / n,
    },
    history,
  };
}

export default function DashboardWrapper({
  initialData,
  lessonsHistory,
}: DashboardWrapperProps) {
  const { user } = useAuth();
  const [guestStats, setGuestStats] = useState<{
    data: any;
    history: any[];
  } | null>(null);

  useEffect(() => {
    if (user) return;
    try {
      const results = JSON.parse(
        localStorage.getItem("guest_typing_results") || "[]"
      );
      setGuestStats(computeGuestStats(results));
    } catch {
      setGuestStats({ data: null, history: [] });
    }
  }, [user]);

  if (user) {
    return (
      <DashboardPageUI
        initialData={initialData}
        lessonsHistory={lessonsHistory}
      />
    );
  }

  if (guestStats === null) {
    return (
      <div className="min-h-[100dvh] bg-surface-muted flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <DashboardPageUI
      initialData={guestStats.data}
      lessonsHistory={guestStats.history}
    />
  );
}