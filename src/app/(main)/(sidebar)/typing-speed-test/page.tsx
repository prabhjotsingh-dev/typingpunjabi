

export default function TypingSpeedTestPage() {
  return (
    <section className="flex flex-col gap-6 p-6 w-full md:p-10">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight capitalize md:text-4xl text-foreground">
              Speed Test
            </h1>
            <p className="mt-2 text-sm text-muted-foreground md:text-base">
              Test your typing speed and accuracy.
            </p>
          </div>
          <div className="flex flex-col gap-10 w-full">
            {/* Content for typing speed test will go here */}
          </div>
    </section>
  );
}
