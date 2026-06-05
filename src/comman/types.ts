import { Database } from '../supabaseServices/database.types';

export type Stage = Database["public"]["Tables"]["lessons"]["Row"]["stage"];

export type AddTypingResultArgs = Omit<Database["public"]["Functions"]["add_typing_result"]["Args"], "p_profile_id">;

export type LessonData = {
  group: string;
  id: string;
  sequence_number: number;
  stage: string;
  title: string;
  highest_accuracy: number;
};