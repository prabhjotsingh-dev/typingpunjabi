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

  let segments: string[] = [];
  let pageStarts: number[] = [];

  const words = data.content.split(/\s+/).filter(Boolean);
  const pages: string[][] = [];
  let currentPage: string[] = [];
  let currentLength = 0;

  const getChars = (text: string) => {
    if (typeof Intl !== "undefined" && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter("pa-IN", { granularity: "grapheme" });
      return Array.from(segmenter.segment(text)).map((s) => s.segment);
    }
    return text.split("");
  };

  for (const word of words) {
    const wordChars = getChars(word);

    if (currentLength + wordChars.length + (currentPage.length > 0 ? 1 : 0) >25) {
      if (currentPage.length > 0) {
        pages.push(currentPage);
        currentPage = [];
        currentLength = 0;
      }
    }

    if (currentPage.length > 0) {
      currentPage.push(" ");
      currentLength += 1;
    }

    currentPage.push(...wordChars);
    currentLength += wordChars.length;
  }
  if (currentPage.length > 0) {
    pages.push(currentPage);
  }

  for (const page of pages) {
    pageStarts.push(segments.length);
    segments.push(...page);
  }

  return (
    <TypingPageUI
      id={id}
      lessonTitle={data.title}
      contentCharactersList={segments}
      pageStarts={pageStarts}
    />
  );
}
