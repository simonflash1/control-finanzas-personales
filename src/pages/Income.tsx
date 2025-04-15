
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useFinance } from "@/context/FinanceContext";
import EditIncomeForm from "@/components/income/EditIncomeForm";
import TotalIncomeCard from "@/components/income/TotalIncomeCard";
import IncomeList from "@/components/income/IncomeList";
import AddIncomeForm from "@/components/income/AddIncomeForm";

const Income = () => {
  const { toast } = useToast();
  const { incomes, addIncome, editIncome, deleteIncome, totalIncome, loading, refreshData } = useFinance();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [editingIncomeId, setEditingIncomeId] = useState<string | null>(null);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshData();
      toast({
        title: "Success",
        description: "Income data refreshed",
      });
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleEdit = (id: string) => {
    setEditingIncomeId(id);
  };

  const handleEditSubmit = async (id: string, updatedIncome: {
    amount: number;
    source: string;
    date: string;
    description: string;
  }) => {
    try {
      await editIncome(id, updatedIncome);
      setEditingIncomeId(null);
    } catch (error) {
      console.error("Error updating income:", error);
      // Error toast is already shown in the context
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this income entry?")) {
      try {
        await deleteIncome(id);
        toast({
          title: "Success",
          description: "Income deleted successfully",
        });
      } catch (error) {
        console.error("Error deleting income:", error);
        // Error toast is already shown in the context
      }
    }
  };

  // Find the current income being edited
  const incomeBeingEdited = editingIncomeId 
    ? incomes.find(inc => inc.id === editingIncomeId) 
    : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Income</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <AddIncomeForm onAddIncome={addIncome} />
        </div>
      </div>

      <div className="mb-6">
        <TotalIncomeCard totalIncome={totalIncome} loading={loading} />
      </div>

      <Card>
        <CardContent className="p-6">
          <IncomeList 
            incomes={incomes} 
            loading={loading} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        </CardContent>
      </Card>

      {/* Edit Income Modal */}
      {editingIncomeId && incomeBeingEdited && (
        <EditIncomeForm
          income={incomeBeingEdited}
          onClose={() => setEditingIncomeId(null)}
          onSubmit={handleEditSubmit}
        />
      )}
    </div>
  );
};

export default Income;
