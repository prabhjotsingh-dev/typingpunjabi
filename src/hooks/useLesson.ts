import { useState, useEffect } from "react";
import { getLessonContent } from "@/supabaseFunctions/getData";
import type { User } from "@supabase/supabase-js";

interface UseLessonReturn {
  lessonTitle: string | null;
  contentCharactersList: string[];
  isLessonLoading: boolean;
}

export function useLesson(
  id: string | string[] | undefined,
  user: User | null,
  loading: boolean,
): UseLessonReturn {
  const [lessonTitle, setLessonTitle] = useState<string | null>(null);
  const [contentCharactersList, setContentCharactersList] = useState<string[]>([]);
  const [isLessonLoading, setIsLessonLoading] = useState(true);

  useEffect(() => {
    const fetchLesson = async () => {
      if (!loading && user && id) {
        setIsLessonLoading(true);
        try {
          const data = await getLessonContent(id as string);
          if (data) {
            setLessonTitle(data.title);
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
            setContentCharactersList(segments);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsLessonLoading(false);
        }
      }
    };

    fetchLesson();
  }, [loading, user, id]);

  return { lessonTitle, contentCharactersList, isLessonLoading };
}
