import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Trash } from 'lucide-react';
import { toast } from "sonner";
import { CirclePicker } from 'react-color';
import { supabase } from "@/integrations/supabase/client";

interface Account {
  id: string;
  name: string;
  balance: number;
  type: string;
  color: string;
  user_id: string;
  created_at: string;
}

const Accounts = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [accountName, setAccountName] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [accountType, setAccountType] = useState('bank');
  const [accountColor, setAccountColor] = useState('#3b82f6');
  const [editingAccountId, setEditingAccountId] = useState<string | null>(null);
  const [editedAccountName, setEditedAccountName] = useState('');
  const [editedAccountBalance, setEditedAccountBalance] = useState('');
  const [editedAccountType, setEditedAccountType] = useState('bank');
  const [editedAccountColor, setEditedAccountColor] = useState('#3b82f6');

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

  const accountTypes = [
    { value: 'bank', label: 'Bank Account' },
    { value: 'cash', label: 'Cash' },
    { value: 'credit', label: 'Credit Card' },
    { value: 'savings', label: 'Savings' },
    { value: 'other', label: 'Other' }
  ] as const;

  type AccountType = typeof accountTypes[number]['value'];

  const handleColorChange = (color: { hex: string }) => {
    setAccountColor(color.hex);
  };

  const handleEditColorChange = (color: { hex: string }) => {
    setEditedAccountColor(color.hex);
  };

  const handleOpenAddAccount = () => {
    setShowAddAccount(true);
  };

  const handleCloseAddAccount = () => {
    setShowAddAccount(false);
    setAccountName('');
    setAccountBalance('');
    setAccountType('bank');
    setAccountColor('#3b82f6');
  };

  const handleAddAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newAccount = {
        user_id: user!.id,
        name: accountName,
        balance: parseFloat(accountBalance),
        type: accountType as AccountType,
        color: accountColor
      };
      
      const { error } = await supabase
        .from('accounts')
        .insert([newAccount]);
        
      if (error) throw error;
      
      toast.success('Account added successfully!');
      setShowAddAccount(false);
      setAccountName('');
      setAccountBalance('');
      setAccountType('bank');
      setAccountColor('#3b82f6');
      fetchAccounts();
    } catch (error: any) {
      toast.error('Error adding account: ' + error.message);
    }
  };

  const handleEditAccount = (account: Account) => {
    setEditingAccountId(account.id);
    setEditedAccountName(account.name);
    setEditedAccountBalance(account.balance.toString());
    setEditedAccountType(account.type as AccountType);
    setEditedAccountColor(account.color);
  };

  const handleCloseEditAccount = () => {
    setEditingAccountId(null);
    setEditedAccountName('');
    setEditedAccountBalance('');
    setEditedAccountType('bank');
    setEditedAccountColor('#3b82f6');
  };

  const handleUpdateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAccountId) return;

    try {
      const updatedAccount = {
        name: editedAccountName,
        balance: parseFloat(editedAccountBalance),
        type: editedAccountType as AccountType,
        color: editedAccountColor,
      };

      const { error } = await supabase
        .from('accounts')
        .update(updatedAccount)
        .eq('id', editingAccountId);

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

      {accounts.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {accounts.map((account) => (
            <Card key={account.id} className="bg-card text-card-foreground">
              <CardHeader>
                <CardTitle>{account.name}</CardTitle>
                <CardDescription>Type: {account.type}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${account.balance.toFixed(2)}</div>
                <div className="flex items-center justify-between mt-4">
                  <Button variant="outline" size="sm" onClick={() => handleEditAccount(account)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteAccount(account.id)}>
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-muted-foreground">No accounts added yet.</div>
      )}

      {showAddAccount && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>Add Account</CardTitle>
              <CardDescription>Enter the details for the new account.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddAccount} className="space-y-4">
                <div>
                  <Label htmlFor="accountName">Account Name</Label>
                  <Input
                    type="text"
                    id="accountName"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="accountBalance">Initial Balance</Label>
                  <Input
                    type="number"
                    id="accountBalance"
                    value={accountBalance}
                    onChange={(e) => setAccountBalance(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="accountType">Account Type</Label>
                  <Select value={accountType} onValueChange={(value) => setAccountType(value as AccountType)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      {accountTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Account Color</Label>
                  <CirclePicker color={accountColor} onChange={handleColorChange} />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="secondary" onClick={handleCloseAddAccount}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Account</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {editingAccountId && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>Edit Account</CardTitle>
              <CardDescription>Update the details for the account.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateAccount} className="space-y-4">
                <div>
                  <Label htmlFor="editedAccountName">Account Name</Label>
                  <Input
                    type="text"
                    id="editedAccountName"
                    value={editedAccountName}
                    onChange={(e) => setEditedAccountName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="editedAccountBalance">Initial Balance</Label>
                  <Input
                    type="number"
                    id="editedAccountBalance"
                    value={editedAccountBalance}
                    onChange={(e) => setEditedAccountBalance(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="editedAccountType">Account Type</Label>
                  <Select value={editedAccountType} onValueChange={(value) => setEditedAccountType(value as AccountType)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      {accountTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Account Color</Label>
                  <CirclePicker color={editedAccountColor} onChange={handleEditColorChange} />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="secondary" onClick={handleCloseEditAccount}>
                    Cancel
                  </Button>
                  <Button type="submit">Update Account</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Accounts;
