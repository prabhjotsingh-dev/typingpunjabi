import {
  isNormalLetter,
  isNuktaLetter,
  isMatra,
  PUNJABI_LETTERS,
  PUNJABI_MATRAS,
} from "@/lib/transliteration/languages/punjabi";

const ALL_LETTERS = [...PUNJABI_LETTERS, "ਜ਼", "ਖ਼", "ਗ਼", "ਫ਼"];

interface CustomLettersPanelProps {
  practiceType: string;
  selectedLetters: string[];
  toggleLetter: (letter: string) => void;
  setSelectedLetters: React.Dispatch<React.SetStateAction<string[]>>;
}

export function CustomLettersPanel({
  practiceType,
  selectedLetters,
  toggleLetter,
  setSelectedLetters,
}: CustomLettersPanelProps) {
  const allLettersSelected = ALL_LETTERS.every((l) =>
    selectedLetters.includes(l),
  );
  const allMatrasSelected = PUNJABI_MATRAS.every((m) =>
    selectedLetters.includes(m),
  );

  const handleToggleAll = (items: string[], isAllSelected: boolean) => {
    setSelectedLetters((prev) => {
      if (isAllSelected) {
        return prev.filter((item) => !items.includes(item));
      }
      const existing = new Set(prev);
      for (const item of items) existing.add(item);
      return [...existing];
    });
  };

  return (
    <div
      className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${
        practiceType === "custom" ? "opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="rounded-2xl border border-border/50 bg-card shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] p-6 md:p-10 flex flex-col gap-12">
        {/* Consonants */}
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-center border-b border-border/30">
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-muted-foreground">
              Letters
            </h3>
            <div className="flex gap-3 items-center">
              <button
                onClick={() => handleToggleAll(ALL_LETTERS, allLettersSelected)}
                className="text-[10px] text-center font-mono px-3 py-1.5 bg-muted/50 rounded-2xl border border-border/50 text-foreground font-medium uppercase tracking-wider hover:bg-muted/80 transition-colors w-28"
              >
                {allLettersSelected ? "Deselect All" : "Select All"}
              </button>
              <span className="text-[10px] text-center font-mono px-3 py-1.5 bg-muted/50 rounded-2xl border border-border/50 text-foreground font-medium uppercase tracking-wider w-24">
                {
                  selectedLetters.filter(
                    (l) => isNormalLetter(l) || isNuktaLetter(l),
                  ).length
                }{" "}
                Active
              </span>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="grid grid-cols-5 gap-3 justify-items-center items-center w-full md:gap-4">
              {ALL_LETTERS.map((letter) => (
                <button
                  key={letter}
                  onClick={() => toggleLetter(letter)}
                  className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center text-xl md:text-2xl font-medium rounded-2xl transition-all duration-300 active:scale-[0.92] border ${
                    selectedLetters.includes(letter)
                      ? "bg-foreground text-background border-foreground shadow-[0_8px_16px_-6px_rgba(0,0,0,0.2)] -translate-y-0.5"
                      : "bg-background text-foreground border-border/50 shadow-sm hover:border-foreground/30 hover:bg-muted/40 hover:-translate-y-px"
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Matras & Symbols */}
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-center pb-4 border-b border-border/30">
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-muted-foreground">
              Matras & Symbols
            </h3>
            <div className="flex gap-3 items-center">
              <button
                onClick={() => handleToggleAll(PUNJABI_MATRAS, allMatrasSelected)}
                className="text-[10px] text-center font-mono px-3 py-1.5 bg-muted/50 rounded-2xl border border-border/50 text-foreground font-medium uppercase tracking-wider hover:bg-muted/80 transition-colors w-28"
              >
                {allMatrasSelected ? "Deselect All" : "Select All"}
              </button>
              <span className="text-[10px] text-center font-mono px-3 py-1.5 bg-muted/50 rounded-2xl border border-border/50 text-foreground font-medium uppercase tracking-wider w-24">
                {selectedLetters.filter(isMatra).length} Active
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 justify-center mx-auto max-w-2xl md:gap-4">
            {PUNJABI_MATRAS.map((matra) => {
              return (
                <button
                  key={matra}
                  onClick={() => toggleLetter(matra)}
                  className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center text-2xl md:text-3xl font-medium rounded-2xl transition-all duration-300 active:scale-[0.92] border ${
                    selectedLetters.includes(matra)
                      ? "bg-foreground text-background border-foreground shadow-[0_8px_16px_-6px_rgba(0,0,0,0.2)] -translate-y-0.5"
                      : "bg-background text-foreground border-border/50 shadow-sm hover:border-foreground/30 hover:bg-muted/40 hover:-translate-y-px"
                  }`}
                >
                  {matra}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
