import { getLessonResult, getLessons } from "@/supabaseFunctions/getData";
import Routes from "@/comman/routes";
import ResultPageUI from "@/components/pages/resultPageUI";
import GuestResult from "@/components/common/GuestResult";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function Result({ params }: PageProps) {
  const id = (await params).id;
  let data;
  let lessons: Awaited<ReturnType<typeof getLessons>> = [];

  try {
    [data, lessons] = await Promise.all([
      getLessonResult(id),
      getLessons(),
    ]);
  } catch (error) {
    data = null;
    lessons = [];
  }

  const current = lessons?.find((l) => l.id === id);
  const next = current
    ? lessons
        .filter(
          (l) =>
            l.stage === current.stage &&
            l.sequence_number > current.sequence_number
        )
        .sort((a, b) => a.sequence_number - b.sequence_number)[0]
    : undefined;
  const nextLink = next ? Routes.toLesson(next.id) : undefined;

  if (!data) {
    return (
      <GuestResult
        lessonId={id}
        listLink={Routes.lessons}
        againLink={Routes.toLesson(id)}
        nextLink={nextLink}
        listLabel="Lessons"
      />
    );
  }

  const speed = data.wpm ?? 0;
  const accuracy = data.accuracy ?? 0;

  return (
    <ResultPageUI
      speed={speed}
      accuracy={accuracy}
      lesson_title={data.lesson_title}
      listLink={Routes.lessons}
      againLink={Routes.toLesson(id)}
      nextLink={nextLink}
      listLabel="Lessons"
    />
  );
}

export default Result;