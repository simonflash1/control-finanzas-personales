
import { useFinance, CategoryType } from "@/context/FinanceContext";
import { useToast } from "@/components/ui/use-toast";

export const useCategories = () => {
  const { toast } = useToast();
  const { 
    updateCategory, 
    deleteCategory, 
    getCategoryExpenseCount,
    getAllCategories,
    getCategoryExpenses 
  } = useFinance();

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

  const getCategorySummaries = () => {
    const categoryExpenses = getCategoryExpenses();
    return Object.entries(categoryExpenses)
      .map(([category, amount]) => ({
        category: category as CategoryType,
        amount,
        transactionCount: getCategoryExpenseCount(category as CategoryType),
      }))
      .sort((a, b) => a.category.localeCompare(b.category));
  };

  return {
    handleUpdateCategory,
    handleDeleteCategory,
    getCategorySummaries,
    getAllCategories,
  };
};
