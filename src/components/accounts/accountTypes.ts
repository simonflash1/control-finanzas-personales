
import { Database } from "@/integrations/supabase/types";

export interface Account {
  id: string;
  name: string;
  balance: number;
  type: AccountType;
  color: string;
  user_id: string;
  created_at: string;
}

export const accountTypes = [
  { value: 'bank', label: 'Bank Account' },
  { value: 'cash', label: 'Cash' },
  { value: 'credit', label: 'Credit Card' },
  { value: 'savings', label: 'Savings' },
  { value: 'other', label: 'Other' }
] as const;

// Using the type from Supabase's generated types
export type AccountType = Database['public']['Enums']['account_type'];

export interface NewAccountData {
  user_id: string;
  name: string;
  balance: number;
  type: AccountType;
  color: string;
}

export interface UpdateAccountData {
  name: string;
  balance: number;
  type: AccountType;
  color: string;
}
