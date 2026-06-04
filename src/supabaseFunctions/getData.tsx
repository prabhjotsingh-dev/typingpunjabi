"use server";
import { createServerClient } from "@/supabaseServices/clients/serverClient";
import { LessonData } from "@/comman/types";
import { redirect } from "next/navigation";

class GetData {
  private static async getAuth() {
    const supabase = await createServerClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      redirect('/login');
    }

    return { supabase, user };
  }

  static async getLessons(): Promise<LessonData[]> {
    const { supabase, user } = await GetData.getAuth();

    const { data, error } = await supabase.rpc('get_lessons', {
      profile: user.id
    });

    if (error) {
      console.error("Error fetching lessons:", error);
      return [];
    }

    return data as LessonData[];
  }

  static async getLessonContent(lesson_id: string) {
    const { supabase, user } = await GetData.getAuth();

    const { data, error } = await supabase.rpc('get_lessons_content', {
      lesson_id: lesson_id
    });

    if (error) {
      console.error("Error fetching lesson content:", error);
      return null;
    }

    return data?.[0] || null;
  }

  static async getLessonResult(id: string) {
    const { supabase, user } = await GetData.getAuth();

    const { data, error } = await supabase.rpc('get_latest_result', {
      lesson_id: id,
      profile_id: user.id
    });

    if (error || !data || data.length === 0) {
      throw new Error(error?.message || "Error loading result");
    }

    return data[0];
  }
}



export const getLessons = GetData.getLessons;
export const getLessonContent = GetData.getLessonContent;
export const getLessonResult = GetData.getLessonResult;
