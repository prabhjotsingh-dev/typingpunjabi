"use client";
import { useRef, useEffect, useState } from "react";
import { useTypingEngine } from "@/hooks/useTypingEngine";
import { StatsBar } from "@/components/lesson/StatsBar";
import { TypingArea } from "@/components/lesson/TypingArea";
import Keyboard from "@/components/lesson/keyboard/keyboard";
import FullPageLoader from "@/components/common/FullPageLoader";

interface TypingPageUIProps {
  id: string;
  lessonTitle: string;
  contentCharactersList: string[];
  pageStarts: number[];
  timeLimit?: number;
  mode?: string;
  contentSource?: string;
  customText?: string | null;
}

export default function TypingPageUI({
  id,
  lessonTitle,
  contentCharactersList,
  pageStarts,
  timeLimit,
  mode,
  contentSource,
  customText,
}: TypingPageUIProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFinished, setIsFinished] = useState(false);

  const {
    typed,
    input,
    value,
    start,
    end,
    keytype,
    currentCharacterIndex,
    noOfCorrectChar,
    noOfIncorrectChar,
    handleInput,
    handleBackspace,
  } = useTypingEngine(contentCharactersList, pageStarts);

  const handleMainClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [start]);

  return (
    <>
      {isFinished && <FullPageLoader message="Saving your results..." />}
      <main
        onClick={handleMainClick}
        className="h-[calc(100svh-3.5rem)] flex flex-col items-center justify-between gap-4 pt-2 pb-4 bg-background font-sans selection:bg-muted"
      >

      <StatsBar
        noOfCorrectChar={noOfCorrectChar}
        noOfIncorrectChar={noOfIncorrectChar}
        id={id}
        title={lessonTitle}
        timeLimit={timeLimit}
        mode={mode}
        contentSource={contentSource}
        customText={customText}
        onFinish={() => setIsFinished(true)}
      />

      <input
        id="typingText"
        ref={inputRef}
        autoFocus
        disabled={isFinished}
        className="absolute w-0 h-0 opacity-0"
        value={value}
        onChange={handleInput}
        onKeyDown={(e) => {
          if (e.key === "Backspace") {
            e.preventDefault();
            handleBackspace();
          }
        }}
      />

      <TypingArea
        allCharacters={contentCharactersList}
        start={start}
        end={end}
        currentCharacterIndex={currentCharacterIndex}
        typed={typed}
        input={input}
      />

      <Keyboard className="w-[60vw] h-[30vw] mx-10" keyblink={keytype} />
      </main>
    </>
  );
}
