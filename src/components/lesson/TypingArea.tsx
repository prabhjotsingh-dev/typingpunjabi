import Character from "./Character";
import { Card } from "@/components/ui/card";

interface TypingAreaProps {
  allCharacters: string[];
  start: number;
  end: number;
  currentCharacterIndex: number;
  typed: Record<number, boolean | null>;
  input: string;
}

export function TypingArea({
  allCharacters,
  start,
  end,
  currentCharacterIndex,
  typed,
  input,
}: TypingAreaProps) {
  return (
    <div className="relative px-4 w-full max-w-5xl md:px-6">
      <Card className="w-full border-border/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] rounded-[2.5rem] bg-card overflow-hidden cursor-text">
        <div className="flex flex-wrap content-start px-6 transition-all md:px-10">
          {allCharacters != null ? (
            allCharacters
              .slice(start, end)
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
            <div className="w-full min-h-[100px] flex items-center justify-center space-x-2 text-muted-foreground">
              <div className="w-2.5 h-2.5 rounded-full animate-bounce bg-muted"></div>
              <div className="w-2.5 h-2.5 rounded-full delay-75 animate-bounce bg-muted"></div>
              <div className="w-2.5 h-2.5 rounded-full delay-150 animate-bounce bg-muted"></div>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center px-8 py-4 font-mono text-sm border-t cursor-default bg-border border-border text-muted-foreground">
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
  );
}
