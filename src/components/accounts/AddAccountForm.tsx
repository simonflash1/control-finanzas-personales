
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

  const [errors, setErrors] = useState<{ name?: string; balance?: string }>({});

  const handleColorChange = (color: ColorResult) => {
    setAccountColor(color.hex);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};

    if (!accountName.trim()) {
      newErrors.name = "El nombre de la cuenta es obligatorio.";
    } else if (accountName.length < 3) {
      newErrors.name = "El nombre debe tener al menos 3 caracteres.";
    }

    const balanceNumber = parseFloat(accountBalance);
    if (isNaN(balanceNumber)) {
      newErrors.balance = "El saldo debe ser un número.";
    } else if (balanceNumber < 0) {
      newErrors.balance = "El saldo no puede ser negativo.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit({
        user_id: userId,
        name: accountName.trim(),
        balance: balanceNumber,
        type: accountType,
        color: accountColor,
      });

      // Limpiar formulario si querés
      setAccountName('');
      setAccountBalance('');
      setErrors({});
    }
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
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div>
              <Label htmlFor="accountBalance">Initial Balance</Label>
              <Input
                type="number"
                id="accountBalance"
                value={accountBalance}
                onChange={(e) => setAccountBalance(e.target.value)}
              />
              {errors.balance && <p className="text-red-500 text-sm mt-1">{errors.balance}</p>}
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
