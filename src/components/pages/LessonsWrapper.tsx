"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/supabaseServices/AuthProvider";
import { LessonData, Stage } from "@/comman/types";
import LessonsPageUI from "./lessonsPageUI";

export default function LessonsWrapper({
  lessonsData,
  stage,
}: {
  lessonsData: LessonData[];
  stage: Stage;
}) {
  const { user } = useAuth();
  const [merged, setMerged] = useState<LessonData[] | null>(null);

  useEffect(() => {
    if (user) return;
    try {
      const results = JSON.parse(
        localStorage.getItem("guest_typing_results") || "[]"
      );
      const bestByLesson = new Map<string, number>();
      for (const r of results) {
        const acc = r.accuracy || 0;
        if (acc > (bestByLesson.get(r.lesson_id) || 0)) {
          bestByLesson.set(r.lesson_id, acc);
        }
      }
      setMerged(
        lessonsData.map((lesson) => ({
          ...lesson,
          highest_accuracy: bestByLesson.get(lesson.id) || 0,
        }))
      );
    } catch {
      setMerged(lessonsData);
    }
  }, [user, lessonsData]);

  if (user) {
    return <LessonsPageUI lessonsData={lessonsData} stage={stage} />;
  }

  if (merged === null) {
    return (
      <section className="flex flex-col gap-6 p-6 w-full md:p-10">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </section>
    );
  }

  return <LessonsPageUI lessonsData={merged} stage={stage} />;
}