"use client";
import Keyboard from "@/components/keyboard";
import React, { useState, useEffect, useRef } from "react";
import Timer from "@/components/timer";
import { useParams } from "next/navigation";
import { useAuth } from "@/supabaseServices/AuthProvider";
import { useLessonData } from "@/supabaseServices/fetchdata/useLessonData";
import { Card } from "@/components/ui/card";

const Character = React.memo(function Character({
  text,
  currentCharacter,
  correctTyped,
  unbox,
}) {
  const isBoxed = !unbox;

  if (isBoxed) {
    let boxStyles = "bg-card border border-border text-muted-foreground";
    if (correctTyped === true)
      boxStyles = "bg-foreground text-background border-foreground shadow-sm";
    if (correctTyped === false)
      boxStyles = "bg-destructive/10 border-destructive/20 text-destructive";

    let currentStyles = currentCharacter
      ? "ring-2 ring-foreground/20 ring-offset-2 border-border scale-[1.02]"
      : "";

    return (
      <span
        className={`inline-flex items-center justify-center min-w-[3rem] h-[3.5rem] px-2 m-1.5 rounded-xl text-3xl font-medium transition-all duration-200 ${boxStyles} ${currentStyles}`}
      >
        {text}
      </span>
    );
  }

  let textStyles = "text-muted-foreground/60";
  if (correctTyped === true) textStyles = "text-foreground font-medium";
  if (correctTyped === false)
    textStyles = "text-destructive bg-destructive/10 rounded-sm px-0.5";

  let currentStyles = currentCharacter
    ? "border-b-[3px] border-foreground pb-0.5"
    : "";
  let spaceStyles = text === " " ? "w-[1.2ch] inline-block" : "";

  return (
    <span
      className={`text-4xl tracking-wide leading-relaxed transition-colors duration-150 md:text-5xl ${textStyles} ${spaceStyles} ${currentStyles}`}
    >
      {text}
    </span>
  );
});

function Typing() {
  const { id } = useParams();
  const { user, loading } = useAuth();


  const inputRef = useRef(null);

  let eng_to_pun_words = {
    q: "ੌ",
    w: "ੈ",
    e: "ਾ",
    r: "ੀ",
    t: "ੂ",
    y: "ਬ",
    u: "ਹ",
    i: "ਗ",
    o: "ਦ",
    p: "ਜ",
    "[": "ਡ",
    "]": "਼",
    a: "ੋ",
    s: "ੇ",
    d: "੍",
    f: "ਿ",
    g: "ੁ",
    h: "ਪ",
    j: "ਰ",
    k: "ਕ",
    l: "ਤ",
    ";": "ਚ",
    "'": "ਟ",
    x: "ੰ",
    c: "ਮ",
    v: "ਨ",
    b: "ਵ",
    n: "ਲ",
    m: "ਸ",
    "/": "ਯ",
    Q: "ਔ",
    W: "ਐ",
    E: "ਆ",
    R: "ਈ",
    T: "ਊ",
    Y: "ਭ",
    U: "ਙ",
    I: "ਘ",
    O: "ਧ",
    P: "ਝ",
    "{": "ਢ",
    "}": "ਞ",
    A: "ਓ",
    S: "ਏ",
    D: "ਅ",
    F: "ਇ",
    G: "ਉ",
    H: "ਫ",
    J: "ੜ",
    K: "ਖ",
    L: "ਥ",
    ":": "ਛ",
    '"': "ਠ",
    X: "ਂ",
    C: "ਣ",
    V: "ਨ",
    B: "ੲ",
    N: "ਲ਼",
    M: "ਸ਼",
    "<": ",",
    ">": "।",
    "?": "ਯ",
    $: "ੱ",
  };

  const {
    lessonData,
    lessonContent: allCharacters,
    isLoading: isLessonLoading,
    error: lessonError,
  } = useLessonData(!loading && user && id ? id as string : null);

  const [noOfCorrectChar, setNoOfCorrectChar] = useState(0);
  const [typed, setTyped] = useState({});
  const [noOfIncorrectChar, setNoOfIncorrectChar] = useState(0);
  const [input, setInput] = useState();
  const [value, setValue] = useState("");
  const [start, setStart] = useState(0);
  const [keytype, setKeytype] = useState([" ", true]);
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);

  const handleMainClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const inputtab = (e) => {
    let punjabi_input = e.target.value;
    if (
      "qwertyuiop[]asdfghjkl;'zxcvbnm,./QWERTYUIOP{}ASDFGHJKL:\"ZXCVBNM<>?$".includes(
        punjabi_input.slice(-1),
      )
    ) {
      punjabi_input = punjabi_input.replace(
        punjabi_input.slice(-1),
        (x) => eng_to_pun_words[x],
      );
    }
    if (e.target.value === "") {
      setValue("");
    } else if (
      allCharacters[currentCharacterIndex].length <= punjabi_input.length
    ) {
      if (allCharacters[currentCharacterIndex] === punjabi_input) {
        setTyped({ ...typed, [currentCharacterIndex]: true });
        setNoOfCorrectChar(
          (old) => old + allCharacters[currentCharacterIndex].length,
        );
      } else {
        setTyped({ ...typed, [currentCharacterIndex]: false });
        setNoOfIncorrectChar(
          (old) => old + allCharacters[currentCharacterIndex].length,
        );
      }
      setInput(punjabi_input);
      setValue("");
      setCurrentCharacterIndex(currentCharacterIndex + 1);
    } else {
      setValue(punjabi_input);
      setInput(punjabi_input);
    }

    setKeytype([
      punjabi_input.slice(-1),
      punjabi_input.slice(-1) ===
      allCharacters[currentCharacterIndex]?.slice(
        punjabi_input.length - 1,
        punjabi_input.length,
      )
        ? true
        : false,
    ]);

    if (Object.keys(typed).length >= allCharacters.length - 1) {
      setCurrentCharacterIndex(0);
      setTyped({});
      setStart(0);
    }
    if (Object.keys(typed).length >= start + 19) {
      setStart((old) => old + 20);
    }
  };

  return (
    <main
      onClick={handleMainClick}
      className="h-[calc(100svh-3.5rem)] flex flex-col items-center pt-2 pb-24 bg-background font-sans selection:bg-muted"
    >
      <div className="flex flex-col gap-4 justify-between items-start px-6 mb-6 w-full max-w-5xl md:flex-row md:items-end">
        <div className="space-y-1 cursor-default">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl text-foreground">
            {isLessonLoading
              ? "Loading..."
              : lessonData?.title || "Typing Practice"}
          </h1>
        </div>
      </div>
      <Card className="flex flex-row flex-nowrap gap-4 items-center px-5 py-2.5 mb-6 whitespace-nowrap rounded-full shadow-sm backdrop-blur-md cursor-default border-border/60 bg-card/80">
        <Timer
          start={noOfCorrectChar + noOfIncorrectChar >= 1}
          correct={noOfCorrectChar}
          incorrect={noOfIncorrectChar}
          id={id}
          title={lessonData?.title}
          timeClass="font-mono text-sm md:text-base font-medium text-foreground/80 flex items-center capitalize m-0"
          speedClass="font-mono text-sm md:text-base font-medium text-foreground/80 flex items-center border-l border-border pl-4 capitalize m-0"
        />
      </Card>

      <input
        id="typingText"
        ref={inputRef}
        autoFocus
        className="absolute w-0 h-0 opacity-0"
        value={value}
        onChange={inputtab}
        onKeyDown={(e) => {
          if (e.key === "Backspace" && currentCharacterIndex > 0) {
            setTyped({ ...typed, [currentCharacterIndex - 1]: null });
            setCurrentCharacterIndex(currentCharacterIndex - 1);
            setInput("<<");
          }
        }}
      />

      <div className="relative px-4 w-full max-w-5xl md:px-6">
        <Card className="w-full border-border/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] rounded-[2.5rem] bg-card overflow-hidden cursor-text">
          <div className="p-6 md:p-10 flex flex-wrap content-start min-h-[100px] transition-all">
            {allCharacters != null ? (
              allCharacters
                .slice(start, start + 20)
                .map((Char, i) => (
                  <Character
                    key={start + i}
                    text={Char}
                    currentCharacter={currentCharacterIndex === start + i}
                    correctTyped={typed[i + start]}
                    unbox={allCharacters.includes(" ")}
                  />
                ))
            ) : (
              <div className="w-full h-full flex items-center justify-center space-x-2 text-muted-foreground min-h-[200px]">
                <div className="w-2.5 h-2.5 rounded-full animate-bounce bg-muted"></div>
                <div className="w-2.5 h-2.5 rounded-full delay-75 animate-bounce bg-muted"></div>
                <div className="w-2.5 h-2.5 rounded-full delay-150 animate-bounce bg-muted"></div>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center px-8 py-4 font-mono text-sm border-t cursor-default bg-background border-border text-muted-foreground">
            <div className="flex gap-6 items-center">
              <span className="flex gap-2 items-center">
                <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground/70">
                  Typed
                </span>
                <span className="text-foreground bg-card px-2.5 py-1 rounded-md border border-border min-w-[2.5rem] text-center shadow-sm h-[28px] flex items-center justify-center">
                  {input || "-"}
                </span>
              </span>
              <span className="flex gap-2 items-center">
                <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground/70">
                  Target
                </span>
                <span className="text-foreground bg-card px-2.5 py-1 rounded-md border border-border min-w-[2.5rem] text-center shadow-sm h-[28px] flex items-center justify-center">
                  {allCharacters != null
                    ? allCharacters[currentCharacterIndex]
                    : "-"}
                </span>
              </span>
            </div>
            <div className="hidden text-xs text-muted-foreground md:block">
              Start typing to begin the lesson
            </div>
          </div>
        </Card>
      </div>

      <Keyboard className="w-[60vw] h-[16vw] my-10" keyblink={keytype} />
    </main>
  );
}

export default Typing;
