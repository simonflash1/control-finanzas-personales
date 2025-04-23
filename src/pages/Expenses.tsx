
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFinance } from "@/context/FinanceContext";
import { Settings } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import EditExpenseForm from "@/components/expenses/EditExpenseForm";
import ManageCategoriesDialog from "@/components/expenses/ManageCategoriesDialog";
import { AddExpenseDialog } from "@/components/expenses/AddExpenseDialog";
import ExpenseList from "@/components/expenses/ExpenseList";
import CategorySummary from "@/components/expenses/CategorySummary";
import { useCategories } from "@/hooks/useCategories";

const Expenses = () => {
  const { toast } = useToast();
  const { expenses, editExpense, deleteExpense } = useFinance();
  const { handleUpdateCategory, handleDeleteCategory, getCategorySummaries, getAllCategories } = useCategories();
  
  const [manageCategoriesOpen, setManageCategoriesOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<string | null>(null);

  const handleEditSubmit = (id: string, updatedExpense: any) => {
    editExpense(id, updatedExpense);
    setEditingExpense(null);
    toast({
      title: "Success",
      description: "Expense updated successfully",
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      deleteExpense(id);
      toast({
        title: "Success",
        description: "Expense deleted successfully",
      });
    }
  };

  const categoryItems = getCategorySummaries();
  const allCategories = getAllCategories();

  const expenseBeingEdited = editingExpense 
    ? expenses.find(e => e.id === editingExpense) 
    : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setManageCategoriesOpen(true)}>
            <Settings className="mr-2 h-4 w-4" />
            Manage Categories
          </Button>
          <AddExpenseDialog />
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Expenses</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <ExpenseList 
            expenses={expenses}
            onEdit={(id) => setEditingExpense(id)}
            onDelete={handleDelete}
          />
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categoryItems.map((item) => (
              <CategorySummary
                key={item.category}
                category={item.category}
                amount={item.amount}
                transactionCount={item.transactionCount}
                onUpdate={handleUpdateCategory}
                onDelete={handleDeleteCategory}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {editingExpense && expenseBeingEdited && (
        <EditExpenseForm
          expense={expenseBeingEdited}
          onClose={() => setEditingExpense(null)}
          onSubmit={handleEditSubmit}
        />
      )}

      <ManageCategoriesDialog
        open={manageCategoriesOpen}
        onOpenChange={setManageCategoriesOpen}
        categories={allCategories}
        onUpdateCategory={handleUpdateCategory}
        onDeleteCategory={handleDeleteCategory}
        getCategoryExpenseCount={getCategorySummaries}
      />
    </div>
  );
};

export default Expenses;
