export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      lesson_stats: {
        Row: {
          created_at: string
          highest_accuracy: number
          highest_wpm: number
          last_played_at: string
          lesson_id: string
          lesson_title: string
          profile_id: string
          times_played: number
        }
        Insert: {
          created_at?: string
          highest_accuracy?: number
          highest_wpm?: number
          last_played_at?: string
          lesson_id: string
          lesson_title?: string
          profile_id: string
          times_played?: number
        }
        Update: {
          created_at?: string
          highest_accuracy?: number
          highest_wpm?: number
          last_played_at?: string
          lesson_id?: string
          lesson_title?: string
          profile_id?: string
          times_played?: number
        }
        Relationships: [
          {
            foreignKeyName: "lesson_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lesson_progress_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          alphabets: string | null
          content: string
          created_at: string
          group: Database["public"]["Enums"]["lesson_group"]
          id: string
          is_published: boolean
          sequence_number: number
          stage: Database["public"]["Enums"]["lesson_stage"]
          title: string
          updated_at: string
        }
        Insert: {
          alphabets?: string | null
          content: string
          created_at?: string
          group: Database["public"]["Enums"]["lesson_group"]
          id?: string
          is_published?: boolean
          sequence_number: number
          stage?: Database["public"]["Enums"]["lesson_stage"]
          title: string
          updated_at?: string
        }
        Update: {
          alphabets?: string | null
          content?: string
          created_at?: string
          group?: Database["public"]["Enums"]["lesson_group"]
          id?: string
          is_published?: boolean
          sequence_number?: number
          stage?: Database["public"]["Enums"]["lesson_stage"]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          account_type: Database["public"]["Enums"]["profile_type"]
          created_at: string
          id: string
          is_profile_public: boolean
          show_on_leaderboard: boolean
          theme_preference: Database["public"]["Enums"]["profile_theme"]
          updated_at: string
          username: string | null
        }
        Insert: {
          account_type?: Database["public"]["Enums"]["profile_type"]
          created_at?: string
          id: string
          is_profile_public?: boolean
          show_on_leaderboard?: boolean
          theme_preference?: Database["public"]["Enums"]["profile_theme"]
          updated_at?: string
          username?: string | null
        }
        Update: {
          account_type?: Database["public"]["Enums"]["profile_type"]
          created_at?: string
          id?: string
          is_profile_public?: boolean
          show_on_leaderboard?: boolean
          theme_preference?: Database["public"]["Enums"]["profile_theme"]
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      typing_results: {
        Row: {
          accuracy: number
          consistency: number | null
          content_source: string
          correct_chars: number
          cpm: number
          created_at: string
          custom_text: string | null
          duration_seconds: number
          id: string
          incorrect_chars: number
          is_completed: boolean
          lesson_id: string
          lesson_title: string
          mode: string
          profile_id: string
          total_chars: number
          wpm: number
        }
        Insert: {
          accuracy: number
          consistency?: number | null
          content_source: string
          correct_chars?: number
          cpm: number
          created_at?: string
          custom_text?: string | null
          duration_seconds: number
          id?: string
          incorrect_chars?: number
          is_completed?: boolean
          lesson_id: string
          lesson_title?: string
          mode: string
          profile_id: string
          total_chars?: number
          wpm: number
        }
        Update: {
          accuracy?: number
          consistency?: number | null
          content_source?: string
          correct_chars?: number
          cpm?: number
          created_at?: string
          custom_text?: string | null
          duration_seconds?: number
          id?: string
          incorrect_chars?: number
          is_completed?: boolean
          lesson_id?: string
          lesson_title?: string
          mode?: string
          profile_id?: string
          total_chars?: number
          wpm?: number
        }
        Relationships: [
          {
            foreignKeyName: "typing_results_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "typing_results_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_stats: {
        Row: {
          average_accuracy: number
          average_cpm: number
          average_wpm: number
          created_at: string | null
          highest_cpm: number
          highest_wpm: number
          profile_id: string
          total_tests_completed: number
          total_time_typed_seconds: number
          updated_at: string
        }
        Insert: {
          average_accuracy?: number
          average_cpm?: number
          average_wpm?: number
          created_at?: string | null
          highest_cpm?: number
          highest_wpm?: number
          profile_id: string
          total_tests_completed?: number
          total_time_typed_seconds?: number
          updated_at?: string
        }
        Update: {
          average_accuracy?: number
          average_cpm?: number
          average_wpm?: number
          created_at?: string | null
          highest_cpm?: number
          highest_wpm?: number
          profile_id?: string
          total_tests_completed?: number
          total_time_typed_seconds?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_stats_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_typing_result: {
        Args: {
          p_accuracy: number
          p_consistency?: number
          p_content_source: string
          p_correct_chars?: number
          p_cpm: number
          p_custom_text?: string
          p_duration_seconds: number
          p_incorrect_chars?: number
          p_is_completed?: boolean
          p_lesson_id: string
          p_lesson_title?: string
          p_mode: string
          p_profile_id: string
          p_total_chars?: number
          p_wpm: number
        }
        Returns: {
          accuracy: number
          consistency: number | null
          content_source: string
          correct_chars: number
          cpm: number
          created_at: string
          custom_text: string | null
          duration_seconds: number
          id: string
          incorrect_chars: number
          is_completed: boolean
          lesson_id: string
          lesson_title: string
          mode: string
          profile_id: string
          total_chars: number
          wpm: number
        }
        SetofOptions: {
          from: "*"
          to: "typing_results"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      get_dashboard_data: {
        Args: { id: string }
        Returns: {
          account_type: Database["public"]["Enums"]["profile_type"]
          average_accuracy: number
          average_cpm: number
          average_wpm: number
          highest_cpm: number
          highest_wpm: number
          is_profile_public: boolean
          profiles_created_at: string
          profiles_updated_at: string
          show_on_leaderboard: boolean
          theme_preference: Database["public"]["Enums"]["profile_theme"]
          total_tests_completed: number
          total_time_typed_seconds: number
          user_stats_created_at: string
          user_stats_updated_at: string
          username: string
        }[]
      }
      get_latest_result: {
        Args: { lesson_id: string; profile_id: string }
        Returns: {
          accuracy: number
          consistency: number
          correct_chars: number
          cpm: number
          duration_seconds: number
          incorrect_chars: number
          is_completed: boolean
          lesson_title: string
          total_chars: number
          wpm: number
        }[]
      }
      get_learned_alphabets: {
        Args: { p_min_accuracy?: number; p_profile_id: string }
        Returns: {
          alphabets: string
        }[]
      }
      get_lesson_stats: {
        Args: { profile_id: string }
        Returns: {
          created_at: string
          highest_accuracy: number
          highest_wpm: number
          last_played_at: string
          lesson_id: string
          lesson_title: string
          profile_id: string
          times_played: number
        }[]
      }
      get_lessons: {
        Args: {
          p_group?: Database["public"]["Enums"]["lesson_group"]
          p_profile: string
          p_stage?: Database["public"]["Enums"]["lesson_stage"]
        }
        Returns: {
          group: string
          highest_accuracy: number
          id: string
          sequence_number: number
          stage: string
          title: string
        }[]
      }
      get_lessons_content: {
        Args: { lesson_id: string }
        Returns: {
          content: string
          title: string
        }[]
      }
      get_profile_theme: { Args: { profile_id: string }; Returns: string }
      get_result: {
        Args: { id: string }
        Returns: {
          accuracy: number
          consistency: number
          correct_chars: number
          cpm: number
          duration_seconds: number
          incorrect_chars: number
          is_completed: boolean
          lesson_title: string
          total_chars: number
          wpm: number
        }[]
      }
      update_profile_fields: {
        Args: {
          p_is_profile_public?: boolean
          p_profile_id: string
          p_show_on_leaderboard?: boolean
          p_theme_preference?: Database["public"]["Enums"]["profile_theme"]
          p_username?: string
        }
        Returns: Json
      }
    }
    Enums: {
      lesson_group:
        | "all-alphabets"
        | "top row"
        | "home row"
        | "bottom row"
        | "custom"
        | "from-completed-lessons"
      lesson_stage:
        | "beginner"
        | "intermediate"
        | "advance"
        | "test"
        | "practice"
      profile_theme: "dark" | "light" | "system"
      profile_type: "registered" | "guest"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      lesson_group: [
        "all-alphabets",
        "top row",
        "home row",
        "bottom row",
        "custom",
        "from-completed-lessons",
      ],
      lesson_stage: ["beginner", "intermediate", "advance", "test", "practice"],
      profile_theme: ["dark", "light", "system"],
      profile_type: ["registered", "guest"],
    },
  },
} as const
