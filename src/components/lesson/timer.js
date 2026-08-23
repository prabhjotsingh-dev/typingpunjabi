"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { addTypingResult } from "@/supabaseFunctions/addOrUpdateData";

function Timer(data) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [time, setTime] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const limit = data.timeLimit || 30;
  const mode = data.mode || "lesson";
  const contentSource = data.contentSource || "lesson";
  const customText = data.customText || null;
  const onFinish = data.onFinish;

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
      const paramsString = searchParams.toString();
      onFinish?.();
      const putdata = async () => {
        const typedWords = data.value?.trim() ? data.value.trim().split(/\s+/).length : 0;
        const totalChars = data.correct + data.incorrect;
        const cpm = Math.round(totalChars / (time / 60)) || 0;
        const wpm = Math.round(typedWords / (time / 60)) || 0;
        const accuracy = totalChars > 0 ? (data.correct / totalChars) * 100 : 0;
        try {
          const result = await addTypingResult({
            p_accuracy: accuracy,
            p_content_source: contentSource,
            p_correct_chars: data.correct,
            p_cpm: cpm,
            p_custom_text: customText,
            p_duration_seconds: time,
            p_incorrect_chars: data.incorrect,
            p_is_completed: true,
            p_lesson_id: data.id,
            p_lesson_title: data.title || "",
            p_mode: mode,
            p_total_chars: totalChars,
            p_wpm: wpm,
          });

          if (result && result.error === 'UNAUTHORIZED') {
            const guestData = {
              accuracy,
              content_source: contentSource,
              correct_chars: data.correct,
              cpm,
              custom_text: customText,
              duration_seconds: time,
              incorrect_chars: data.incorrect,
              is_completed: true,
              lesson_id: data.id,
              lesson_title: data.title || "",
              mode,
              total_chars: totalChars,
              wpm,
              created_at: new Date().toISOString(),
            };
            const guestResults = JSON.parse(localStorage.getItem('guest_typing_results') || '[]');
            guestResults.push(guestData);
            localStorage.setItem('guest_typing_results', JSON.stringify(guestResults));
          }
        } catch (err) {
          console.error("Error submitting typing results:", err);
        }
        router.push(`${pathname}/result${paramsString ? `?${paramsString}` : ''}`);
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
    data.mode,
    data.contentSource,
    data.customText,
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
