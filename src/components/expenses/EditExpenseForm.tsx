
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CategoryType } from "@/context/FinanceContext";

interface EditExpenseFormProps {
  expense: {
    id: string;
    amount: number;
    category: CategoryType;
    date: string;
    description: string;
  };
  onClose: () => void;
  onSubmit: (id: string, updatedExpense: {
    amount: number;
    category: CategoryType;
    date: string;
    description: string;
  }) => void;
}

const EditExpenseForm = ({ expense, onClose, onSubmit }: EditExpenseFormProps) => {
  const [amount, setAmount] = useState(expense.amount.toString());
  const [category, setCategory] = useState<CategoryType>(expense.category);
  const [date, setDate] = useState(expense.date.slice(0, 10)); // Format date to YYYY-MM-DD
  const [description, setDescription] = useState(expense.description);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(expense.id, {
      amount: parseFloat(amount),
      category,
      date,
      description,
    });
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle>Edit Expense</CardTitle>
          <CardDescription>Update the details for this expense.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={category}
                onValueChange={(value: CategoryType) => setCategory(value)}
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
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Update Expense</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditExpenseForm;
