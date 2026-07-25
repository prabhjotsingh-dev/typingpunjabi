import { Loader2 } from "lucide-react";
import Routes from "@/comman/routes";
import ResultPageUI from "@/components/pages/resultPageUI";
// TODO: Replace with specific speed test data fetching function if necessary
import { getLessonResult } from "@/supabaseFunctions/getData";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: SearchParams;
}

async function TypingSpeedTestResult({ params, searchParams }: PageProps) {
  const id = (await params).id;
  const resolvedSearchParams = await searchParams;
  let data;

  try {
   data = await getLessonResult(id);
  } catch (error) {
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

  const speed = data.wpm ?? 0;
  const accuracy = data.accuracy ?? 0;

  const timeParam =
    typeof resolvedSearchParams.time === "string"
      ? resolvedSearchParams.time
      : null;
  const againLink = timeParam
    ? `${Routes.toTypingSpeedTest(id)}?time=${timeParam}`
    : Routes.toTypingSpeedTest(id);

  return (
    <ResultPageUI
      speed={speed}
      accuracy={accuracy}
      lesson_title={`${data.lesson_title}`}
      listLink={Routes.typingSpeedTest}
      againLink={againLink}
      listLabel="Tests"
      againLabel="Play Again"
    />
  );
}

export default TypingSpeedTestResult;
