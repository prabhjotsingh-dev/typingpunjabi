import { Loader2 } from "lucide-react";
import Routes from "@/comman/routes";
import ResultPageUI from "@/components/pages/resultPageUI";
import { getLessonResult } from "@/supabaseFunctions/getData";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: SearchParams;
}

async function TypingPracticeResult({ params, searchParams }: PageProps) {
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

  const paramsObj = new URLSearchParams();
  if (typeof resolvedSearchParams.time === "string") paramsObj.set("time", resolvedSearchParams.time);
  if (typeof resolvedSearchParams.type === "string") paramsObj.set("type", resolvedSearchParams.type);
  if (typeof resolvedSearchParams.letters === "string") paramsObj.set("letters", resolvedSearchParams.letters);
  const queryString = paramsObj.toString();
  const againLink = queryString
    ? `${Routes.toTypingPractice(id)}?${queryString}`
    : Routes.toTypingPractice(id);

  return (
    <ResultPageUI
      speed={speed}
      accuracy={accuracy}
      lesson_title={`${data.lesson_title}`}
      listLink={Routes.typingPractice}
      againLink={againLink}
      listLabel="Practice Mode"
      againLabel="Play Again"
    />
  );
}

export default TypingPracticeResult;
