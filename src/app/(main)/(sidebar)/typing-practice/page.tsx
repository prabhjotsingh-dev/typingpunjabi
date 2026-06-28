import { getLessons } from "@/supabaseFunctions/getData";
import { PracticeConfigurator } from "@/components/pages/PracticeConfigurator";

export default async function TypingPracticePage() {
  const lessons = await getLessons("practice");
  const testLesson = lessons?.[0];

  return (
    <>
          {testLesson ? (
            <PracticeConfigurator lessonId={testLesson.id} />
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
