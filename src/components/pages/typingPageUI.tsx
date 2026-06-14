"use client";
import React, { useRef } from "react";
import { useTypingEngine } from "@/hooks/useTypingEngine";
import { StatsBar } from "@/components/lesson/StatsBar";
import { TypingArea } from "@/components/lesson/TypingArea";
import Keyboard from "@/components/lesson/keyboard";

interface TypingPageUIProps {
  id: string;
  lessonTitle: string;
  contentCharactersList: string[];
}

export default function TypingPageUI({
  id,
  lessonTitle,
  contentCharactersList,
}: TypingPageUIProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    typed,
    input,
    value,
    start,
    keytype,
    currentCharacterIndex,
    noOfCorrectChar,
    noOfIncorrectChar,
    handleInput,
    handleBackspace,
  } = useTypingEngine(contentCharactersList);

  const handleMainClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <main
      onClick={handleMainClick}
      className="h-[calc(100svh-3.5rem)] flex flex-col items-center justify-between pt-2 pb-24 bg-background font-sans selection:bg-muted"
    >

      <StatsBar
        noOfCorrectChar={noOfCorrectChar}
        noOfIncorrectChar={noOfIncorrectChar}
        id={id}
        title={lessonTitle}
      />

      <input
        id="typingText"
        ref={inputRef}
        autoFocus
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
        currentCharacterIndex={currentCharacterIndex}
        typed={typed}
        input={input}
      />

      <Keyboard className="w-[60vw] h-[16vw] my-10" keyblink={keytype} />
    </main>
  );
}
