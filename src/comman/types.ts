import { Database } from './database.types';

export type Stage = Database["public"]["Tables"]["lessons"]["Row"]["stage"];

export type LessonData = {
  group: string;
  id: string;
  is_completed: boolean;
  sequence_number: number;
  stage: string;
  stars: number;
  title: string;
};