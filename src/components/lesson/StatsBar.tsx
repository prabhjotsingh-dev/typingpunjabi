import Timer from "@/components/lesson/timer";
import { Card } from "@/components/ui/card";

interface StatsBarProps {
  noOfCorrectChar: number;
  noOfIncorrectChar: number;
  id: string | string[] | undefined;
  title?: string;
  timeLimit?: number;
  mode?: string;
  contentSource?: string;
  customText?: string | null;
  value: string;
  onFinish?: () => void;
}

export function StatsBar({
  noOfCorrectChar,
  noOfIncorrectChar,
  id,
  title,
  timeLimit,
  mode,
  contentSource,
  customText,
  value,
  onFinish,
}: StatsBarProps) {
  return (
    <Card className="flex flex-row flex-nowrap gap-4 items-center px-5 py-2.5 mb-6 whitespace-nowrap rounded-full shadow-sm backdrop-blur-md cursor-default border-border/60 bg-card/80">
      <h1 className="flex items-center m-0 font-mono text-sm font-medium capitalize md:text-base text-foreground/80">
        {title || "Typing Practice"}
      </h1>
      <Timer
        start={noOfCorrectChar + noOfIncorrectChar >= 1}
        correct={noOfCorrectChar}
        incorrect={noOfIncorrectChar}
        id={id}
        title={title}
        timeLimit={timeLimit}
        mode={mode}
        contentSource={contentSource}
        customText={customText}
        value={value}
        onFinish={onFinish}
        timeClass="font-mono text-sm md:text-base font-medium text-foreground/80 flex items-center border-l border-border pl-4 capitalize m-0"
        speedClass="font-mono text-sm md:text-base font-medium text-foreground/80 flex items-center border-l border-border pl-4 capitalize m-0"
      />
    </Card>
  );
}
