
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CATEGORY_ICONS, CATEGORY_COLORS } from "@/lib/constants";
import { CategoryType } from "@/context/FinanceContext";
import { Pencil, Trash } from "lucide-react";

interface CategorySummaryProps {
  category: CategoryType;
  amount: number;
  transactionCount: number;
  onUpdate: (category: CategoryType, newName: string) => void;
  onDelete: (category: CategoryType) => void;
}

const CategorySummary = ({
  category,
  amount,
  transactionCount,
  onUpdate,
  onDelete,
}: CategorySummaryProps) => {
  const IconComponent = CATEGORY_ICONS[category];

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: CATEGORY_COLORS[category] }}
            >
              <IconComponent className="h-4 w-4 text-white" />
            </div>
            <CardTitle className="text-lg capitalize">{category}</CardTitle>
          </div>
          <div className="flex items-center space-x-1">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onUpdate(category, prompt("Enter new name", category) || category)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onDelete(category)}>
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${amount.toFixed(2)}</div>
        <p className="text-xs text-muted-foreground">
          {transactionCount} transactions
        </p>
      </CardContent>
    </Card>
  );
};

export default CategorySummary;
