import { getLessons } from "@/supabaseFunctions/getData";
import { PracticeConfigurator } from "@/components/pages/PracticeConfigurator";

export default async function TypingPracticePage() {
  const lessons = await getLessons("practice");
  const testLesson = lessons?.[0];

  return (
    <section className="flex flex-col gap-2 p-4 mx-auto w-full min-h-full md:gap-4 md:p-8">
      <div className="flex flex-col pb-4 w-full">
        <div className="flex flex-col gap-4 mt-6 w-full">
          {testLesson ? (
            <PracticeConfigurator lessonId={testLesson.id} />
          ) : (
            <div className="p-8 border border-border rounded-3xl bg-card flex flex-col items-center justify-center min-h-[200px]">
              <p className="text-muted-foreground">
                Practice configuration is currently unavailable.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
