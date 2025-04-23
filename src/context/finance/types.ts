import { Database } from "@/integrations/supabase/types";

export type CategoryType = Database["public"]["Enums"]["category_type"];
export type AccountType = Database["public"]["Enums"]["account_type"];
export type DebtType = Database["public"]["Enums"]["debt_type"];
export type ExpenseFrequency = Database["public"]["Enums"]["expense_frequency"];

export interface Expense {
  id: string;
  amount: number;
  base_amount?: number;
  category: CategoryType;
  date: string;
  description: string;
  is_recurring?: boolean;
  frequency?: ExpenseFrequency;
  next_due_date?: string;
  last_occurrence?: string;
  parent_expense_id?: string;
}

export interface Income {
  id: string;
  amount: number;
  source: string;
  date: string;
  description: string;
}

export interface Account {
  id: string;
  name: string;
  balance: number;
  color: string;
  type: AccountType;
}

export interface Debt {
  id: string;
  name: string;
  amount: number;
  remaining_amount: number;
  type: DebtType;
  interest_rate?: number;
  closing_date?: string;
  due_date: string;
  description?: string;
}

export interface FinanceContextType {
  expenses: Expense[];
  incomes: Income[];
  accounts: Account[];
  debts: Debt[];
  totalBalance: number;
  totalExpenses: number;
  totalIncome: number;
  loading: boolean;
  addExpense: (expense: Omit<Expense, 'id'>) => Promise<void>;
  editExpense: (id: string, updatedExpense: Omit<Expense, 'id'>) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
  updateCategory: (oldCategory: CategoryType, newCategory: string) => Promise<void>;
  deleteCategory: (category: CategoryType) => Promise<void>;
  addIncome: (income: Omit<Income, 'id'>) => Promise<void>;
  editIncome: (id: string, updatedIncome: Omit<Income, 'id'>) => Promise<void>;
  deleteIncome: (id: string) => Promise<void>;
  addAccount: (account: Omit<Account, 'id'>) => Promise<void>;
  updateAccount: (id: string, balance: number) => Promise<void>;
  addDebt: (debt: Omit<Debt, 'id'>) => Promise<void>;
  updateDebt: (id: string, updatedDebt: Partial<Debt>) => Promise<void>;
  deleteDebt: (id: string) => Promise<void>;
  getCategoryExpenses: () => Record<CategoryType, number>;
  getCategoryExpenseCount: (category: CategoryType) => number;
  getAllCategories: () => CategoryType[];
  refreshData: () => Promise<void>;
}
