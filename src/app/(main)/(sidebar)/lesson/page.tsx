import { Suspense } from "react";
import { getLessons } from "@/supabaseFunctions/getData";
import LessonsPageUI from "@/components/pages/lesssonsPageUI";

export { metadata } from "@/metadata/lesson";

export default async function Lesson() {
  const lessonsData = await getLessons();

  return (
    <Suspense fallback={<div className="flex justify-center items-center h-[calc(100svh-4rem)]">Loading lessons...</div>}>
      <LessonsPageUI lessonsData={lessonsData} />
    </Suspense>
  );
}
