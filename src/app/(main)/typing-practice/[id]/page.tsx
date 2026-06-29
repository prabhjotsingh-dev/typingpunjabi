import TypingPageUI from "@/components/pages/typingPageUI";
import { notFound, redirect } from "next/navigation";
import { processTypingContent } from "@/comman/utils";
import { getLessonContent, getLearnedAlphabets } from "@/supabaseFunctions/getData";
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
  let customLetters = typeof resolvedSearchParams.letters === "string" ? resolvedSearchParams.letters : undefined;

  let title = "Practice";
  if (practiceType === "homerow") title = "Practice: Home Row";
  else if (practiceType === "toprow") title = "Practice: Top Row";
  else if (practiceType === "bottomrow") title = "Practice: Bottom Row";
  else if (practiceType === "custom") title = "Practice: Custom Letters";
  else if (practiceType === "learned") title = "Practice: Learned Alphabets";

  if (practiceType === "learned") {
    const learnedLetters = await getLearnedAlphabets();
    if (learnedLetters) {
      customLetters = learnedLetters;
    } else {
      redirect("/typing-practice");
    }
  }

  let content = await generatePunjabiParagraph(timeLimit, "practice", customLetters);

  // Fallback if AI fails or returns null
  if (!content) {
    const data = await getLessonContent(id);
    if (!data) {
      notFound();
    }
    content = data.content;
    title = `${title} (Fallback)`;
  }

  const { segments, pageStarts } = processTypingContent(content);

  return (
    <TypingPageUI
      id={id}
      lessonTitle={title}
      contentCharactersList={segments}
      pageStarts={pageStarts}
      timeLimit={timeLimit}
      mode="practice"
      contentSource="ai"
      customText={content}
    />
  );
}
