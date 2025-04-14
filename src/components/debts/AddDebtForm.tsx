
import { useState } from "react";
import { useFinance } from "@/context/FinanceContext";
import { DebtType } from "@/context/finance/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { BanknoteIcon, CreditCard } from "lucide-react";

interface AddDebtFormProps {
  onClose?: () => void;
}

const AddDebtForm = ({ onClose }: AddDebtFormProps) => {
  const { toast } = useToast();
  const { addDebt } = useFinance();
  const [newDebt, setNewDebt] = useState({
    name: "",
    amount: "",
    remaining_amount: "",
    type: "loan" as DebtType,
    interest_rate: "",
    closing_date: "",
    due_date: new Date().toISOString().slice(0, 10),
    description: "",
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newDebt.name || !newDebt.amount || !newDebt.remaining_amount || !newDebt.due_date) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await addDebt({
        name: newDebt.name,
        amount: parseFloat(newDebt.amount),
        remaining_amount: parseFloat(newDebt.remaining_amount),
        type: newDebt.type,
        interest_rate: newDebt.interest_rate ? parseFloat(newDebt.interest_rate) : undefined,
        closing_date: newDebt.closing_date || undefined,
        due_date: newDebt.due_date,
        description: newDebt.description || undefined,
      });
      
      toast({
        title: "Success",
        description: "Debt added successfully",
      });
      
      if (onClose) onClose();
    } catch (error) {
      console.error("Error adding debt:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-2">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={newDebt.name}
          onChange={(e) => setNewDebt({ ...newDebt, name: e.target.value })}
          placeholder="My Loan"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="type">Type</Label>
        <Select
          value={newDebt.type}
          onValueChange={(value: DebtType) => 
            setNewDebt({ ...newDebt, type: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="loan" className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <BanknoteIcon className="h-4 w-4" />
                <span>Loan</span>
              </div>
            </SelectItem>
            <SelectItem value="credit_card" className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span>Credit Card</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Total Amount</Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            min="0"
            value={newDebt.amount}
            onChange={(e) => setNewDebt({ ...newDebt, amount: e.target.value })}
            placeholder="10000.00"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="remaining_amount">Remaining Amount</Label>
          <Input
            id="remaining_amount"
            type="number"
            step="0.01"
            min="0"
            value={newDebt.remaining_amount}
            onChange={(e) => setNewDebt({ ...newDebt, remaining_amount: e.target.value })}
            placeholder="5000.00"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="interest_rate">Interest Rate (%)</Label>
        <Input
          id="interest_rate"
          type="number"
          step="0.01"
          min="0"
          value={newDebt.interest_rate}
          onChange={(e) => setNewDebt({ ...newDebt, interest_rate: e.target.value })}
          placeholder="5.25"
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {newDebt.type === 'credit_card' && (
          <div className="space-y-2">
            <Label htmlFor="closing_date">Closing Date</Label>
            <Input
              id="closing_date"
              type="date"
              value={newDebt.closing_date}
              onChange={(e) => setNewDebt({ ...newDebt, closing_date: e.target.value })}
            />
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="due_date">Due Date</Label>
          <Input
            id="due_date"
            type="date"
            value={newDebt.due_date}
            onChange={(e) => setNewDebt({ ...newDebt, due_date: e.target.value })}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description (Optional)</Label>
        <Textarea
          id="description"
          value={newDebt.description}
          onChange={(e) => setNewDebt({ ...newDebt, description: e.target.value })}
          placeholder="Additional information about this debt"
          rows={3}
        />
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onClose} type="button">
          Cancel
        </Button>
        <Button type="submit">Add Debt</Button>
      </div>
    </form>
  );
};

export default AddDebtForm;
