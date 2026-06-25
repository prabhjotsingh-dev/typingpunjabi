import TypingPageUI from "@/components/pages/typingPageUI";
import { notFound } from "next/navigation";
import { processTypingContent } from "@/comman/utils";
// TODO: Replace with specific speed test data fetching function if necessary
import { getLessonContent } from "@/supabaseFunctions/getData";

type Params = Promise<{ id: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function TypingSpeedTest({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { id } = await params;
  const resolvedSearchParams = await searchParams;

  const timeParam =
    typeof resolvedSearchParams.time === "string"
      ? parseInt(resolvedSearchParams.time)
      : 60;
  const timeLimit = isNaN(timeParam) ? 60 : timeParam;

  // NOTE: Using getLessonContent as a placeholder.
  // You might want to create a specific getSpeedTestContent function in getData.tsx
  const data = await getLessonContent(id);

  if (!data) {
    notFound();
  }

  const { segments, pageStarts } = processTypingContent(data.content);

  return (
    <TypingPageUI
      id={id}
      lessonTitle={`Speed Test: ${data.title}`}
      contentCharactersList={segments}
      pageStarts={pageStarts}
      timeLimit={timeLimit}
    />
  );
}
