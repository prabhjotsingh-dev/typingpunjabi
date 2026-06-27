import TypingPageUI from "@/components/pages/typingPageUI";
import { notFound } from "next/navigation";
import { processTypingContent } from "@/comman/utils";
import { getLessonContent } from "@/supabaseFunctions/getData";
import { generatePunjabiParagraph } from "@/serverActions/generateParagraph";

type Params = Promise<{ id: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function TypingPractice({
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

  const practiceType = typeof resolvedSearchParams.type === "string" ? resolvedSearchParams.type : "all";
  const customLetters = typeof resolvedSearchParams.letters === "string" ? resolvedSearchParams.letters : undefined;

  const getLessonContentAndTitle = async (id: string) => {
    const aiGeneratedText = await generatePunjabiParagraph(timeLimit, practiceType, customLetters);
    
    let title = "Practice";
    if (practiceType === "homerow") title = "Practice: Home Row";
    if (practiceType === "toprow") title = "Practice: Top Row";
    if (practiceType === "bottomrow") title = "Practice: Bottom Row";
    if (practiceType === "custom") title = "Practice: Custom Letters";

    if (aiGeneratedText) {
      return {
        content: aiGeneratedText,
        title,
      };
    }
    
    // Fallback if AI fails or returns null
    const data = await getLessonContent(id);
    if (data) {
       return {
           content: data.content,
           title: `${title} (Fallback)`,
       }
    }
    return null;
  };

  const data = await getLessonContentAndTitle(id);

  if (!data) {
    notFound();
  }

  const { segments, pageStarts } = processTypingContent(data.content);

  return (
    <TypingPageUI
      id={id}
      lessonTitle={data.title}
      contentCharactersList={segments}
      pageStarts={pageStarts}
      timeLimit={timeLimit}
    />
  );
}
