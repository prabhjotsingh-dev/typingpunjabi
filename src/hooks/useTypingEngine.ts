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

export function useTypingEngine(
  allCharacters: string[],
): UseTypingEngineReturn {
  const [noOfCorrectChar, setNoOfCorrectChar] = useState(0);
  const [noOfIncorrectChar, setNoOfIncorrectChar] = useState(0);
  const [typed, setTyped] = useState<Record<number, boolean | null>>({});
  const [input, setInput] = useState<string>("");
  const [value, setValue] = useState("");
  const [keytype, setKeytype] = useState<[string, boolean]>([".... ", true]);
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);

  const start = Math.floor(currentCharacterIndex / 25) * 25;

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawInput = e.target.value;

      if (!rawInput) {
        setValue("");
        setInput("");
        return;
      }

      const lastChar = rawInput.slice(-1);
      const transliteratedLast = transliterate(lastChar);

      const punjabi_input =
        transliteratedLast !== lastChar
          ? rawInput.slice(0, -1) + transliteratedLast
          : rawInput;

      const currentTarget = allCharacters[currentCharacterIndex] || "";

      if (currentTarget.length <= punjabi_input.length) {
        const isCorrect = currentTarget === punjabi_input;

        setTyped((prev) => ({ ...prev, [currentCharacterIndex]: isCorrect }));

        if (isCorrect) {
          setNoOfCorrectChar((old) => old + currentTarget.length);
        } else {
          setNoOfIncorrectChar((old) => old + currentTarget.length);
        }

        setValue("");
        setInput(punjabi_input);

        setCurrentCharacterIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;

          if (nextIndex >= allCharacters.length) {
            setTyped({});
            return 0;
          }
          return nextIndex;
        });
      } else {
        setValue(punjabi_input);
        setInput(punjabi_input);
      }

      const lastTypedPunjabi = punjabi_input.slice(-1);
      const expectedChar = currentTarget[punjabi_input.length - 1];
      setKeytype([lastTypedPunjabi, lastTypedPunjabi === expectedChar]);
    },
    [allCharacters, currentCharacterIndex],
  );

  const handleBackspace = useCallback(() => {
    const prevIndex = currentCharacterIndex - 1;
    const prevTarget = allCharacters[prevIndex];
    if (value.length > 0) {
      const codePoints = Array.from(value);
      codePoints.pop();
      const newValue = codePoints.join("");
      setValue(newValue);
      setInput(newValue || prevTarget);
    } else if (currentCharacterIndex > 0) {
      if (typed[prevIndex] === true) {
        setNoOfCorrectChar((old) => old - prevTarget.length);
      } else if (typed[prevIndex] === false) {
        setNoOfIncorrectChar((old) => old - prevTarget.length);
      }

      setTyped((prev) => {
        const newTyped = { ...prev };
        delete newTyped[prevIndex];
        return newTyped;
      });

      setCurrentCharacterIndex(prevIndex);

      const codePoints = Array.from(prevTarget);
      if (codePoints.length > 1) {
        codePoints.pop();
        const partial = codePoints.join("");
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
