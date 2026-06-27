import Timer from "@/components/lesson/timer";
import { Card } from "@/components/ui/card";

interface StatsBarProps {
  noOfCorrectChar: number;
  noOfIncorrectChar: number;
  id: string | string[] | undefined;
  title?: string;
  timeLimit?: number;
}

export function StatsBar({
  noOfCorrectChar,
  noOfIncorrectChar,
  id,
  title,
  timeLimit,
}: StatsBarProps) {
  return (
    <Card className="flex flex-row flex-wrap justify-center gap-x-4 gap-y-2 items-center px-4 py-2.5 mb-6 rounded-2xl md:rounded-full shadow-sm backdrop-blur-md cursor-default border-border/60 bg-card/80">
      <h1 className="flex items-center m-0 font-mono text-xs sm:text-sm font-medium capitalize md:text-base text-foreground/80 text-center w-full md:w-auto md:border-r md:border-border md:pr-4">
        {title || "Typing Practice"}
      </h1>
      <Timer
        start={noOfCorrectChar + noOfIncorrectChar >= 1}
        correct={noOfCorrectChar}
        incorrect={noOfIncorrectChar}
        id={id}
        title={title}
        timeLimit={timeLimit}
        timeClass="font-mono text-xs sm:text-sm md:text-base font-medium text-foreground/80 flex items-center capitalize m-0"
        speedClass="font-mono text-xs sm:text-sm md:text-base font-medium text-foreground/80 flex items-center border-l border-border pl-4 capitalize m-0"
      />
    </Card>
  );
}
