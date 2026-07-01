"use server";
import { createServerClient } from "@/supabaseServices/clients/serverClient";
import { LessonData, Stage } from "@/comman/types";
import { redirect } from "next/navigation";

class GetData {
  private static async getAuth() {
    const supabase = await createServerClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      redirect("/login");
    }

    return { supabase, user };
  }

  static async getLessons(stage?: Stage): Promise<LessonData[]> {
    const { supabase, user } = await GetData.getAuth();

    const { data, error } = await supabase.rpc("get_lessons", {
      p_profile: user.id,
      p_stage: stage,
    });

    if (error) {
      console.error("Error fetching lessons:", error);
      return [];
    }

    return (data as LessonData[]) || [];
  }

  static async getLessonContent(lesson_id: string) {
    const { supabase, user } = await GetData.getAuth();

    const { data, error } = await supabase.rpc("get_lessons_content", {
      lesson_id: lesson_id,
    });

    if (error) {
      console.error("Error fetching lesson content:", error);
      return null;
    }

    return data?.[0] || null;
  }

  static async getLessonResult(id: string) {
    const { supabase, user } = await GetData.getAuth();

    const { data, error } = await supabase.rpc("get_latest_result", {
      lesson_id: id,
      profile_id: user.id,
    });

    if (error || !data || data.length === 0) {
      throw new Error(error?.message || "Error loading result");
    }

    return data[0];
  }

  static async getDashboardData() {
    const { supabase, user } = await GetData.getAuth();

    const { data, error } = await supabase.rpc("get_dashboard_data", {
      id: user.id,
    });

    if (error) {
      console.error("Error fetching dashboard data:", error);
      return null;
    }

    if (!data || data.length === 0) {
      return null;
    }

    return data[0];
  }

  static async getLessonstats() {
    const { supabase, user } = await GetData.getAuth();

    const { data, error } = await supabase.rpc("get_lesson_stats", {
      profile_id: user.id,
    });

    if (error) {
      console.error("Error fetching lesson stats:", error);
      return [];
    }

    return data || [];
  }

  static async getProfileTheme() {
    const supabase = await createServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return "system";
    }

    const { data, error } = await supabase.rpc("get_profile_theme", {
      profile_id: user.id,
    });

    if (error) {
      console.error("Error fetching profile theme:", error);
      return "system";
    }

    return data || "system";
  }

  static async getLearnedAlphabets(): Promise<string | null> {
    const { supabase, user } = await GetData.getAuth();

    const { data, error } = await supabase.rpc("get_learned_alphabets", {
      p_profile_id: user.id,
    });

    if (error || !data) {
      console.error("Error fetching learned alphabets:", error);
      return null;
    }

    const allChars = new Set<string>();
    for (const d of (data as { alphabets: string }[])) {
      if (!d.alphabets) continue;
      for (const ch of d.alphabets.trim().split(/\s+/)) {
        if (ch) allChars.add(ch);
      }
    }

    return allChars.size > 0 ? [...allChars].join(",") : null;
  }
}

export const getLessons = GetData.getLessons;
export const getLessonContent = GetData.getLessonContent;
export const getLessonResult = GetData.getLessonResult;
export const getLessonstats = GetData.getLessonstats;
export const getDashboardData = GetData.getDashboardData;
export const getProfileTheme = GetData.getProfileTheme;
export const getLearnedAlphabets = GetData.getLearnedAlphabets;
