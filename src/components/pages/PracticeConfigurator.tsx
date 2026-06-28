"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Settings2,
  Clock,
  ArrowDown,
} from "lucide-react";
import { 
  topRowLetters,
  homeRowLetters,
  bottomRowLetters,
} from "@/lib/transliteration/languages/punjabi";
import { CustomLettersPanel } from "@/components/practice/CustomLettersPanel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PracticeConfiguratorProps {
  lessonId: string;
}

const PRACTICE_TYPES = [
  { id: "homerow", label: "Home Row" },
  { id: "toprow", label: "Top Row" },
  { id: "bottomrow", label: "Bottom Row" },
  { id: "all", label: "All Letters" },
  { id: "custom", label: "Custom Config" },
];



export function PracticeConfigurator({ lessonId }: PracticeConfiguratorProps) {
  const router = useRouter();
  const [selectedMinutes, setSelectedMinutes] = useState<number>(1);
  const [customMinutes, setCustomMinutes] = useState<string>("");
  const [practiceType, setPracticeType] = useState<string>("all");
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);

  const toggleLetter = (letter: string) => {
    setSelectedLetters((prev) =>
      prev.includes(letter)
        ? prev.filter((l) => l !== letter)
        : [...prev, letter],
    );
  };

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

    if (practiceType === "custom" && selectedLetters.length === 0) {
      toast.error("Please select at least one letter for custom practice.");
      return;
    }

    const searchParams = new URLSearchParams({
      time: timeInSeconds.toString(),
      type: practiceType,
    });

    let lettersToPractice = selectedLetters;
    if (practiceType === "homerow") {
      lettersToPractice = homeRowLetters;
    } else if (practiceType === "toprow") {
      lettersToPractice = topRowLetters;
    } else if (practiceType === "bottomrow") {
      lettersToPractice = bottomRowLetters;
    }

    if (practiceType !== "all") {
      searchParams.set("letters", lettersToPractice.join(","));
    }

    router.push(`/typing-practice/${lessonId}?${searchParams.toString()}`);
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
    <div className="flex overflow-hidden gap-6 p-6 h-full md:gap-8 md:p-8">
      {/* Left Column: Practice Mode & Custom Expansion */}
      <div className="flex flex-col w-[65%] h-full overflow-y-auto hide-scrollbar pb-10">
        <div className="flex flex-col gap-6 md:gap-8 h-max shrink-0">
          {/* Mode Architecture Card */}
          <div className="rounded-2xl border border-border/50 bg-card shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="px-5 py-6 border-b border-border/30 bg-muted/10">
              <h2 className="flex gap-2 items-center text-xl font-semibold tracking-tight md:text-2xl">
                <Settings2 className="w-4 h-4" /> Select Practice Mode
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
              {PRACTICE_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setPracticeType(type.id)}
                  className={`flex flex-row gap-2 items-center justify-center px-3 py-6 rounded-2xl border transition-all duration-300 active:scale-[0.98] ${
                    practiceType === type.id
                      ? "bg-primary/5 border-primary text-primary shadow-sm ring-1 ring-primary/20"
                      : "bg-background border-border/40 hover:bg-card hover:border-border/80 text-foreground"
                  }`}
                >
                  {type.label}
                  {type.id === "custom" &&
                    (practiceType === type.id ? (
                      <ArrowDown className="ml-1 w-4 h-4" />
                    ) : (
                      <ArrowRight className="mt-1 ml-1 w-4 h-4" />
                    ))}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Letters Expansion Panel */}
          <CustomLettersPanel
            practiceType={practiceType}
            selectedLetters={selectedLetters}
            toggleLetter={toggleLetter}
          />
        </div>
      </div>

      {/* Right Column: Time & Launch */}
      <div className="flex flex-col gap-6 w-[35%] overflow-y-auto h-full hide-scrollbar">
        <div className="p-4 bg-card border border-border/50 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] flex flex-col gap-6 w-full">
          <div className="flex flex-col flex-1 gap-2 justify-center">
            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
              Select Duration
            </h2>
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
                  <span className="text-2xl font-bold tracking-tight">
                    {min}
                  </span>
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
                    className="h-8 w-full max-w-[200px] text-center font-bold text-base bg-background/80 border-primary/30 text-primary placeholder:text-primary/40 focus-visible:ring-1 focus-visible:ring-primary/50 rounded-2xl shadow-inner transition-all"
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

          <div className="flex flex-col justify-center items-center p-5 w-full rounded-2xl border bg-muted/20 border-border/30">
            <div className="flex flex-col gap-4 justify-center items-center w-full lg:flex-row">

              <div className="text-center">
                <p className="mb-1 text-xs font-medium tracking-widest uppercase text-muted-foreground">
                  Total Time
                </p>
                <p className="font-mono text-4xl font-semibold tracking-tighter text-foreground">
                  {formatDisplayTime()}
                </p>
              </div>
            </div>

            <Button
              onClick={handleStart}
              size="lg"
              className="w-full h-12 rounded-2xl text-sm font-medium transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0"
            >
              Start Test
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
