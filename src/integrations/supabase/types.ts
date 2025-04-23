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
          base_amount: number | null
          category: Database["public"]["Enums"]["category_type"]
          created_at: string
          date: string
          description: string | null
          frequency: Database["public"]["Enums"]["expense_frequency"] | null
          id: string
          is_recurring: boolean | null
          last_occurrence: string | null
          next_due_date: string | null
          parent_expense_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount: number
          base_amount?: number | null
          category: Database["public"]["Enums"]["category_type"]
          created_at?: string
          date?: string
          description?: string | null
          frequency?: Database["public"]["Enums"]["expense_frequency"] | null
          id?: string
          is_recurring?: boolean | null
          last_occurrence?: string | null
          next_due_date?: string | null
          parent_expense_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          base_amount?: number | null
          category?: Database["public"]["Enums"]["category_type"]
          created_at?: string
          date?: string
          description?: string | null
          frequency?: Database["public"]["Enums"]["expense_frequency"] | null
          id?: string
          is_recurring?: boolean | null
          last_occurrence?: string | null
          next_due_date?: string | null
          parent_expense_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "expenses_parent_expense_id_fkey"
            columns: ["parent_expense_id"]
            isOneToOne: false
            referencedRelation: "expenses"
            referencedColumns: ["id"]
          },
        ]
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
      music_teachers: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
          school: string | null
          teaching_grades: string[] | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id: string
          school?: string | null
          teaching_grades?: string[] | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
          school?: string | null
          teaching_grades?: string[] | null
          updated_at?: string
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
      student_grades: {
        Row: {
          comments: string | null
          created_at: string
          grade: number
          group_id: string
          id: string
          period: number
          student_id: string
          teacher_id: string
          updated_at: string
        }
        Insert: {
          comments?: string | null
          created_at?: string
          grade: number
          group_id: string
          id?: string
          period: number
          student_id: string
          teacher_id: string
          updated_at?: string
        }
        Update: {
          comments?: string | null
          created_at?: string
          grade?: number
          group_id?: string
          id?: string
          period?: number
          student_id?: string
          teacher_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_grades_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "student_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_grades_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_groups: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          teacher_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          teacher_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          teacher_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      students: {
        Row: {
          created_at: string
          first_name: string
          group_id: string
          id: string
          last_name: string
          teacher_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          first_name: string
          group_id: string
          id?: string
          last_name: string
          teacher_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          first_name?: string
          group_id?: string
          id?: string
          last_name?: string
          teacher_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "students_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "student_groups"
            referencedColumns: ["id"]
          },
        ]
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
      expense_frequency: "one_time" | "monthly" | "variable_monthly"
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
      expense_frequency: ["one_time", "monthly", "variable_monthly"],
    },
  },
} as const
