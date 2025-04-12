
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import AccountList from "@/components/accounts/AccountList";
import AddAccountForm from "@/components/accounts/AddAccountForm";
import EditAccountForm from "@/components/accounts/EditAccountForm";
import { Account, NewAccountData, UpdateAccountData } from "@/components/accounts/accountTypes";

const Accounts = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    } else {
      fetchAccounts();
    }
  }, [user, navigate]);

  const fetchAccounts = async () => {
    try {
      const { data, error } = await supabase
        .from('accounts')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAccounts(data || []);
    } catch (error: any) {
      toast.error('Error fetching accounts: ' + error.message);
    }
  };

  const handleOpenAddAccount = () => {
    setShowAddAccount(true);
  };

  const handleCloseAddAccount = () => {
    setShowAddAccount(false);
  };

  const handleAddAccount = async (accountData: NewAccountData) => {
    try {
      // Note the change here - now we pass a single object instead of an array
      const { error } = await supabase
        .from('accounts')
        .insert(accountData);
        
      if (error) throw error;
      
      toast.success('Account added successfully!');
      setShowAddAccount(false);
      fetchAccounts();
    } catch (error: any) {
      toast.error('Error adding account: ' + error.message);
    }
  };

  const handleEditAccount = (account: Account) => {
    setEditingAccount(account);
  };

  const handleCloseEditAccount = () => {
    setEditingAccount(null);
  };

  const handleUpdateAccount = async (id: string, accountData: UpdateAccountData) => {
    try {
      const { error } = await supabase
        .from('accounts')
        .update(accountData)
        .eq('id', id);

      if (error) throw error;

      toast.success('Account updated successfully!');
      handleCloseEditAccount();
      fetchAccounts();
    } catch (error: any) {
      toast.error('Error updating account: ' + error.message);
    }
  };

  const handleDeleteAccount = async (id: string) => {
    try {
      const { error } = await supabase
        .from('accounts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Account deleted successfully!');
      fetchAccounts();
    } catch (error: any) {
      toast.error('Error deleting account: ' + error.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Accounts</h2>
        <Button onClick={handleOpenAddAccount}>
          <Plus className="mr-2 h-4 w-4" />
          Add Account
        </Button>
      </div>

      <AccountList 
        accounts={accounts} 
        onEdit={handleEditAccount} 
        onDelete={handleDeleteAccount} 
      />
      
      {showAddAccount && (
        <AddAccountForm 
          onClose={handleCloseAddAccount}
          onSubmit={handleAddAccount}
          userId={user!.id}
        />
      )}

      {editingAccount && (
        <EditAccountForm
          account={editingAccount}
          onClose={handleCloseEditAccount}
          onSubmit={handleUpdateAccount}
        />
      )}
    </div>
  );
};

export default Accounts;
