"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { addTypingResult } from "@/supabaseFunctions/addOrUpdateData";

function Timer(data) {
  const router = useRouter();
  const pathname = usePathname();
  const [time, setTime] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const limit = data.timeLimit || 30;

  useEffect(() => {
    if (data.start && !isFinished) {
      const id = setInterval(() => {
        setTime((old) => old + 1);
      }, 1000);
      return () => clearInterval(id);
    }
  }, [data.start, isFinished]);

  useEffect(() => {
    if (time >= limit && !isFinished) {
      setIsFinished(true);
      const putdata = async () => {
        const totalChars = data.correct + data.incorrect;
        const wpm = Math.round(totalChars / (time / 60)) || 0;
        const accuracy = totalChars > 0 ? (data.correct / totalChars) * 100 : 0;
        try {
          await addTypingResult({
            p_accuracy: accuracy,
            p_content_source: "lesson",
            p_correct_chars: data.correct,
            p_cpm: totalChars,
            p_duration_seconds: time,
            p_incorrect_chars: data.incorrect,
            p_is_completed: true,
            p_lesson_id: data.id,
            p_lesson_title: data.title || "",
            p_mode: "lesson",
            p_total_chars: totalChars,
            p_wpm: wpm,
          });
        } catch (err) {
          console.error("Error submitting typing results:", err);
        }
        router.push(`${pathname}/result`);
      };
      putdata();
    }
  }, [
    time,
    isFinished,
    data.id,
    data.title,
    data.correct,
    data.incorrect,
    router,
    pathname,
    limit,
  ]);

  const remainingTime = Math.max(0, limit - time);

  return (
    <>
      <p className={`${data.timeClass} h-[1lh]`}>
        Time:{" "}
        {remainingTime >= 60
          ? Math.trunc(remainingTime / 60) +
            ":" +
            String(remainingTime % 60).padStart(2, "0") +
            "m"
          : remainingTime + "s"}
      </p>
      <p className={` ${data.speedClass} h-[1lh]`}>
        speed: {((data.correct + data.incorrect) / (time / 60) || 0).toFixed(1)}{" "}
        cpm
      </p>
    </>
  );
}

export default Timer;
