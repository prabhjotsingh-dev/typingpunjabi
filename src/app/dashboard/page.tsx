"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getDashboardData, getLessonstats } from "@/supabaseFunctions/getData";

import {
  Activity,
  Clock,
  Target,
  Zap,
  Settings,
  BookOpen,
  Trophy,
} from "lucide-react";

// No mock data - fetching directly from Supabase

const formatTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}h ${m}m`;
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [lessonsHistory, setLessonsHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const recentLesson = lessonsHistory[0];
  const pastLessons = lessonsHistory.slice(1);

  useEffect(() => {
    async function loadData() {
      try {
        const [dashData, lessonsData] = await Promise.all([
          getDashboardData(),
          getLessonstats(),
        ]);
        if (dashData) setData(dashData);
        if (lessonsData) setLessonsHistory(lessonsData);
        debugger;
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[100dvh] bg-surface-muted p-8 flex items-center justify-center">
        <div className="flex flex-col gap-4 items-center animate-pulse">
          <div className="w-12 h-12 rounded-full border-4 animate-spin border-primary border-t-transparent" />
          <p className="font-medium tracking-tight text-text-muted">
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-[100dvh] bg-surface-muted p-8 flex items-center justify-center">
        <div className="space-y-4 max-w-md text-center">
          <Trophy className="mx-auto mb-6 w-20 h-20 opacity-30 text-primary" />
          <h2 className="text-3xl font-bold tracking-tight text-text">
            No typing data yet
          </h2>
          <p className="text-lg text-text-muted">
            Complete your first lesson to see your personalized dashboard and
            typing stats here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-surface-muted px-4 py-12 md:p-12 lg:p-16 text-text">
      <div className="mx-auto space-y-12 max-w-7xl">
        {/* HEADER SECTION */}
        <header className="flex flex-col gap-6 justify-between md:flex-row md:items-end">
          <div className="space-y-2">
            <div className="flex gap-3 items-center">
              <h1 className="text-4xl font-semibold tracking-tighter md:text-5xl">
                Welcome back, {data.username}
              </h1>
              <Badge
                variant={
                  data.account_type === "registered" ? "default" : "secondary"
                }
                className="mt-1 h-6 tracking-wide uppercase md:mt-2"
              >
                {data.account_type}
              </Badge>
            </div>
            <p className="text-lg tracking-tight text-text-muted">
              Member since {formatDate(data.profiles_created_at)}
            </p>
          </div>

          {/* SETTINGS PANEL (Contextual UI Focus) */}
          <div className="flex flex-wrap items-center gap-4 bg-surface p-4 rounded-3xl border border-border shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)]">
            <div className="flex gap-2 items-center mr-4">
              <Settings className="w-4 h-4 text-text-muted" />
              <span className="text-sm font-medium tracking-wider uppercase text-text-muted">
                Preferences
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <Switch
                id="public-profile"
                checked={data.is_profile_public}
                onCheckedChange={(c) =>
                  setData({ ...data, is_profile_public: c })
                }
              />
              <label
                htmlFor="public-profile"
                className="text-sm font-medium cursor-pointer select-none text-text"
              >
                Public
              </label>
            </div>
            <div className="w-[1px] h-4 bg-border hidden sm:block mx-2" />
            <div className="flex gap-2 items-center">
              <Switch
                id="leaderboard"
                checked={data.show_on_leaderboard}
                onCheckedChange={(c) =>
                  setData({ ...data, show_on_leaderboard: c })
                }
              />
              <label
                htmlFor="leaderboard"
                className="text-sm font-medium cursor-pointer select-none text-text"
              >
                Leaderboard
              </label>
            </div>
            <div className="w-[1px] h-4 bg-border hidden sm:block mx-2" />
            <div className="flex gap-2 items-center">
              <Select
                value={data.theme_preference}
                onValueChange={(v: "dark" | "light") =>
                  setData({ ...data, theme_preference: v })
                }
              >
                <SelectTrigger className="h-8 border-none shadow-none bg-surface-muted hover:bg-glass-hover focus:ring-0 text-text">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dark">Dark Theme</SelectItem>
                  <SelectItem value="light">Light Theme</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </header>

        {/* BENTO GRID 2.0 */}
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">
          {/* PRIMARY METRIC CARD (Highest Speed) */}
          <div className="col-span-1 md:col-span-2 xl:col-span-2 bg-primary text-primary-foreground p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(3,105,161,0.2)] flex flex-col justify-between relative overflow-hidden group transition-transform duration-500 hover:scale-[1.02]">
            {/* Liquid glass inner ring */}
            <div className="absolute inset-0 border border-white/10 rounded-[2.5rem] pointer-events-none shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]" />

            <div className="flex relative z-10 gap-3 items-center mb-8 opacity-80">
              <Trophy className="w-5 h-5" />
              <span className="text-sm font-medium tracking-tight uppercase">
                Personal Best
              </span>
            </div>

            <div className="flex relative z-10 gap-4 items-end">
              <div className="text-7xl font-bold tracking-tighter leading-none md:text-8xl">
                {data.highest_wpm}
              </div>
              <div className="pb-2 text-xl font-medium text-primary-light">
                WPM
              </div>
            </div>

            <div className="relative z-10 mt-4 text-sm opacity-80">
              Highest CPM:{" "}
              <span className="font-mono font-bold">{data.highest_cpm}</span>
            </div>

            {/* Decorative background element */}
            <div className="absolute -right-12 -bottom-12 z-0 w-64 h-64 rounded-full blur-3xl transition-colors duration-700 pointer-events-none bg-white/5 group-hover:bg-white/10" />
          </div>

          {/* SECONDARY METRIC CARD (Average Speed) */}
          <div className="col-span-1 bg-surface border border-border p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] flex flex-col justify-between transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1">
            <div className="flex justify-between items-center mb-8">
              <div className="flex gap-3 items-center text-text-muted">
                <Zap className="w-5 h-5" />
                <span className="text-sm font-medium tracking-tight uppercase">
                  Average Speed
                </span>
              </div>
            </div>
            <div>
              <div className="flex gap-2 items-end">
                <div className="text-5xl font-bold tracking-tighter text-text">
                  {data.average_wpm}
                </div>
                <div className="pb-1 font-medium text-text-muted">WPM</div>
              </div>
              <div className="mt-2 text-sm text-text-muted">
                {data.average_cpm} <span className="font-mono">CPM</span>
              </div>
            </div>
          </div>

          {/* ACCURACY CARD */}
          <div className="col-span-1 bg-surface border border-border p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] flex flex-col justify-between transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1">
            <div className="flex gap-3 items-center mb-8 text-text-muted">
              <Target className="w-5 h-5" />
              <span className="text-sm font-medium tracking-tight uppercase">
                Accuracy
              </span>
            </div>
            <div className="flex gap-2 items-end">
              <div className="text-5xl font-bold tracking-tighter text-text">
                {data.average_accuracy.toFixed(1)}
              </div>
              <div className="pb-1 font-medium text-text-muted">%</div>
            </div>
          </div>

          {/* RECENT LESSON / PRE-LESSON START */}
          {recentLesson && (
            <div className="col-span-1 md:col-span-2 xl:col-span-3 bg-surface border border-border p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] flex flex-col md:flex-row md:items-center justify-between gap-8 transition-all duration-300 hover:border-accent">
              <div className="flex-1 space-y-4">
                <div className="flex gap-3 items-center text-accent">
                  <BookOpen className="w-5 h-5" />
                  <span className="text-xs font-semibold tracking-tight uppercase">
                    Continue Playing
                  </span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight leading-tight text-text">
                  {recentLesson.lesson_title}
                </h3>
                <p className="flex gap-2 items-center text-sm text-text-muted">
                  <span>Played {recentLesson.times_played} times</span>
                  <span className="opacity-50">•</span>
                  <span>
                    Last active {formatDate(recentLesson.last_played_at)}
                  </span>
                </p>
              </div>

              <div className="flex gap-8 items-center px-6 py-4 rounded-3xl border bg-surface-muted border-border">
                <div>
                  <p className="mb-1 text-xs font-medium tracking-wider uppercase text-text-muted">
                    Best WPM
                  </p>
                  <p className="text-2xl font-bold tracking-tighter text-text">
                    {Math.round(recentLesson.highest_wpm)}
                  </p>
                </div>
                <div className="w-[1px] h-8 bg-border" />
                <div>
                  <p className="mb-1 text-xs font-medium tracking-wider uppercase text-text-muted">
                    Best Accuracy
                  </p>
                  <p className="text-2xl font-bold tracking-tighter text-text">
                    {recentLesson.highest_accuracy.toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* CONSISTENCY CARD (Total Tests & Time) */}
          <div className="col-span-1 md:col-span-1 xl:col-span-1 bg-surface border border-border p-8 rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] flex flex-col justify-center gap-6 transition-all duration-300 hover:-translate-y-1">
            <div className="flex gap-4 items-center">
              <div className="flex justify-center items-center w-12 h-12 rounded-full bg-secondary shrink-0">
                <Activity className="w-5 h-5 text-secondary-foreground" />
              </div>
              <div>
                <p className="mb-1 text-xs font-medium tracking-wider uppercase text-text-muted">
                  Total Tests
                </p>
                <p className="text-2xl font-bold tracking-tight text-text">
                  {data.total_tests_completed}
                </p>
              </div>
            </div>

            <div className="w-full h-[1px] bg-border" />

            <div className="flex gap-4 items-center">
              <div className="flex justify-center items-center w-12 h-12 rounded-full bg-accent shrink-0">
                <Clock className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <p className="mb-1 text-xs font-medium tracking-wider uppercase text-text-muted">
                  Time Typed
                </p>
                <p className="text-2xl font-bold tracking-tight text-text">
                  {formatTime(data.total_time_typed_seconds)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* LESSON HISTORY LIST */}
        {pastLessons.length > 0 && (
          <div className="bg-surface border border-border p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] space-y-6">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold tracking-tight text-text">
                Lesson History
              </h3>
              <Badge
                variant="secondary"
                className="uppercase tracking-widest text-[10px]"
              >
                {pastLessons.length} Completed
              </Badge>
            </div>

            <div className="max-h-[320px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
              {pastLessons.map((lesson) => (
                <div
                  key={lesson.lesson_id}
                  className="flex justify-between items-center p-4 rounded-2xl border border-transparent transition-colors duration-200 cursor-pointer bg-surface-muted hover:border-border group"
                >
                  <div className="flex gap-4 items-center">
                    <div className="flex justify-center items-center w-10 h-10 rounded-full border bg-surface border-border shrink-0">
                      <BookOpen className="w-4 h-4 text-text-muted" />
                    </div>
                    <div>
                      <p className="font-semibold tracking-tight transition-colors text-text group-hover:text-primary">
                        {lesson.lesson_title}
                      </p>
                      <p className="text-xs text-text-muted">
                        {formatDate(lesson.last_played_at)} • Played{" "}
                        {lesson.times_played}x
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6 items-center text-right">
                    <div className="hidden sm:block">
                      <p className="text-[10px] uppercase tracking-wider text-text-muted font-medium mb-1">
                        Accuracy
                      </p>
                      <p className="font-bold text-text">
                        {lesson.highest_accuracy.toFixed(1)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-text-muted font-medium mb-1">
                        WPM
                      </p>
                      <p className="font-bold text-text">
                        {Math.round(lesson.highest_wpm)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FOOTER METADATA */}
        <div className="flex justify-center pt-8 text-xs font-medium opacity-60 text-text-muted">
          Stats last updated: {formatDate(data.user_stats_updated_at)}
        </div>
      </div>
    </div>
  );
}
