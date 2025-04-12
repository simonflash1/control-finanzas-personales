
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFinance } from "@/context/FinanceContext";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ACCOUNT_COLORS = [
  { name: "Blue", value: "#3b82f6" },
  { name: "Green", value: "#10b981" },
  { name: "Yellow", value: "#f59e0b" },
  { name: "Red", value: "#ef4444" },
  { name: "Purple", value: "#8b5cf6" },
  { name: "Pink", value: "#ec4899" },
  { name: "Indigo", value: "#6366f1" },
];

const Accounts = () => {
  const { toast } = useToast();
  const { accounts, addAccount, totalBalance } = useFinance();
  const [open, setOpen] = useState(false);
  const [newAccount, setNewAccount] = useState({
    name: "",
    balance: "",
    color: ACCOUNT_COLORS[0].value,
    type: "bank" as const,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAccount.name || !newAccount.balance) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    addAccount({
      name: newAccount.name,
      balance: parseFloat(newAccount.balance),
      color: newAccount.color,
      type: newAccount.type,
    });

    setNewAccount({
      name: "",
      balance: "",
      color: ACCOUNT_COLORS[0].value,
      type: "bank",
    });

    setOpen(false);
    
    toast({
      title: "Success",
      description: "Account added successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Accounts</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Account
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Add New Account</DialogTitle>
                <DialogDescription>
                  Enter the details of your account below.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Account Name</Label>
                  <Input
                    id="name"
                    value={newAccount.name}
                    onChange={(e) =>
                      setNewAccount({ ...newAccount, name: e.target.value })
                    }
                    placeholder="e.g. Main Bank Account"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="balance">Initial Balance ($)</Label>
                  <Input
                    id="balance"
                    type="number"
                    step="0.01"
                    value={newAccount.balance}
                    onChange={(e) =>
                      setNewAccount({ ...newAccount, balance: e.target.value })
                    }
                    placeholder="0.00"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Account Type</Label>
                  <Select
                    value={newAccount.type}
                    onValueChange={(value: "bank" | "cash" | "credit" | "savings" | "other") =>
                      setNewAccount({ ...newAccount, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank">Bank</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="credit">Credit Card</SelectItem>
                      <SelectItem value="savings">Savings</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Color</Label>
                  <div className="flex flex-wrap gap-2">
                    {ACCOUNT_COLORS.map((color) => (
                      <div
                        key={color.value}
                        className={`w-8 h-8 rounded-full cursor-pointer ${
                          newAccount.color === color.value ? 'ring-2 ring-primary ring-offset-2' : ''
                        }`}
                        style={{ backgroundColor: color.value }}
                        onClick={() => setNewAccount({ ...newAccount, color: color.value })}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Account</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center py-6">
              <h2 className="text-2xl font-bold">Total Balance</h2>
              <div 
                className={`text-4xl font-bold mt-2 ${
                  totalBalance < 0 ? 'text-red-500' : 'text-primary'
                }`}
              >
                ${totalBalance.toFixed(2)}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account) => (
          <Card key={account.id}>
            <CardHeader 
              className="pb-2" 
              style={{ borderBottom: `3px solid ${account.color}` }}
            >
              <CardTitle className="text-lg">{account.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground capitalize">{account.type}</span>
                <span 
                  className={`text-2xl font-bold ${
                    account.balance < 0 ? 'text-red-500' : account.type === 'savings' ? 'text-green-600' : ''
                  }`}
                >
                  ${account.balance.toFixed(2)}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Accounts;
