import Routes from "@/comman/routes";
import ResultPageUI from "@/components/pages/resultPageUI";
import GuestResult from "@/components/common/GuestResult";
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
    data = null;
  }

  const timeParam =
    typeof resolvedSearchParams.time === "string"
      ? resolvedSearchParams.time
      : null;
  const againLink = timeParam
    ? `${Routes.toTypingSpeedTest(id)}?time=${timeParam}`
    : Routes.toTypingSpeedTest(id);

  if (!data) {
    return (
      <GuestResult
        lessonId={id}
        listLink={Routes.typingSpeedTest}
        againLink={againLink}
        listLabel="Tests"
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
      listLink={Routes.typingSpeedTest}
      againLink={againLink}
      listLabel="Tests"
      againLabel="Play Again"
    />
  );
}

export default TypingSpeedTestResult;