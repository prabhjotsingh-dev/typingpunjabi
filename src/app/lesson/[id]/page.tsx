import { getLessonContent } from "@/supabaseFunctions/getData";
import TypingPageUI from "@/components/pages/typingPageUI";
import { notFound } from "next/navigation";

type Params = Promise<{ id: string }>;

export default async function Typing({ params }: { params: Params }) {
  const { id } = await params;
  const data = await getLessonContent(id);

  if (!data) {
    notFound();
  }

  let segments: string[];
  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter("pa-IN", {
      granularity: "grapheme",
    });
    segments = Array.from(segmenter.segment(data.content)).map(
      (s) => s.segment,
    );
  } else {
    segments = data.content.split("");
  }

  return (
    <TypingPageUI
      id={id}
      lessonTitle={data.title}
      contentCharactersList={segments}
    />
  );
}
