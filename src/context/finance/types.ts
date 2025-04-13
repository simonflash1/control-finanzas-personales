
import { Database } from "@/integrations/supabase/types";

export type CategoryType = Database["public"]["Enums"]["category_type"];
export type AccountType = Database["public"]["Enums"]["account_type"];

export interface Expense {
  id: string;
  amount: number;
  category: CategoryType;
  date: string;
  description: string;
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

export interface FinanceContextType {
  expenses: Expense[];
  incomes: Income[];
  accounts: Account[];
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
  getCategoryExpenses: () => Record<CategoryType, number>;
  getCategoryExpenseCount: (category: CategoryType) => number;
  getAllCategories: () => CategoryType[];
  refreshData: () => Promise<void>;
}
