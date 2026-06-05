"use server";
import { createServerClient } from "@/supabaseServices/clients/serverClient";
import { redirect } from "next/navigation";
import { AddTypingResultArgs } from "@/comman/types";

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
}

export const addTypingResult = AddOrUpdateData.addTypingResult;
