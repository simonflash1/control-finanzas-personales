
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { useFinance } from "@/context/FinanceContext";
import { format } from "date-fns";
import { Plus, DollarSign } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Income = () => {
  const { toast } = useToast();
  const { incomes, addIncome, totalIncome } = useFinance();
  const [open, setOpen] = useState(false);
  const [newIncome, setNewIncome] = useState({
    amount: "",
    source: "",
    date: new Date().toISOString().slice(0, 10),
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIncome.amount || !newIncome.source || !newIncome.description) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    addIncome({
      amount: parseFloat(newIncome.amount),
      source: newIncome.source,
      date: newIncome.date,
      description: newIncome.description,
    });

    setNewIncome({
      amount: "",
      source: "",
      date: new Date().toISOString().slice(0, 10),
      description: "",
    });

    setOpen(false);
    
    toast({
      title: "Success",
      description: "Income added successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Income</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Income
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Add New Income</DialogTitle>
                <DialogDescription>
                  Enter the details of your income below.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount ($)</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    min="0"
                    value={newIncome.amount}
                    onChange={(e) =>
                      setNewIncome({ ...newIncome, amount: e.target.value })
                    }
                    placeholder="0.00"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="source">Source</Label>
                  <Input
                    id="source"
                    value={newIncome.source}
                    onChange={(e) =>
                      setNewIncome({ ...newIncome, source: e.target.value })
                    }
                    placeholder="e.g. Salary, Freelance, Investment"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newIncome.date}
                    onChange={(e) =>
                      setNewIncome({ ...newIncome, date: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newIncome.description}
                    onChange={(e) =>
                      setNewIncome({ ...newIncome, description: e.target.value })
                    }
                    placeholder="Enter description"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Income</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center py-6">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <DollarSign className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold">Total Income</h2>
              <div className="text-4xl font-bold text-green-600 mt-2">
                ${totalIncome.toFixed(2)}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {incomes.length > 0 ? (
              [...incomes]
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((income) => (
                  <div 
                    key={income.id} 
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">{income.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {income.source} • {format(new Date(income.date), 'MMM dd, yyyy')}
                        </p>
                      </div>
                    </div>
                    <span className="font-medium text-green-600">+${income.amount.toFixed(2)}</span>
                  </div>
                ))
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                No income entries yet. Add your first income!
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Income;
