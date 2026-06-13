"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Activity,
  Clock,
  Target,
  Zap,
  Settings,
  BookOpen,
  Trophy,
} from "lucide-react";
import DashboardCard from "@/components/common/DashboardCard";
import { formatTime, formatDate } from "@/comman/utils";

interface DashboardPageUIProps {
  initialData: any;
  lessonsHistory: any[];
}

export default function DashboardPageUI({
  initialData,
  lessonsHistory,
}: DashboardPageUIProps) {
  const [data, setData] = useState<any>(initialData);

  const recentLesson = lessonsHistory[0];
  const pastLessons = lessonsHistory.slice(1);

  if (!data?.average_accuracy) {
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
        <header className="flex flex-col gap-6 justify-between md:flex-row md:items-end">
          <div className="space-y-2">
            <div className="flex gap-3 items-center">
              <h1 className="text-2xl font-semibold tracking-tighter md:text-4xl">
                Welcome back, {data.username}
              </h1>
              <Badge
                variant={
                  data.account_type === "registered" ? "default" : "secondary"
                }
                className="mt-1 h-6 tracking-wide uppercase rounded-full md:mt-2"
              >
                {data.account_type === "registered" ? "loged In" : "Guest"}
              </Badge>
            </div>
            <p className="text-lg tracking-tight text-text-muted">
              Member since {formatDate(data.profiles_created_at)}
            </p>
          </div>

          <DashboardCard
            className={{
              card: "flex flex-col gap-2 justify-between w-full rounded-3xl md:p-4 bg-surface",
              content: "font-bold md:text-5xl",
            }}
            content={
              <div className="flex flex-row justify-between items-center px-8 w-full">
                <div className="flex gap-2 items-center mr-4 w-full rounded-full">
                  <Settings className="w-4 h-4 text-text-muted" />
                  <Select
                    value={data.theme_preference}
                    onValueChange={(v: "dark" | "light") =>
                      setData({ ...data, theme_preference: v })
                    }
                  >
                    <SelectTrigger className="h-8 rounded-full border-none shadow-none bg-surface-muted hover:bg-glass-hover focus:ring-0 text-text">
                      <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dark">Dark Theme</SelectItem>
                      <SelectItem value="light">Light Theme</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 items-center w-full">
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
                    {data.is_profile_public
                      ? "Public Profile"
                      : "Private Profile"}
                  </label>
                </div>
                <div className="flex gap-2 items-center w-full">
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
                    {data.show_on_leaderboard
                      ? "Show on Leaderboard"
                      : "Hide on Leaderboard"}
                  </label>
                </div>
              </div>
            }
          ></DashboardCard>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">
          <DashboardCard
            className={{
              card: "col-span-1 md:col-span-2 xl:col-span-2 bg-primary text-primary-foreground shadow-[0_20px_40px_-15px_rgba(3,105,161,0.2)] hover:scale-[1.02] overflow-hidden group border-none",
            }}
            header={
              <div className="flex gap-2">
                <Trophy className="w-5 h-5" /> <span>Personal Best</span>
              </div>
            }
            content={
              <span className="text-4xl">
                {data.highest_wpm} <span className="text-sm">WPM</span>
              </span>
            }
            footer={
              <span className="font-bold">Highest CPM:{data.highest_cpm}</span>
            }
          >
            <div className="absolute inset-0 border border-white/10 rounded-[2.5rem] pointer-events-none shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]" />
            <div className="absolute -right-12 -bottom-12 z-0 w-64 h-64 rounded-full blur-3xl transition-colors duration-700 pointer-events-none bg-white/5 group-hover:bg-white/10" />
          </DashboardCard>

          <DashboardCard
            header={
              <div className="flex gap-2">
                <Zap className="w-5 h-5" /> <span>Average Speed</span>
              </div>
            }
            content={
              <span className="text-4xl text-text">
                {data.average_wpm}{" "}
                <span className="text-sm text-muted-foreground">WPM</span>
              </span>
            }
            footer={<span className="font-bold">{data.average_cpm}CPM</span>}
          />
          <DashboardCard
            header={
              <div className="flex gap-2">
                <Target className="w-5 h-5" /> <span>Average Accuracy</span>
              </div>
            }
            content={
              <span className="text-4xl text-text">
                {data.average_accuracy?.toFixed(1)}%
              </span>
            }
          />

          {recentLesson && (
            <DashboardCard
              className={{
                card: "col-span-1 gap-8 justify-between md:col-span-2 xl:col-span-3 md:flex-row md:items-center hover:border-accent",
              }}
            >
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
            </DashboardCard>
          )}

          <DashboardCard
            className={{
              card: "flex-col col-span-1 gap-6 justify-center p-8 md:col-span-1 xl:col-span-1 md:p-8",
            }}
          >
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
          </DashboardCard>
        </div>

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

        <div className="flex justify-center pt-8 text-xs font-medium opacity-60 text-text-muted">
          Stats last updated: {formatDate(data.user_stats_updated_at)}
        </div>
      </div>
    </div>
  );
}
