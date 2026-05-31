import Link from "next/link";
import { getLessonResult } from "@/supabaseServices/fetchdata/getLessonResult";
import { Zap, Target, RotateCcw, ArrowRight, List, Loader2 } from "lucide-react";
import Routes from "@/comman/routes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function Result({ params }: PageProps) {
  const id = (await params).id;
  let data;
  
  try {
    data = await getLessonResult(id);
  } catch (error) {
    return (
      <div className="h-[calc(100svh-3.5rem)] flex items-center justify-center bg-background text-muted-foreground font-sans overflow-hidden">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin opacity-50" />
          <p className="text-sm tracking-tight font-medium">Error loading result</p>
        </div>
      </div>
    );
  }

  const progress = (Array.isArray(data.lesson_progress) ? data.lesson_progress[0] : data.lesson_progress) ?? {};
  const speed = progress.highest_wpm ?? 0;
  const accuracy = progress.highest_accuracy ?? 0;
  const stars = progress.stars ?? 0;

  const titleText = 
    stars === 3 ? "Outstanding!" : 
    stars === 2 ? "Great Job!" : 
    "Good Effort!";

  return (
    <div className="h-[calc(100svh-3.5rem)] w-full bg-background text-foreground font-sans px-4 md:px-6 flex items-center justify-center overflow-auto">
      <div className="w-full max-w-[1000px] grid grid-cols-1 gap-6 items-center">
        
        <div className="flex flex-col space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out fill-mode-both">
          <div className="space-y-3">
            <Badge variant="outline" className="px-3 py-1 shadow-sm bg-background w-fit">
              {data.title}
            </Badge>
            
            <h1 className="text-4xl font-semibold tracking-tighter leading-tight">
              {titleText}
            </h1>
            
            <p className="text-sm md:text-base text-muted-foreground max-w-[38ch] leading-relaxed tracking-tight">
              You have completed the lesson. Review your results below and choose your next step.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1">
            <Button variant="outline" className="rounded-xl h-10 md:px-2 transition-all active:scale-[0.98]">
              <Link href={Routes.lessons} className="flex gap-2 ">
                <List className="w-4 h-4 md:mr-2" />
               Lessons
              </Link>
            </Button>
            <Button variant="outline" className="rounded-xl h-10 px-2 transition-all active:scale-[0.98]" >
              <Link href={Routes.toLesson(data.id)} className="flex gap-2">
                <RotateCcw className="w-4 h-4 md:mx-1.5 opacity-50" />
                Again
              </Link>
            </Button>
            <Button className="group rounded-xl h-10 px-2 transition-all active:scale-[0.98]" >
              <Link href={Routes.nextLesson(data.id)} className="flex gap-2">
                <span className="mr-1.5">Next</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>


        <div className="flex flex-col mb-4 sm:flex-row gap-3 animate-in fade-in slide-in-from-right-4 duration-1000 delay-200 ease-out fill-mode-both">
          

          <Card className="flex-1 overflow-hidden rounded-[1.5rem] shadow-sm group hover:-translate-y-1 transition-transform duration-500 bg-card border-border/60">
            <CardHeader className="p-4 md:p-5 pb-0 md:pb-0 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-xs font-semibold tracking-tight text-muted-foreground uppercase">
                Speed
              </CardTitle>
              <div className="p-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full">
                <Zap className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent className="p-4 md:p-5 pt-2 md:pt-3">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl md:text-6xl font-light tracking-tighter font-mono leading-none">
                  {speed}
                </span>
                <span className="text-sm font-medium text-muted-foreground tracking-tight">WPM</span>
              </div>
            </CardContent>
          </Card>

          <Card className="flex-1 overflow-hidden rounded-[1.5rem] shadow-sm group hover:-translate-y-1 transition-transform duration-500 flex flex-col justify-between bg-card border-border/60">
            <CardHeader className="p-4 md:p-5 pb-0 md:pb-0 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-xs font-semibold tracking-tight text-muted-foreground uppercase">
                Accuracy
              </CardTitle>
              <Target className="w-4 h-4 text-muted-foreground/50" />
            </CardHeader>
            <CardContent className="p-4 md:p-5 pt-3 md:pt-4 flex flex-col justify-end">
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-4xl md:text-5xl font-light tracking-tighter font-mono leading-none">
                  {Number(accuracy).toFixed(0)}
                </span>
                <span className="text-xs font-medium text-muted-foreground">%</span>
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
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}

export default Result;