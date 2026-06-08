export function LessonHeader({
  title,
}: {
  title?: string;
}) {
  return (
    <div className="flex flex-col gap-4 justify-between items-start px-6 mb-6 w-full max-w-5xl md:flex-row md:items-end">
      <div className="space-y-1 cursor-default">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl text-foreground">
          {title || "Typing Practice"}
        </h1>
      </div>
    </div>
  );
}
