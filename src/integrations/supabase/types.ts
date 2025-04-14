export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      accounts: {
        Row: {
          balance: number
          color: string
          created_at: string
          id: string
          name: string
          type: Database["public"]["Enums"]["account_type"]
          updated_at: string
          user_id: string | null
        }
        Insert: {
          balance: number
          color: string
          created_at?: string
          id?: string
          name: string
          type: Database["public"]["Enums"]["account_type"]
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          balance?: number
          color?: string
          created_at?: string
          id?: string
          name?: string
          type?: Database["public"]["Enums"]["account_type"]
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      debts: {
        Row: {
          amount: number
          closing_date: string | null
          created_at: string
          description: string | null
          due_date: string
          id: string
          interest_rate: number | null
          name: string
          remaining_amount: number
          type: Database["public"]["Enums"]["debt_type"]
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount: number
          closing_date?: string | null
          created_at?: string
          description?: string | null
          due_date: string
          id?: string
          interest_rate?: number | null
          name: string
          remaining_amount: number
          type: Database["public"]["Enums"]["debt_type"]
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          closing_date?: string | null
          created_at?: string
          description?: string | null
          due_date?: string
          id?: string
          interest_rate?: number | null
          name?: string
          remaining_amount?: number
          type?: Database["public"]["Enums"]["debt_type"]
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      expenses: {
        Row: {
          amount: number
          category: Database["public"]["Enums"]["category_type"]
          created_at: string
          date: string
          description: string | null
          id: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount: number
          category: Database["public"]["Enums"]["category_type"]
          created_at?: string
          date?: string
          description?: string | null
          id?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          category?: Database["public"]["Enums"]["category_type"]
          created_at?: string
          date?: string
          description?: string | null
          id?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      incomes: {
        Row: {
          amount: number
          created_at: string
          date: string
          description: string | null
          id: string
          source: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          date?: string
          description?: string | null
          id?: string
          source: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          date?: string
          description?: string | null
          id?: string
          source?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      account_type: "bank" | "cash" | "credit" | "savings" | "other"
      category_type:
        | "food"
        | "transport"
        | "home"
        | "health"
        | "shopping"
        | "entertainment"
        | "other"
      debt_type: "loan" | "credit_card"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      account_type: ["bank", "cash", "credit", "savings", "other"],
      category_type: [
        "food",
        "transport",
        "home",
        "health",
        "shopping",
        "entertainment",
        "other",
      ],
      debt_type: ["loan", "credit_card"],
    },
  },
} as const
