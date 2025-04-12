
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { useFinance, CategoryType } from "@/context/FinanceContext";
import { CATEGORY_ICONS, CATEGORY_COLORS } from "@/lib/constants";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Expenses = () => {
  const { toast } = useToast();
  const { expenses, addExpense, getCategoryExpenses } = useFinance();
  const [open, setOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({
    amount: "",
    category: "food" as CategoryType,
    date: new Date().toISOString().slice(0, 10),
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpense.amount || !newExpense.description) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    addExpense({
      amount: parseFloat(newExpense.amount),
      category: newExpense.category,
      date: newExpense.date,
      description: newExpense.description,
    });

    setNewExpense({
      amount: "",
      category: "food",
      date: new Date().toISOString().slice(0, 10),
      description: "",
    });

    setOpen(false);
    
    toast({
      title: "Success",
      description: "Expense added successfully",
    });
  };

  const categoryExpenses = getCategoryExpenses();
  const categoryItems = Object.entries(categoryExpenses)
    .map(([category, amount]) => ({
      category: category as CategoryType,
      amount,
    }))
    .sort((a, b) => a.category.localeCompare(b.category));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Expense
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
                <DialogDescription>
                  Enter the details of your expense below.
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
                    value={newExpense.amount}
                    onChange={(e) =>
                      setNewExpense({ ...newExpense, amount: e.target.value })
                    }
                    placeholder="0.00"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newExpense.category}
                    onValueChange={(value: CategoryType) =>
                      setNewExpense({ ...newExpense, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="transport">Transport</SelectItem>
                      <SelectItem value="home">Home</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                      <SelectItem value="shopping">Shopping</SelectItem>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newExpense.date}
                    onChange={(e) =>
                      setNewExpense({ ...newExpense, date: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newExpense.description}
                    onChange={(e) =>
                      setNewExpense({ ...newExpense, description: e.target.value })
                    }
                    placeholder="Enter description"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Expense</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Expenses</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {expenses.length > 0 ? (
                  [...expenses]
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((expense) => {
                      const IconComponent = CATEGORY_ICONS[expense.category];
                      return (
                        <div 
                          key={expense.id} 
                          className="flex items-center justify-between p-3 rounded-lg border"
                        >
                          <div className="flex items-center space-x-3">
                            <div 
                              className="w-10 h-10 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: CATEGORY_COLORS[expense.category] }}
                            >
                              <IconComponent className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="font-medium">{expense.description}</p>
                              <p className="text-xs text-muted-foreground">
                                {format(new Date(expense.date), 'MMM dd, yyyy')}
                              </p>
                            </div>
                          </div>
                          <span className="font-medium text-red-500">-${expense.amount.toFixed(2)}</span>
                        </div>
                      );
                    })
                ) : (
                  <div className="text-center py-10 text-muted-foreground">
                    No expenses yet. Add your first expense!
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categoryItems.map((item) => {
              const IconComponent = CATEGORY_ICONS[item.category];
              return (
                <Card key={item.category}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: CATEGORY_COLORS[item.category] }}
                      >
                        <IconComponent className="h-4 w-4 text-white" />
                      </div>
                      <CardTitle className="text-lg capitalize">{item.category}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${item.amount.toFixed(2)}</div>
                    <p className="text-xs text-muted-foreground">
                      {expenses.filter(e => e.category === item.category).length} transactions
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Expenses;
