"use server";
import { createServerClient } from "@/supabaseServices/clients/serverClient";
import { redirect } from "next/navigation";
import { AddTypingResultArgs, ThemePreference } from "@/comman/types";
class AddOrUpdateData {
  private static async getAuth() {
    const supabase = await createServerClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      redirect('/login');
    }

    return { supabase, user };
  }

  static async addTypingResult(params: AddTypingResultArgs) {
    const { supabase, user } = await AddOrUpdateData.getAuth();

    const { data, error } = await supabase.rpc('add_typing_result', {
      ...params,
      p_profile_id: user.id
    });

    if (error) {
      console.error("Error adding typing result:", error);
      throw new Error(error.message || "Error adding typing result");
    }

    return data;
  }
  static async updateProfileFields(params: {
    is_profile_public?: boolean;
    show_on_leaderboard?: boolean;
    theme_preference?: ThemePreference;
    username?: string;
  }) {
    const { supabase, user } = await AddOrUpdateData.getAuth();

    const { data, error } = await supabase.rpc('update_profile_fields', {
      p_profile_id: user.id,
      p_username: params.username,
      p_theme_preference: params.theme_preference,
      p_is_profile_public: params.is_profile_public,
      p_show_on_leaderboard: params.show_on_leaderboard
    });

    if (error) {
      console.error('RPC error:', error);
      throw new Error(error.message || 'RPC call failed');
    }

    const result = data as any;
    if (result && result.success === false) {
      throw new Error(result.error || 'Profile update failed');
    }

  return result.updated as Partial<{
    username: string;
    theme_preference: ThemePreference;
    is_profile_public: boolean;
    show_on_leaderboard: boolean;
  }>;
}}
export const addTypingResult = AddOrUpdateData.addTypingResult;
export const updateProfileFields = AddOrUpdateData.updateProfileFields;
