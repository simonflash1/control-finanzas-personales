
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Account } from './types';

export const useAccountOperations = (
  user: any | null,
  accounts: Account[],
  setAccounts: React.Dispatch<React.SetStateAction<Account[]>>
) => {
  const { toast } = useToast();

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

  return {
    addAccount,
    updateAccount
  };
};
