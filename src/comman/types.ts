import { Database } from '../supabaseServices/database.types';

export type Stage = Database["public"]["Tables"]["lessons"]["Row"]["stage"];

export type ThemePreference = Database["public"]["Enums"]["profile_theme"];

export type AddTypingResultArgs = Omit<Database["public"]["Functions"]["add_typing_result"]["Args"], "p_profile_id">;

export type LessonData = {
  group: string;
  id: string;
  sequence_number: number;
  stage: string;
  title: string;
  highest_accuracy: number;
};

export type LoginForm = {
  email: string;
  password: string;
  remember?: boolean;
};

export type SignUpForm = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};


export interface PracticeConfiguratorProps {
  lessons: LessonData[];
}

export interface SpeedTestConfiguratorProps {
  lessonId: string;
}

