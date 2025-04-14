
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Expense, Income, Account, Debt } from './types';

export const useDataFetcher = (
  user: any | null,
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>,
  setIncomes: React.Dispatch<React.SetStateAction<Income[]>>,
  setAccounts: React.Dispatch<React.SetStateAction<Account[]>>,
  setDebts: React.Dispatch<React.SetStateAction<Debt[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { toast } = useToast();

  // Function to fetch all data from Supabase
  const fetchData = async () => {
    if (!user) {
      setExpenses([]);
      setIncomes([]);
      setAccounts([]);
      setDebts([]);
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

      // Fetch debts
      const { data: debtsData, error: debtsError } = await supabase
        .from('debts')
        .select('*')
        .order('due_date', { ascending: true });

      if (debtsError) {
        throw debtsError;
      }

      setExpenses(expensesData || []);
      setIncomes(incomesData || []);
      setAccounts(accountsData || []);
      setDebts(debtsData || []);
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

  return { fetchData };
};
