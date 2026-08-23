import { Suspense } from "react";
import { getLessons } from "@/supabaseFunctions/getData";
import LessonsWrapper from "@/components/pages/LessonsWrapper";
import { Constants } from "@/supabaseServices/database.types";

import { Stage } from "@/comman/types";

export { metadata } from "@/metadata/lesson";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Lesson({ searchParams }: { searchParams: SearchParams }) {
  const resolvedParams = await searchParams;
  const stageQuery = resolvedParams.stage || resolvedParams.level;
  const stageString = typeof stageQuery === "string" ? stageQuery : "";
  
  const validStages = Constants.public.Enums.lesson_stage as readonly string[];
  const stage = validStages.includes(stageString) ? (stageString as Stage) : "beginner";

  const lessonsData = await getLessons(stage);

  return (
    <Suspense fallback={<div className="flex justify-center items-center h-[calc(100svh-4rem)]">Loading lessons...</div>}>
      <LessonsWrapper lessonsData={lessonsData} stage={stage} />
    </Suspense>
  );
}
