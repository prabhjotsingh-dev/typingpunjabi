"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function Timer(data) {
  const router = useRouter();
  const [time, setTime] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (data.start && !isFinished) {
      const id = setInterval(() => {
        setTime((old) => old + 1);
      }, 1000);
      return () => clearInterval(id);
    }
  }, [data.start, isFinished]);

  useEffect(() => {
    if (time >= 30 && !isFinished) {
      setIsFinished(true);
      const putdata = async () => {
        const totalChars = data.correct + data.incorrect;
        const wpm = Math.round(totalChars / (time / 60)) || 0;
        const accuracy = totalChars > 0 ? (data.correct / totalChars) * 100 : 0;
        try {
          await fetch(`/api/${data.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              wpm,
              cpm: totalChars,
              accuracy,
              correct_chars: data.correct,
              incorrect_chars: data.incorrect,
              total_chars: totalChars,
              duration_seconds: time,
            }),
          });
        } catch (err) {
          console.error("Error submitting typing results:", err);
        }
        router.push(`/lesson/${data.id}/result`);
      };
      putdata();
    }
  }, [time, isFinished, data.id, data.correct, data.incorrect, router]);

  return (
    <>
      <p className={`${data.timeClass} h-[1lh]`}>
        Time:
        {time >= 60
          ? Math.trunc(time / 60) + ":" + (time % 60) + "m"
          : time + "s"}
      </p>
      <p className={` ${data.speedClass} h-[1lh]`}>
        speed:{((data.correct + data.incorrect) / (time / 60) || 0).toFixed(1)}{" "}
        cpm
      </p>
    </>
  );
}

export default Timer;
