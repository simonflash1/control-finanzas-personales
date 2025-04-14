
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Debt } from './types';

export const useDebtOperations = (
  user: any | null,
  debts: Debt[],
  setDebts: React.Dispatch<React.SetStateAction<Debt[]>>
) => {
  const { toast } = useToast();

  // Add debt to Supabase
  const addDebt = async (debt: Omit<Debt, 'id'>) => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('debts')
      .insert([
        { 
          ...debt,
          user_id: user.id 
        }
      ])
      .select();

    if (error) {
      console.error('Error adding debt:', error);
      toast({
        title: "Error",
        description: "Failed to add debt. Please try again.",
        variant: "destructive"
      });
      throw error;
    }

    setDebts(prev => [...prev, data[0]]);
  };

  // Update debt in Supabase
  const updateDebt = async (id: string, updatedDebt: Partial<Debt>) => {
    if (!user) return;
    
    const { error } = await supabase
      .from('debts')
      .update(updatedDebt)
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error updating debt:', error);
      toast({
        title: "Error",
        description: "Failed to update debt. Please try again.",
        variant: "destructive"
      });
      throw error;
    }

    setDebts(prev => prev.map(debt => 
      debt.id === id ? { ...debt, ...updatedDebt } : debt
    ));
  };

  // Delete debt from Supabase
  const deleteDebt = async (id: string) => {
    if (!user) return;
    
    const { error } = await supabase
      .from('debts')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting debt:', error);
      toast({
        title: "Error",
        description: "Failed to delete debt. Please try again.",
        variant: "destructive"
      });
      throw error;
    }

    setDebts(prev => prev.filter(debt => debt.id !== id));
  };

  return {
    addDebt,
    updateDebt,
    deleteDebt
  };
};
