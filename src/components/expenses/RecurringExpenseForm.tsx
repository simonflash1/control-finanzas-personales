
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useFinance, CategoryType, ExpenseFrequency } from "@/context/FinanceContext";
import { useToast } from "@/components/ui/use-toast";
import { add, format } from "date-fns";

interface RecurringExpenseFormProps {
  onClose: () => void;
}

const RecurringExpenseForm = ({ onClose }: RecurringExpenseFormProps) => {
  const { toast } = useToast();
  const { addExpense } = useFinance();
  const [expense, setExpense] = useState({
    amount: "",
    base_amount: "",
    category: "food" as CategoryType,
    date: new Date().toISOString().slice(0, 10),
    description: "",
    is_recurring: true,
    frequency: "monthly" as ExpenseFrequency,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!expense.amount || !expense.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(expense.amount);
    const baseAmount = expense.frequency === "variable_monthly" 
      ? parseFloat(expense.base_amount || expense.amount) 
      : amount;

    const nextDueDate = add(new Date(expense.date), { months: 1 });

    try {
      await addExpense({
        amount,
        base_amount: baseAmount,
        category: expense.category,
        date: expense.date,
        description: expense.description,
        is_recurring: true,
        frequency: expense.frequency,
        next_due_date: nextDueDate.toISOString().slice(0, 10),
      });

      toast({
        title: "Success",
        description: "Recurring expense added successfully",
      });
      onClose();
    } catch (error) {
      console.error("Error adding recurring expense:", error);
      toast({
        title: "Error",
        description: "Failed to add recurring expense",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-2">
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={expense.description}
          onChange={(e) => setExpense({ ...expense, description: e.target.value })}
          placeholder="Monthly rent, Electricity bill, etc."
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="frequency">Frequency</Label>
        <Select
          value={expense.frequency}
          onValueChange={(value: ExpenseFrequency) => 
            setExpense({ ...expense, frequency: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Fixed Monthly</SelectItem>
            <SelectItem value="variable_monthly">Variable Monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            min="0"
            value={expense.amount}
            onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
            placeholder="0.00"
            required
          />
        </div>

        {expense.frequency === "variable_monthly" && (
          <div className="space-y-2">
            <Label htmlFor="base_amount">Expected Amount</Label>
            <Input
              id="base_amount"
              type="number"
              step="0.01"
              min="0"
              value={expense.base_amount}
              onChange={(e) => setExpense({ ...expense, base_amount: e.target.value })}
              placeholder="Average monthly amount"
            />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
          value={expense.category}
          onValueChange={(value: CategoryType) => 
            setExpense({ ...expense, category: value })
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
        <Label htmlFor="date">First Payment Date</Label>
        <Input
          id="date"
          type="date"
          value={expense.date}
          onChange={(e) => setExpense({ ...expense, date: e.target.value })}
          required
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onClose} type="button">
          Cancel
        </Button>
        <Button type="submit">Add Recurring Expense</Button>
      </div>
    </form>
  );
};

export default RecurringExpenseForm;
