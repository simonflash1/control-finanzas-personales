
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CATEGORY_ICONS, CATEGORY_COLORS } from "@/lib/constants";
import { useFinance, CategoryType } from "@/context/FinanceContext";

const CategoryList = () => {
  const { getCategoryExpenses, totalExpenses } = useFinance();
  const categoryExpenses = getCategoryExpenses();

  // Only show categories with expenses
  const categories = Object.entries(categoryExpenses)
    .filter(([_, amount]) => amount > 0)
    .sort(([_, a], [__, b]) => b - a) // Sort by amount (descending)
    .map(([category, amount]) => ({
      category: category as CategoryType,
      amount,
      percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0,
    }));

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Top Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categories.map((item) => {
            const IconComponent = CATEGORY_ICONS[item.category];
            return (
              <div key={item.category} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center mr-2"
                      style={{ backgroundColor: CATEGORY_COLORS[item.category] }}
                    >
                      <IconComponent className="h-4 w-4 text-white" />
                    </div>
                    <span className="capitalize">{item.category}</span>
                  </div>
                  <span className="font-medium">${item.amount.toFixed(2)}</span>
                </div>
                <div className="expense-bar">
                  <div 
                    className="progress-indicator" 
                    style={{ 
                      width: `${item.percentage}%`, 
                      backgroundColor: CATEGORY_COLORS[item.category]
                    }} 
                  />
                </div>
                <div className="text-xs text-right text-muted-foreground">
                  {item.percentage.toFixed(0)}%
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryList;
