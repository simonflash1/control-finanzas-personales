
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type CategoryType = 'food' | 'transport' | 'home' | 'health' | 'shopping' | 'entertainment' | 'other';

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
  type: 'bank' | 'cash' | 'credit' | 'savings' | 'other';
}

interface FinanceContextType {
  expenses: Expense[];
  incomes: Income[];
  accounts: Account[];
  totalBalance: number;
  totalExpenses: number;
  totalIncome: number;
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  addIncome: (income: Omit<Income, 'id'>) => void;
  addAccount: (account: Omit<Account, 'id'>) => void;
  updateAccount: (id: string, balance: number) => void;
  getCategoryExpenses: () => Record<CategoryType, number>;
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

  const addIncome = (income: Omit<Income, 'id'>) => {
    const newIncome = { ...income, id: crypto.randomUUID() };
    setIncomes([...incomes, newIncome]);
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
        addIncome,
        addAccount,
        updateAccount,
        getCategoryExpenses,
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
