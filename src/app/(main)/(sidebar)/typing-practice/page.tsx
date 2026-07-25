import { getLessons } from "@/supabaseFunctions/getData";
import { PracticeConfigurator } from "@/components/pages/PracticeConfigurator";

export default async function TypingPracticePage() {
  const lessons = await getLessons("practice");

  return (
    <>
      {lessons && lessons.length > 0 ? (
        <PracticeConfigurator lessons={lessons} />
      ) : (
        <div className="p-8 border border-border rounded-3xl bg-card flex flex-col items-center justify-center min-h-[200px]">
          <p className="text-muted-foreground">
            Practice configuration is currently unavailable.
          </p>
        </div>
      )}
    </>
  );
}
