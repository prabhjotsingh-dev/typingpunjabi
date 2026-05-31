import { createServerClient } from "@/supabaseServices/clients/serverClient";
import { redirect } from "next/navigation";

export async function getLessonResult(id: string) {
  const supabase = await createServerClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect('/login');
  }

  const userId = user.id;
  const progressSelect = `lesson_progress!left(stars, highest_wpm, highest_accuracy)`;

  const { data, error } = await supabase
    .from('lessons')
    .select(`*, ${progressSelect}`)
    .eq('id', id)
    .eq('lesson_progress.profile_id', userId)
    .single();

  if (error || !data) {
    throw new Error(error?.message || "Error loading result");
  }

  return data;
}
