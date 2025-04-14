
import { useFinance } from "@/context/FinanceContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hash } from "lucide-react";  // Replace PiHash with Lucide Hash icon
import { cn } from "@/lib/utils";

interface CategoryListProps {
  className?: string;  // Add optional className prop
}

const CategoryList = ({ className }: CategoryListProps) => {
  const { getCategoryExpenses, getAllCategories } = useFinance();

  const categoryExpenses = getCategoryExpenses();
  const categories = getAllCategories();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  return (
    <Card className={cn("col-span-1", className)}>
      <CardHeader>
        <CardTitle>Spending by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Hash className="h-4 w-4 text-gray-500" />
                <span>{category}</span>
              </div>
              <span>{formatCurrency(categoryExpenses[category] || 0)}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryList;

