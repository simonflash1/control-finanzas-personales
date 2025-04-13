
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
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

interface FinanceContextType {
  expenses: Expense[];
  incomes: Income[];
  accounts: Account[];
  totalBalance: number;
  totalExpenses: number;
  totalIncome: number;
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  editExpense: (id: string, updatedExpense: Omit<Expense, 'id'>) => void;
  deleteExpense: (id: string) => void;
  updateCategory: (oldCategory: CategoryType, newCategory: string) => void;
  deleteCategory: (category: CategoryType) => void;
  addIncome: (income: Omit<Income, 'id'>) => void;
  editIncome: (id: string, updatedIncome: Omit<Income, 'id'>) => void;
  deleteIncome: (id: string) => void;
  addAccount: (account: Omit<Account, 'id'>) => void;
  updateAccount: (id: string, balance: number) => void;
  getCategoryExpenses: () => Record<CategoryType, number>;
  getCategoryExpenseCount: (category: CategoryType) => number;
  getAllCategories: () => CategoryType[];
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

// Sample data for demonstration
const sampleExpenses: Expense[] = [
  { id: '1', amount: 45.5, category: 'food', date: '2025-04-05', description: 'Grocery shopping' },
  { id: '2', amount: 30.0, category: 'transport', date: '2025-04-07', description: 'Gas' },
  { id: '3', amount: 120.0, category: 'home', date: '2025-04-10', description: 'Electricity bill' },
  { id: '4', amount: 55.0, category: 'health', date: '2025-04-12', description: 'Pharmacy' },
  { id: '5', amount: 85.75, category: 'shopping', date: '2025-04-01', description: 'New clothes' },
  { id: '6', amount: 25.0, category: 'entertainment', date: '2025-04-03', description: 'Movie tickets' },
  { id: '7', amount: 15.0, category: 'other', date: '2025-04-08', description: 'Miscellaneous' },
];

const sampleIncomes: Income[] = [
  { id: '1', amount: 1200, source: 'Salary', date: '2025-04-01', description: 'Monthly salary' },
  { id: '2', amount: 250, source: 'Freelance', date: '2025-04-15', description: 'Website project' },
];

const sampleAccounts: Account[] = [
  { id: '1', name: 'Main Bank', balance: 2540.50, color: '#3b82f6', type: 'bank' },
  { id: '2', name: 'Savings', balance: 5000.25, color: '#10b981', type: 'savings' },
  { id: '3', name: 'Cash', balance: 150.0, color: '#f59e0b', type: 'cash' },
  { id: '4', name: 'Credit Card', balance: -450.75, color: '#ef4444', type: 'credit' },
];

export const FinanceProvider = ({ children }: { children: ReactNode }) => {
  const [expenses, setExpenses] = useState<Expense[]>(sampleExpenses);
  const [incomes, setIncomes] = useState<Income[]>(sampleIncomes);
  const [accounts, setAccounts] = useState<Account[]>(sampleAccounts);

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense = { ...expense, id: crypto.randomUUID() };
    setExpenses([...expenses, newExpense]);
  };

  const editExpense = (id: string, updatedExpense: Omit<Expense, 'id'>) => {
    setExpenses(expenses.map(expense => 
      expense.id === id ? { ...updatedExpense, id } : expense
    ));
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  // Update all expenses of a specific category to use a new category name
  const updateCategory = (oldCategory: CategoryType, newCategory: string) => {
    // This is just a mock implementation. In a real app with a database,
    // you would need to update the schema to allow the new category
    setExpenses(expenses.map(expense => 
      expense.category === oldCategory ? { ...expense, category: newCategory as CategoryType } : expense
    ));
  };

  // Delete all expenses of a specific category
  const deleteCategory = (category: CategoryType) => {
    setExpenses(expenses.filter(expense => expense.category !== category));
  };

  const addIncome = (income: Omit<Income, 'id'>) => {
    const newIncome = { ...income, id: crypto.randomUUID() };
    setIncomes([...incomes, newIncome]);
  };

  const editIncome = (id: string, updatedIncome: Omit<Income, 'id'>) => {
    setIncomes(incomes.map(income => 
      income.id === id ? { ...updatedIncome, id } : income
    ));
  };

  const deleteIncome = (id: string) => {
    setIncomes(incomes.filter(income => income.id !== id));
  };

  const addAccount = (account: Omit<Account, 'id'>) => {
    const newAccount = { ...account, id: crypto.randomUUID() };
    setAccounts([...accounts, newAccount]);
  };

  const updateAccount = (id: string, balance: number) => {
    setAccounts(accounts.map(account => 
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
    // In this mock implementation, we'll just return all possible categories
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
