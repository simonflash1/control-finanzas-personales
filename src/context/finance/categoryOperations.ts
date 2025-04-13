
import { useToast } from "@/components/ui/use-toast";
import { CategoryType, Expense } from './types';

export const useCategoryOperations = (
  user: any | null,
  expenses: Expense[],
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>
) => {
  const { toast } = useToast();

  // Update all expenses of a specific category to use a new category name
  const updateCategory = async (oldCategory: CategoryType, newCategory: string) => {
    if (!user) return;
    
    // In a real Supabase app, we would need to update the Enum type
    // This is just a mock implementation that updates the local state
    // since we can't modify Enum types from the client side
    toast({
      title: "Info",
      description: "Category updates currently only affect local state. Database enum changes require admin intervention.",
    });
    
    setExpenses(expenses.map(expense => 
      expense.category === oldCategory ? { ...expense, category: newCategory as CategoryType } : expense
    ));
  };

  // Delete all expenses of a specific category
  const deleteCategory = async (category: CategoryType) => {
    if (!user) return;
    
    // Similar to updateCategory, this is a mock implementation
    // In a real app, we would need admin intervention to modify Enum types
    toast({
      title: "Info",
      description: "Category deletions currently only affect local state. Database enum changes require admin intervention.",
    });
    
    setExpenses(expenses.filter(expense => expense.category !== category));
  };

  return {
    updateCategory,
    deleteCategory
  };
};
