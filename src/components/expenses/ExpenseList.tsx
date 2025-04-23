
import { format } from "date-fns";
import { Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CATEGORY_ICONS, CATEGORY_COLORS } from "@/lib/constants";
import { Expense } from "@/context/FinanceContext";

interface ExpenseListProps {
  expenses: Expense[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ExpenseList = ({ expenses, onEdit, onDelete }: ExpenseListProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          {expenses.length > 0 ? (
            [...expenses]
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((expense) => {
                const IconComponent = CATEGORY_ICONS[expense.category];
                return (
                  <div 
                    key={expense.id} 
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
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
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-red-500 mr-4">-${expense.amount.toFixed(2)}</span>
                      <Button variant="ghost" size="sm" onClick={() => onEdit(expense.id)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => onDelete(expense.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              No expenses yet. Add your first expense!
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseList;
