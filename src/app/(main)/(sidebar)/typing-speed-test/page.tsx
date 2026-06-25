import { getLessons } from "@/supabaseFunctions/getData";
import { SpeedTestConfigurator } from "@/components/pages/SpeedTestConfigurator";

export default async function TypingSpeedTestPage() {
  const lessons = await getLessons("test");
  const testLesson = lessons?.[0];

  return (
    <section className="flex flex-col justify-center gap-2 md:gap-4 p-4 md:p-8 w-full max-w-5xl mx-auto h-[calc(100svh-4rem)] overflow-hidden">
      <div className="flex flex-col pb-4 my-auto w-full">
        <div className="mb-2">
          <h1 className="text-3xl font-semibold tracking-tighter capitalize md:text-4xl text-foreground">
            Speed Test
          </h1>
          <p className="mt-1 text-sm md:text-base text-muted-foreground max-w-[65ch]">
            Select your preferred duration and test your typing speed and
            accuracy.
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full">
          {testLesson ? (
            <SpeedTestConfigurator lessonId={testLesson.id} />
          ) : (
            <div className="p-8 border border-border rounded-3xl bg-card flex flex-col items-center justify-center min-h-[200px]">
              <p className="text-muted-foreground">
                Speed test configuration is currently unavailable.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
