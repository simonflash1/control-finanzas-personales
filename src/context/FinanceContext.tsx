
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";

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

interface FinanceContextType {
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

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  // Function to fetch all data from Supabase
  const fetchData = async () => {
    if (!user) {
      setExpenses([]);
      setIncomes([]);
      setAccounts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      // Fetch expenses
      const { data: expensesData, error: expensesError } = await supabase
        .from('expenses')
        .select('*')
        .order('date', { ascending: false });

      if (expensesError) {
        throw expensesError;
      }
      
      // Fetch incomes
      const { data: incomesData, error: incomesError } = await supabase
        .from('incomes')
        .select('*')
        .order('date', { ascending: false });

      if (incomesError) {
        throw incomesError;
      }
      
      // Fetch accounts
      const { data: accountsData, error: accountsError } = await supabase
        .from('accounts')
        .select('*');

      if (accountsError) {
        throw accountsError;
      }

      setExpenses(expensesData || []);
      setIncomes(incomesData || []);
      setAccounts(accountsData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load your financial data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Refresh data function
  const refreshData = async () => {
    await fetchData();
  };

  // Fetch data when user changes
  useEffect(() => {
    fetchData();
  }, [user]);

  // Add expense to Supabase
  const addExpense = async (expense: Omit<Expense, 'id'>) => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('expenses')
      .insert([
        { 
          ...expense,
          user_id: user.id 
        }
      ])
      .select();

    if (error) {
      console.error('Error adding expense:', error);
      toast({
        title: "Error",
        description: "Failed to add expense. Please try again.",
        variant: "destructive"
      });
      throw error;
    }

    setExpenses(prev => [...prev, data[0]]);
  };

  // Edit expense in Supabase
  const editExpense = async (id: string, updatedExpense: Omit<Expense, 'id'>) => {
    if (!user) return;
    
    const { error } = await supabase
      .from('expenses')
      .update(updatedExpense)
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error editing expense:', error);
      toast({
        title: "Error",
        description: "Failed to update expense. Please try again.",
        variant: "destructive"
      });
      throw error;
    }

    setExpenses(prev => prev.map(expense => 
      expense.id === id ? { ...updatedExpense, id } : expense
    ));
  };

  // Delete expense from Supabase
  const deleteExpense = async (id: string) => {
    if (!user) return;
    
    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting expense:', error);
      toast({
        title: "Error",
        description: "Failed to delete expense. Please try again.",
        variant: "destructive"
      });
      throw error;
    }

    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  // Update all expenses of a specific category to use a new category name
  const updateCategory = async (oldCategory: CategoryType, newCategory: string) => {
    if (!user) return;
    
    // In a real Supabase app, we would need to update the Enum type
    // This is just a mock implementation that updates the local state
    // since we can't modify Enum types from the client side
    toast({
      title: "Info",
      description: "Category updates currently only affect local state. Database enum changes require admin intervention.",
    });
    
    setExpenses(expenses.map(expense => 
      expense.category === oldCategory ? { ...expense, category: newCategory as CategoryType } : expense
    ));
  };

  // Delete all expenses of a specific category
  const deleteCategory = async (category: CategoryType) => {
    if (!user) return;
    
    // Similar to updateCategory, this is a mock implementation
    // In a real app, we would need admin intervention to modify Enum types
    toast({
      title: "Info",
      description: "Category deletions currently only affect local state. Database enum changes require admin intervention.",
    });
    
    setExpenses(expenses.filter(expense => expense.category !== category));
  };

  // Add income to Supabase
  const addIncome = async (income: Omit<Income, 'id'>) => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('incomes')
      .insert([
        { 
          ...income,
          user_id: user.id 
        }
      ])
      .select();

    if (error) {
      console.error('Error adding income:', error);
      toast({
        title: "Error",
        description: "Failed to add income. Please try again.",
        variant: "destructive"
      });
      throw error;
    }

    setIncomes(prev => [...prev, data[0]]);
  };

  // Edit income in Supabase
  const editIncome = async (id: string, updatedIncome: Omit<Income, 'id'>) => {
    if (!user) return;
    
    const { error } = await supabase
      .from('incomes')
      .update(updatedIncome)
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error editing income:', error);
      toast({
        title: "Error",
        description: "Failed to update income. Please try again.",
        variant: "destructive"
      });
      throw error;
    }

    setIncomes(prev => prev.map(income => 
      income.id === id ? { ...updatedIncome, id } : income
    ));
  };

  // Delete income from Supabase
  const deleteIncome = async (id: string) => {
    if (!user) return;
    
    const { error } = await supabase
      .from('incomes')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting income:', error);
      toast({
        title: "Error",
        description: "Failed to delete income. Please try again.",
        variant: "destructive"
      });
      throw error;
    }

    setIncomes(prev => prev.filter(income => income.id !== id));
  };

  // Add account to Supabase
  const addAccount = async (account: Omit<Account, 'id'>) => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('accounts')
      .insert([
        { 
          ...account,
          user_id: user.id 
        }
      ])
      .select();

    if (error) {
      console.error('Error adding account:', error);
      toast({
        title: "Error",
        description: "Failed to add account. Please try again.",
        variant: "destructive"
      });
      throw error;
    }

    setAccounts(prev => [...prev, data[0]]);
  };

  // Update account balance in Supabase
  const updateAccount = async (id: string, balance: number) => {
    if (!user) return;
    
    const { error } = await supabase
      .from('accounts')
      .update({ balance })
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error updating account:', error);
      toast({
        title: "Error",
        description: "Failed to update account. Please try again.",
        variant: "destructive"
      });
      throw error;
    }

    setAccounts(prev => prev.map(account => 
      account.id === id ? { ...account, balance } : account
    ));
  };

  const getCategoryExpenses = (): Record<CategoryType, number> => {
    const categoryTotals = {
      food: 0,
      transport: 0,
      home: 0,
      health: 0,
      shopping: 0,
      entertainment: 0,
      other: 0,
    };

    expenses.forEach(expense => {
      categoryTotals[expense.category] += expense.amount;
    });

    return categoryTotals;
  };

  // Get the count of expenses for a specific category
  const getCategoryExpenseCount = (category: CategoryType): number => {
    return expenses.filter(expense => expense.category === category).length;
  };

  // Get a unique list of all categories used in expenses
  const getAllCategories = (): CategoryType[] => {
    // In this implementation, we just return all possible categories
    return ['food', 'transport', 'home', 'health', 'shopping', 'entertainment', 'other'];
  };

  return (
    <FinanceContext.Provider
      value={{
        expenses,
        incomes,
        accounts,
        totalBalance,
        totalExpenses,
        totalIncome,
        loading,
        addExpense,
        editExpense,
        deleteExpense,
        updateCategory,
        deleteCategory,
        addIncome,
        editIncome,
        deleteIncome,
        addAccount,
        updateAccount,
        getCategoryExpenses,
        getCategoryExpenseCount,
        getAllCategories,
        refreshData,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};
