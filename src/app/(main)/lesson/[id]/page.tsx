import { getLessonContent } from "@/supabaseFunctions/getData";
import TypingPageUI from "@/components/pages/typingPageUI";
import { notFound } from "next/navigation";
import { processTypingContent } from "@/comman/utils";

type Params = Promise<{ id: string }>;

export default async function Typing({ params }: { params: Params }) {
  const { id } = await params;
  const data = await getLessonContent(id);

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
    />
  );
}
