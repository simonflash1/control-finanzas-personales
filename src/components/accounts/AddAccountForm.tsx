
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CirclePicker, ColorResult } from 'react-color';
import { accountTypes, AccountType, NewAccountData } from "./accountTypes";

interface AddAccountFormProps {
  onClose: () => void;
  onSubmit: (account: NewAccountData) => void;
  userId: string;
}

const AddAccountForm = ({ onClose, onSubmit, userId }: AddAccountFormProps) => {
  const [accountName, setAccountName] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [accountType, setAccountType] = useState<AccountType>('bank');
  const [accountColor, setAccountColor] = useState('#3b82f6');

  const handleColorChange = (color: ColorResult) => {
    setAccountColor(color.hex);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      user_id: userId,
      name: accountName,
      balance: parseFloat(accountBalance),
      type: accountType,
      color: accountColor
    });
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle>Add Account</CardTitle>
          <CardDescription>Enter the details for the new account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Add Account</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddAccountForm;
