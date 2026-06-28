"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Timer, ArrowRight, Clock } from "lucide-react";

interface SpeedTestConfiguratorProps {
  lessonId: string;
}

export function SpeedTestConfigurator({
  lessonId,
}: SpeedTestConfiguratorProps) {
  const router = useRouter();
  const [selectedMinutes, setSelectedMinutes] = useState<number>(1);
  const [customMinutes, setCustomMinutes] = useState<string>("");

  const parseTime = (val: string): number => {
    const trimmed = val.trim();
    if (trimmed.includes(":")) {
      const parts = trimmed.split(":");
      const m = parseInt(parts[0]) || 0;
      const s = parseInt(parts[1]) || 0;
      return m * 60 + s;
    }
    const parsed = parseFloat(trimmed);
    if (isNaN(parsed) || parsed <= 0) return 60;
    return Math.floor(parsed * 60);
  };

  const handleStart = () => {
    let timeInSeconds = 60;
    if (selectedMinutes === 0) {
      timeInSeconds = parseTime(customMinutes);
    } else {
      timeInSeconds = selectedMinutes * 60;
    }
    router.push(`/typing-speed-test/${lessonId}?time=${timeInSeconds}`);
  };

  const formatDisplayTime = () => {
    let seconds = 60;
    if (selectedMinutes !== 0) {
      seconds = selectedMinutes * 60;
    } else {
      if (!customMinutes.trim()) return "1:00";
      seconds = parseTime(customMinutes);
    }
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="p-4 lg:p-6 bg-card border border-border/50 rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] flex flex-col lg:flex-row gap-6 lg:items-stretch w-full">
      <div className="flex flex-col flex-1 justify-center space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
            Select Duration
          </h2>
          <p className="text-sm text-muted-foreground">
            Choose how long you want to run the typing test.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 5].map((min) => (
            <button
              key={min}
              onClick={() => setSelectedMinutes(min)}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-300 active:scale-[0.98] ${
                selectedMinutes === min
                  ? "bg-primary/5 border-primary text-primary shadow-sm ring-1 ring-primary/20"
                  : "bg-background border-border/40 hover:bg-card hover:border-border/80 text-foreground"
              }`}
            >
              <span className="text-2xl font-bold tracking-tight">{min}</span>
              <span className="text-xs font-medium mt-0.5 text-muted-foreground">
                {min === 1 ? "Minute" : "Minutes"}
              </span>
            </button>
          ))}

          <div
            role="button"
            tabIndex={0}
            onClick={() => setSelectedMinutes(0)}
            onKeyDown={(e) => e.key === "Enter" && setSelectedMinutes(0)}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-300 cursor-pointer col-span-3 ${
              selectedMinutes === 0
                ? "bg-primary/5 border-primary text-primary shadow-sm ring-1 ring-primary/20"
                : "bg-background border-border/40 hover:bg-card hover:border-border/80 text-foreground active:scale-[0.98]"
            }`}
          >
            {selectedMinutes === 0 ? (
              <Input
                id="custom-time"
                type="text"
                autoFocus
                placeholder="MM:SS"
                value={customMinutes}
                onChange={(e) => setCustomMinutes(e.target.value)}
                className="h-8 w-full max-w-[100px] text-center font-bold text-base bg-background/80 border-primary/30 text-primary placeholder:text-primary/40 focus-visible:ring-1 focus-visible:ring-primary/50 rounded-lg shadow-inner transition-all"
              />
            ) : (
              <Clock className="w-6 h-6 mb-1.5 stroke-[1.5] text-muted-foreground" />
            )}
            <span
              className={`text-xs font-medium ${selectedMinutes === 0 ? "text-primary/80" : "text-muted-foreground"}`}
            >
              Custom
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center p-5 bg-muted/20 rounded-2xl border border-border/30 w-full lg:w-[260px]">
        <div className="flex justify-center items-center mb-4 w-12 h-12 rounded-full border shadow-sm bg-background border-border/50">
          <Timer className="w-6 h-6 text-primary stroke-[1.5]" />
        </div>

        <div className="mb-6 text-center">
          <p className="mb-1 text-xs font-medium tracking-widest uppercase text-muted-foreground">
            Total Time
          </p>
          <p className="font-mono text-4xl font-semibold tracking-tighter text-foreground">
            {formatDisplayTime()}
          </p>
        </div>

        <Button
          onClick={handleStart}
          size="lg"
          className="w-full h-12 rounded-xl text-sm font-medium transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0"
        >
          Start Test
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
