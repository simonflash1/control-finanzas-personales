
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFinance } from "@/context/FinanceContext";
import { CATEGORY_ICONS, CATEGORY_COLORS } from "@/lib/constants";
import { format } from "date-fns";

const RecentTransactions = () => {
  const { expenses } = useFinance();
  
  // Take the 5 most recent expenses
  const recentExpenses = [...expenses]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Recent Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentExpenses.length > 0 ? (
            recentExpenses.map((expense) => {
              const IconComponent = CATEGORY_ICONS[expense.category];
              return (
                <div key={expense.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: CATEGORY_COLORS[expense.category] }}
                    >
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">{expense.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(expense.date), 'MMM dd, yyyy')}
                      </p>
                    </div>
                  </div>
                  <span className="font-medium text-red-500">-${expense.amount.toFixed(2)}</span>
                </div>
              );
            })
          ) : (
            <p className="text-center text-muted-foreground">No recent expenses</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
