import Link from "next/link";
import { getLessonResult } from "@/supabaseServices/fetchdata/getLessonResult";
import { Star, Zap, Target, RotateCcw, ArrowRight, List, Loader2 } from "lucide-react";
import Routes from "@/comman/routes";

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
      <div className="h-[calc(100svh-3.5rem)] flex items-center justify-center text-zinc-500 font-sans bg-[#f9fafb]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
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
    <div className="h-[calc(100svh-3.5rem)] w-full bg-[#f9fafb] text-zinc-950 font-sans selection:bg-emerald-500/20 px-4 md:px-8 py-6 overflow-hidden flex items-center justify-center">
      <div className="max-w-[1300px] w-full grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-16 items-center">
        

        <div className="flex flex-col space-y-6 lg:space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out fill-mode-both">
          <div className="space-y-4 lg:space-y-6 max-w-2xl">
            <div className="inline-flex items-center rounded-full border border-zinc-200/80 bg-white px-3 py-1.5 text-xs font-semibold tracking-tight text-zinc-600 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 mr-2 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
              {data.title}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-medium tracking-tighter leading-[1.05] text-zinc-900">
              {titleText}
            </h1>
            
            <p className="text-base md:text-lg text-zinc-500 max-w-[45ch] leading-relaxed tracking-tight">
              You have completed the lesson. Review your results below and choose your next step.
            </p>
          </div>

          {/* Action Row - Asymmetric Left */}
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 pt-2 justify-around">
            <Link 
              href={Routes.lessons}
              className="min-w-[calc(100svw/3.5)] inline-flex h-12 lg:h-14 items-center justify-center rounded-full bg-white px-6 lg:px-8 text-sm lg:text-base font-medium text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-200 transition-all duration-300 hover:bg-zinc-50 hover:ring-zinc-300 active:scale-[0.98]"
            >
              <List className="w-4 h-4 mr-2" />
              Return to Lessons
            </Link>
            <Link 
              href={Routes.toLesson(data.id)}
              className="min-w-[calc(100svw/3.5)] inline-flex h-12 lg:h-14 items-center justify-center rounded-full bg-white px-6 lg:px-8 text-sm lg:text-base font-medium text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-200 transition-all duration-300 hover:bg-zinc-50 hover:ring-zinc-300 active:scale-[0.98]"
            >
              <RotateCcw className="w-4 h-4 mr-3 text-zinc-400" />
              Again
            </Link>
            <Link 
              href={Routes.nextLesson(data.id)}
              className="group relative min-w-[calc(100svw/3.5)] inline-flex h-12 lg:h-14 items-center justify-center overflow-hidden rounded-full bg-zinc-950 px-6 lg:px-8 text-sm lg:text-base font-medium text-zinc-50 transition-all duration-300 hover:bg-zinc-900 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.4)] active:scale-[0.98]"
            >
              <span className="mr-3">Next Lesson</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 cubic-bezier(0.16, 1, 0.3, 1) group-hover:translate-x-1.5" />
            </Link>
            
          </div>
          
          <div className="pt-2 lg:pt-4">
            <Link 
              href={Routes.lessons}
              className="inline-flex items-center text-xs lg:text-sm font-medium tracking-tight text-zinc-400 hover:text-zinc-900 transition-colors duration-300"
            >
              <List className="w-4 h-4 mr-2" />
              Return to Lessons Tab
            </Link>
          </div>
        </div>

        {/* Right Side - Bento Grid 2.0 Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 animate-in fade-in slide-in-from-right-8 duration-1000 delay-200 ease-out fill-mode-both">
          
          {/* Main Metric Card (Spans 2 columns on small screens) */}
          <div className="sm:col-span-2 relative overflow-hidden rounded-[2rem] bg-white p-6 md:p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] ring-1 ring-slate-200/50 group transition-transform duration-500 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-6 lg:mb-8">
              <span className="text-xs font-semibold tracking-tight text-zinc-400 uppercase">Speed</span>
              <div className="p-2 bg-zinc-50 text-emerald-600 rounded-full ring-1 ring-zinc-100">
                <Zap className="w-4 h-4" />
              </div>
            </div>
            
            <div className="flex items-baseline gap-2 lg:gap-3">
              <span className="text-6xl md:text-7xl lg:text-[5.5rem] font-light tracking-tighter text-zinc-900 font-mono leading-none">
                {speed}
              </span>
              <span className="text-lg lg:text-xl font-medium text-zinc-400 tracking-tight">WPM</span>
            </div>
            
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-emerald-400/0 via-emerald-400 to-emerald-400/0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"></div>
          </div>

          {/* Accuracy Card */}
          <div className="relative overflow-hidden rounded-[1.5rem] bg-white p-5 md:p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] ring-1 ring-slate-200/50 group transition-transform duration-500 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-semibold tracking-tight text-zinc-400 uppercase">Accuracy</span>
              <Target className="w-4 h-4 text-zinc-300" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl lg:text-5xl font-light tracking-tighter text-zinc-900 font-mono leading-none">
                {Number(accuracy).toFixed(0)}
              </span>
              <span className="text-sm lg:text-base font-medium text-zinc-400">%</span>
            </div>
            
            {/* Progress bar visual */}
            <div className="mt-4 lg:mt-5 space-y-2">
              <div className="flex justify-between text-[10px] uppercase tracking-wider font-semibold text-zinc-400">
                <span>Overall Accuracy</span>
                <span className={accuracy >= 90 ? "text-emerald-500" : ""}>
                  {Number(accuracy).toFixed(0)}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-zinc-900 rounded-full transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ width: `${accuracy}%`, transitionDelay: '400ms' }}
                />
              </div>
            </div>
          </div>

          {/* Stars Card */}
          <div className="relative overflow-hidden rounded-[1.5rem] bg-white p-5 md:p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] ring-1 ring-slate-200/50 group transition-transform duration-500 hover:-translate-y-1 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4 lg:mb-6">
              <span className="text-xs font-semibold tracking-tight text-zinc-400 uppercase">Rating</span>
              <Star className="w-4 h-4 text-zinc-300" />
            </div>
            
            <div className="flex items-center gap-1 lg:gap-1.5">
              {[1, 2, 3].map((n) => (
                <Star
                  key={n}
                  className={`w-7 h-7 lg:w-8 lg:h-8 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    stars >= n
                      ? "fill-yellow-400 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.4)] scale-110"
                      : "fill-transparent text-zinc-200 scale-95"
                  }`}
                  style={{ transitionDelay: `${n * 150}ms` }}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Result;