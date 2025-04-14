
import React, { useState, ReactNode, useEffect } from 'react';
import { useAuth } from "@/hooks/useAuth";
import FinanceContext from './FinanceContext';
import { useExpenseOperations } from './expenseOperations';
import { useIncomeOperations } from './incomeOperations';
import { useAccountOperations } from './accountOperations';
import { useCategoryOperations } from './categoryOperations';
import { useDebtOperations } from './debtOperations';
import { useDataFetcher } from './dataFetcher';
import { Expense, Income, Account, Debt, CategoryType } from './types';

export const FinanceProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [debts, setDebts] = useState<Debt[]>([]);
  const [loading, setLoading] = useState(true);

  const { fetchData } = useDataFetcher(user, setExpenses, setIncomes, setAccounts, setDebts, setLoading);
  
  const { 
    addExpense, 
    editExpense, 
    deleteExpense, 
    getCategoryExpenseCount, 
    getAllCategories, 
    getCategoryExpenses 
  } = useExpenseOperations(user, expenses, setExpenses);
  
  const { 
    addIncome, 
    editIncome, 
    deleteIncome 
  } = useIncomeOperations(user, incomes, setIncomes);
  
  const { 
    addAccount, 
    updateAccount 
  } = useAccountOperations(user, accounts, setAccounts);
  
  const { 
    updateCategory, 
    deleteCategory 
  } = useCategoryOperations(user, expenses, setExpenses);

  const {
    addDebt,
    updateDebt,
    deleteDebt
  } = useDebtOperations(user, debts, setDebts);

  // Calculate totals
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  // Refresh data function
  const refreshData = async () => {
    await fetchData();
  };

  // Fetch data when user changes
  useEffect(() => {
    fetchData();
  }, [user]);

  return (
    <FinanceContext.Provider
      value={{
        expenses,
        incomes,
        accounts,
        debts,
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
        addDebt,
        updateDebt,
        deleteDebt,
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
