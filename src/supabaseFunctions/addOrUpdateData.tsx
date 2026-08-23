"use server";
import { createServerClient } from "@/supabaseServices/clients/serverClient";
import { AddTypingResultArgs, ThemePreference } from "@/comman/types";
import type { Json } from "@/supabaseServices/database.types";
class AddOrUpdateData {
  private static async getAuth() {
    const supabase = await createServerClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    return { supabase, user, authError };
    return { supabase, user, authError };
  }

  static async addTypingResult(params: AddTypingResultArgs) {
    const { supabase, user, authError } = await AddOrUpdateData.getAuth();

    if (authError || !user) {
      return { error: 'UNAUTHORIZED' };
    }
    const { supabase, user, authError } = await AddOrUpdateData.getAuth();

    if (authError || !user) {
      return { error: 'UNAUTHORIZED' };
    }

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
    const { supabase, user, authError } = await AddOrUpdateData.getAuth();

    if (authError || !user) {
      return null;
    }

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

    const result = data as Json;
    if (!result || typeof result !== "object" || Array.isArray(result)) return null;

    if (result.success === false) {
      throw new Error((result.error as string) || "Profile update failed");
    }

    if (!result.updated) return null;

    return result.updated as Partial<{
      username: string;
      theme_preference: ThemePreference;
      is_profile_public: boolean;
      show_on_leaderboard: boolean;
    }>;
}}
export const addTypingResult = AddOrUpdateData.addTypingResult;
export const updateProfileFields = AddOrUpdateData.updateProfileFields;
