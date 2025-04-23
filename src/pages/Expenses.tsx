
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFinance, CategoryType } from "@/context/FinanceContext";
import { Settings } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import EditExpenseForm from "@/components/expenses/EditExpenseForm";
import ManageCategoriesDialog from "@/components/expenses/ManageCategoriesDialog";
import { AddExpenseDialog } from "@/components/expenses/AddExpenseDialog";
import ExpenseList from "@/components/expenses/ExpenseList";
import CategorySummary from "@/components/expenses/CategorySummary";

const Expenses = () => {
  const { toast } = useToast();
  const { 
    expenses, 
    editExpense, 
    deleteExpense, 
    getCategoryExpenses,
    getAllCategories,
    updateCategory,
    deleteCategory,
    getCategoryExpenseCount
  } = useFinance();
  
  const [manageCategoriesOpen, setManageCategoriesOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<string | null>(null);

  const handleEditSubmit = (id: string, updatedExpense: {
    amount: number;
    category: CategoryType;
    date: string;
    description: string;
  }) => {
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

  const handleUpdateCategory = (oldCategory: CategoryType, newCategory: string) => {
    if (getCategoryExpenseCount(oldCategory) > 0) {
      toast({
        title: "Error",
        description: "Cannot modify a category with existing expenses",
        variant: "destructive",
      });
      return;
    }
    
    updateCategory(oldCategory, newCategory);
    toast({
      title: "Success",
      description: `Category ${oldCategory} has been updated to ${newCategory}`,
    });
  };

  const handleDeleteCategory = (category: CategoryType) => {
    if (getCategoryExpenseCount(category) > 0) {
      toast({
        title: "Error",
        description: "Cannot delete a category with existing expenses",
        variant: "destructive",
      });
      return;
    }
    
    if (window.confirm(`Are you sure you want to delete the ${category} category?`)) {
      deleteCategory(category);
      toast({
        title: "Success",
        description: `Category ${category} has been deleted`,
      });
    }
  };

  const categoryExpenses = getCategoryExpenses();
  const categoryItems = Object.entries(categoryExpenses)
    .map(([category, amount]) => ({
      category: category as CategoryType,
      amount,
    }))
    .sort((a, b) => a.category.localeCompare(b.category));

  const expenseBeingEdited = editingExpense 
    ? expenses.find(e => e.id === editingExpense) 
    : null;

  const allCategories = getAllCategories();

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
                transactionCount={getCategoryExpenseCount(item.category)}
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
        getCategoryExpenseCount={getCategoryExpenseCount}
      />
    </div>
  );
};

export default Expenses;
