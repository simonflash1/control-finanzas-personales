
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface EditIncomeFormProps {
  income: {
    id: string;
    amount: number;
    source: string;
    date: string;
    description: string;
  };
  onClose: () => void;
  onSubmit: (id: string, updatedIncome: {
    amount: number;
    source: string;
    date: string;
    description: string;
  }) => void;
}

const EditIncomeForm = ({ income, onClose, onSubmit }: EditIncomeFormProps) => {
  const { toast } = useToast();
  const [amount, setAmount] = useState(income.amount.toString());
  const [source, setSource] = useState(income.source);
  const [date, setDate] = useState(income.date.slice(0, 10)); // Format date to YYYY-MM-DD
  const [description, setDescription] = useState(income.description);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit(income.id, {
        amount: parseFloat(amount),
        source,
        date,
        description,
      });
      toast({
        title: "Success",
        description: "Income updated successfully",
      });
    } catch (error) {
      console.error("Error updating income:", error);
      toast({
        title: "Error",
        description: "Failed to update income. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle>Edit Income</CardTitle>
          <CardDescription>Update the details for this income entry.</CardDescription>
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
              <Label htmlFor="source">Source</Label>
              <Input
                id="source"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="e.g. Salary, Freelance, Investment"
                required
              />
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
              <Button type="button" variant="secondary" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Income"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditIncomeForm;
