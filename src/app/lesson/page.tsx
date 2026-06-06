import { getLessons } from "@/supabaseFunctions/getData";
import LessonsPageUI from "../../components/pages/lesssonsPageUI";

export default async function Lesson() {
  const lessonsData = await getLessons();

  return <LessonsPageUI lessonsData={lessonsData} />;
}
