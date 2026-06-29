import TypingPageUI from "@/components/pages/typingPageUI";
import { notFound } from "next/navigation";
import { processTypingContent } from "@/comman/utils";
import { getLessonContent } from "@/supabaseFunctions/getData";
import { generatePunjabiParagraph } from "@/serverActions/generateParagraph";

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

  const getLessonContentAndTitle = async (id: string) => {
    const aiGeneratedText = await generatePunjabiParagraph(timeLimit);
    if (aiGeneratedText) {
      return {
        content: aiGeneratedText,
        title: "AI Generated",
      };
    }
    
    // Fallback if AI fails or returns null
    const data = await getLessonContent(id);
    return data;
  };

  const data = await getLessonContentAndTitle(id);

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
      mode="speed-test"
      contentSource="ai"
      customText={data.content}
    />
  );
}
