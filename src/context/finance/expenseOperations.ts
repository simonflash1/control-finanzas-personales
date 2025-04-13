
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Expense, CategoryType } from './types';

export const useExpenseOperations = (
  user: any | null, 
  expenses: Expense[], 
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>
) => {
  const { toast } = useToast();

  // Add expense to Supabase
  const addExpense = async (expense: Omit<Expense, 'id'>) => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('expenses')
      .insert([
        { 
          ...expense,
          user_id: user.id 
        }
      ])
      .select();

    if (error) {
      console.error('Error adding expense:', error);
      toast({
        title: "Error",
        description: "Failed to add expense. Please try again.",
        variant: "destructive"
      });
      throw error;
    }

    setExpenses(prev => [...prev, data[0]]);
  };

  // Edit expense in Supabase
  const editExpense = async (id: string, updatedExpense: Omit<Expense, 'id'>) => {
    if (!user) return;
    
    const { error } = await supabase
      .from('expenses')
      .update(updatedExpense)
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error editing expense:', error);
      toast({
        title: "Error",
        description: "Failed to update expense. Please try again.",
        variant: "destructive"
      });
      throw error;
    }

    setExpenses(prev => prev.map(expense => 
      expense.id === id ? { ...updatedExpense, id } : expense
    ));
  };

  // Delete expense from Supabase
  const deleteExpense = async (id: string) => {
    if (!user) return;
    
    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting expense:', error);
      toast({
        title: "Error",
        description: "Failed to delete expense. Please try again.",
        variant: "destructive"
      });
      throw error;
    }

    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  // Get the count of expenses for a specific category
  const getCategoryExpenseCount = (category: CategoryType): number => {
    return expenses.filter(expense => expense.category === category).length;
  };

  // Get a unique list of all categories used in expenses
  const getAllCategories = (): CategoryType[] => {
    // In this implementation, we just return all possible categories
    return ['food', 'transport', 'home', 'health', 'shopping', 'entertainment', 'other'];
  };

  // Get category expenses
  const getCategoryExpenses = (): Record<CategoryType, number> => {
    const categoryTotals = {
      food: 0,
      transport: 0,
      home: 0,
      health: 0,
      shopping: 0,
      entertainment: 0,
      other: 0,
    };

    expenses.forEach(expense => {
      categoryTotals[expense.category] += expense.amount;
    });

    return categoryTotals;
  };

  return {
    addExpense,
    editExpense,
    deleteExpense,
    getCategoryExpenseCount,
    getAllCategories,
    getCategoryExpenses
  };
};
