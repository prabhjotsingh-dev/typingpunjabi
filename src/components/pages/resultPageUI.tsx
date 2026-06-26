import Link from "next/link";
import {
  Zap,
  Target,
  RotateCcw,
  ArrowRight,
  List,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardCard from "@/components/common/DashboardCard";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { GetStart } from "@/comman/utils";

interface ResultPageUIProps {
  speed: number;
  accuracy: number;
  lesson_title: string;
  listLink: string;
  againLink: string;
  nextLink?: string;
  listLabel?: string;
}

export default function ResultPageUI({
  speed,
  accuracy,
  lesson_title,
  listLink,
  againLink,
  nextLink,
  listLabel = "Lessons"
}: ResultPageUIProps) {
  const stars = GetStart(accuracy);

  const titleText =
    stars === 3 ? "Outstanding!" : stars === 2 ? "Great Job!" : "Good Effort!";

  return (
    <div className="h-[calc(100svh-3.5rem)] w-full bg-background text-foreground font-sans px-4 md:px-6 flex items-center justify-center overflow-auto">
      <div className="w-full max-w-[1000px] grid grid-cols-1 gap-6 items-center">
        <div className="flex flex-col space-y-5 duration-1000 ease-out animate-in fade-in slide-in-from-bottom-4 fill-mode-both">
          <div className="space-y-3">
            <Badge
              variant="outline"
              className="px-3 py-1 rounded-full shadow-sm bg-background w-fit"
            >
              {lesson_title}
            </Badge>

            <h1 className="text-4xl font-semibold tracking-tighter leading-tight">
              {titleText}
            </h1>

            <p className="text-sm md:text-base text-muted-foreground max-w-[38ch] leading-relaxed tracking-tight">
              You have completed the lesson. Review your results below and
              choose your next step.
            </p>
          </div>

          <div className={`grid gap-2 pt-1 ${nextLink ? 'grid-cols-3' : 'grid-cols-2'}`}>
            <Button
              variant="outline"
              className="rounded-xl h-10 md:px-2 transition-all active:scale-[0.98]"
            >
              <Link href={listLink} className="flex gap-2">
                <List className="w-4 h-4 md:mr-2" />
                {listLabel}
              </Link>
            </Button>
            <Button
              variant="outline"
              className="rounded-xl h-10 px-2 transition-all active:scale-[0.98]"
            >
              <Link href={againLink} className="flex gap-2">
                <RotateCcw className="w-4 h-4 md:mx-1.5 opacity-50" />
                Again
              </Link>
            </Button>
            {nextLink && (
              <Button className="group rounded-xl h-10 px-2 transition-all active:scale-[0.98]">
                <Link href={nextLink} className="flex gap-2">
                  <span className="mr-1.5">Next</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 mb-4 duration-1000 ease-out delay-200 sm:flex-row animate-in fade-in slide-in-from-right-4 fill-mode-both">
          <DashboardCard
            className={{
              card: "flex-1 overflow-hidden rounded-[1.5rem] p-0 md:p-0 shadow-sm group hover:-translate-y-1 transition-transform duration-500 bg-card border-border/60",
              header: "p-4 pb-0 space-y-0 md:p-5 md:pb-0 mb-0",
            }}
            header={
              <span className="text-xs font-semibold tracking-tight uppercase text-muted-foreground">
                Speed
              </span>
            }
            cardAction={
              <div className="p-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full">
                <Zap className="w-4 h-4" />
              </div>
            }
            content={
              <div className="p-4 pt-2 md:p-5 md:pt-3">
                <div className="flex gap-2 items-baseline">
                  <span className="font-mono text-5xl font-light tracking-tighter leading-none md:text-6xl">
                    {speed}
                  </span>
                  <span className="text-sm font-medium tracking-tight text-muted-foreground">
                    WPM
                  </span>
                </div>
              </div>
            }
          />

          <DashboardCard
            className={{
              card: "flex-1 overflow-hidden rounded-[1.5rem] p-0 md:p-0 shadow-sm group hover:-translate-y-1 transition-transform duration-500 bg-card border-border/60",
              header: "p-4 pb-0 space-y-0 md:p-5 md:pb-0 mb-0",
            }}
            header={
              <span className="text-xs font-semibold tracking-tight uppercase text-muted-foreground">
                Accuracy
              </span>
            }
            cardAction={<Target className="w-4 h-4 text-muted-foreground/50" />}
            content={
              <div className="flex flex-col justify-end p-4 pt-3 md:p-5 md:pt-4">
                <div className="flex gap-1 items-baseline mb-3">
                  <span className="font-mono text-4xl font-light tracking-tighter leading-none md:text-5xl">
                    {Number(accuracy).toFixed(0)}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">
                    %
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
                    <span>Overall</span>
                    <span className={accuracy >= 90 ? "text-emerald-500" : ""}>
                      {Number(accuracy).toFixed(0)}%
                    </span>
                  </div>
                  <Progress value={Number(accuracy)} className="h-1.5" />
                </div>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}
