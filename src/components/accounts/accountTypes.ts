
export interface Account {
  id: string;
  name: string;
  balance: number;
  type: string;
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

export type AccountType = typeof accountTypes[number]['value'];

export interface NewAccountData {
  user_id: string;
  name: string;
  balance: number;
  type: string;
  color: string;
}

export interface UpdateAccountData {
  name: string;
  balance: number;
  type: string;
  color: string;
}
