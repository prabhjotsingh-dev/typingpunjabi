import { useState, useCallback } from "react";
import { transliterate } from "@/lib/transliteration/engine";

interface UseTypingEngineReturn {
  currentCharacterIndex: number;
  typed: Record<number, boolean | null>;
  input: string;
  value: string;
  start: number;
  keytype: [string, boolean];
  noOfCorrectChar: number;
  noOfIncorrectChar: number;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBackspace: () => void;
}

export function useTypingEngine(allCharacters: string[]): UseTypingEngineReturn {
  const [noOfCorrectChar, setNoOfCorrectChar] = useState(0);
  const [typed, setTyped] = useState<Record<number, boolean | null>>({});
  const [noOfIncorrectChar, setNoOfIncorrectChar] = useState(0);
  const [input, setInput] = useState<string>("");
  const [value, setValue] = useState("");
  const [start, setStart] = useState(0);
  const [keytype, setKeytype] = useState<[string, boolean]>([" ", true]);
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
 
  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let punjabi_input = e.target.value;
      const lastChar = punjabi_input.slice(-1);
      const transliteratedLast = transliterate(lastChar);
      if (transliteratedLast !== lastChar) {
        punjabi_input = punjabi_input.slice(0, -1) + transliteratedLast;
      }

      if (e.target.value === "") {
        setValue("");
      } else if (
        allCharacters[currentCharacterIndex].length <= punjabi_input.length
      ) {
        if (allCharacters[currentCharacterIndex] === punjabi_input) {
          setTyped((prev) => ({ ...prev, [currentCharacterIndex]: true }));
          setNoOfCorrectChar(
            (old) => old + allCharacters[currentCharacterIndex].length,
          );
        } else {
          setTyped((prev) => ({ ...prev, [currentCharacterIndex]: false }));
          setNoOfIncorrectChar(
            (old) => old + allCharacters[currentCharacterIndex].length,
          );
        }
        setInput(punjabi_input);
        setValue("");
        setCurrentCharacterIndex((prev) => prev + 1);
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
    },
    [allCharacters, currentCharacterIndex, typed, start],
  );

  const handleBackspace = useCallback(() => {
    if (value.length > 0) {
      const codePoints = Array.from(value);
      codePoints.pop();
      const newValue = codePoints.join("");
      setValue(newValue);
      setInput(newValue || "<<");
    } else if (currentCharacterIndex > 0) {
      const prevIndex = currentCharacterIndex - 1;
      const prevTarget = allCharacters[prevIndex];
      const prevCodePoints = Array.from(prevTarget);
      if (typed[prevIndex] === true) {
        setNoOfCorrectChar((old) => old - prevTarget.length);
      } else if (typed[prevIndex] === false) {
        setNoOfIncorrectChar((old) => old - prevTarget.length);
      }

      setTyped((prev) => ({ ...prev, [prevIndex]: null }));
      setCurrentCharacterIndex((prev) => prev - 1);

      if (prevCodePoints.length > 1) {
        const partial = prevCodePoints.slice(0, -1).join("");
        setValue(partial);
        setInput(partial);
      } else {
        setValue("");
        setInput("<<");
      }
    }
  }, [currentCharacterIndex, value, allCharacters, typed]);

  return {
    currentCharacterIndex,
    typed,
    input,
    value,
    start,
    keytype,
    noOfCorrectChar,
    noOfIncorrectChar,
    handleInput,
    handleBackspace,
  };
}
