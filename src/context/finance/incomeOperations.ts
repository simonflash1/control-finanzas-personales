
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Income } from './types';

export const useIncomeOperations = (
  user: any | null,
  incomes: Income[],
  setIncomes: React.Dispatch<React.SetStateAction<Income[]>>
) => {
  const { toast } = useToast();

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

  return {
    addIncome,
    editIncome,
    deleteIncome
  };
};
