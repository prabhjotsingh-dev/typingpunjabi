import Routes from "@/comman/routes";
import ResultPageUI from "@/components/pages/resultPageUI";
import GuestResult from "@/components/common/GuestResult";
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
    data = null;
  }

  const paramsObj = new URLSearchParams();
  if (typeof resolvedSearchParams.time === "string") paramsObj.set("time", resolvedSearchParams.time);
  if (typeof resolvedSearchParams.type === "string") paramsObj.set("type", resolvedSearchParams.type);
  if (typeof resolvedSearchParams.letters === "string") paramsObj.set("letters", resolvedSearchParams.letters);
  const queryString = paramsObj.toString();
  const againLink = queryString
    ? `${Routes.toTypingPractice(id)}?${queryString}`
    : Routes.toTypingPractice(id);

  if (!data) {
    return (
      <GuestResult
        lessonId={id}
        listLink={Routes.typingPractice}
        againLink={againLink}
        listLabel="Practice Mode"
        againLabel="Play Again"
      />
    );
  }

  const speed = data.wpm ?? 0;
  const accuracy = data.accuracy ?? 0;

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