
import { useFinance } from "@/context/FinanceContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, parseISO, differenceInDays, isBefore } from "date-fns";
import { BanknoteIcon, CreditCard, CalendarCheck, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const DebtSummary = ({ className }: { className?: string }) => {
  const { debts } = useFinance();
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  const today = new Date();
  
  // Sort debts by urgency (overdue first, then by closest due date)
  const sortedDebts = [...debts].sort((a, b) => {
    const aDate = parseISO(a.due_date);
    const bDate = parseISO(b.due_date);
    
    const aIsOverdue = isBefore(aDate, today);
    const bIsOverdue = isBefore(bDate, today);
    
    if (aIsOverdue && !bIsOverdue) return -1;
    if (!aIsOverdue && bIsOverdue) return 1;
    
    return aDate.getTime() - bDate.getTime();
  });
  
  // Show only the 5 most urgent debts
  const upcomingDebts = sortedDebts.slice(0, 5);
  
  return (
    <Card className={cn("col-span-1", className)}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Upcoming Payments</span>
          <BanknoteIcon className="h-5 w-5 text-muted-foreground" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        {upcomingDebts.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No debts found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingDebts.map((debt) => {
              const dueDate = parseISO(debt.due_date);
              const daysUntilDue = differenceInDays(dueDate, today);
              const isOverdue = daysUntilDue < 0;
              
              return (
                <div key={debt.id} className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "p-2 rounded-full",
                      isOverdue ? "bg-red-100 text-red-500" : 
                      daysUntilDue <= 7 ? "bg-amber-100 text-amber-500" : 
                      "bg-green-100 text-green-500"
                    )}>
                      {debt.type === 'loan' ? 
                        <BanknoteIcon className="h-4 w-4" /> : 
                        <CreditCard className="h-4 w-4" />
                      }
                    </div>
                    <div>
                      <p className="font-medium">{debt.name}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <CalendarCheck className="h-3 w-3 mr-1" />
                        <span>
                          {isOverdue ? (
                            <span className="text-red-500 font-medium">
                              Overdue by {Math.abs(daysUntilDue)} days
                            </span>
                          ) : (
                            <span>
                              Due in {daysUntilDue} {daysUntilDue === 1 ? 'day' : 'days'}
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(debt.remaining_amount)}</p>
                    <p className="text-xs text-muted-foreground">{format(dueDate, 'MMM d, yyyy')}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DebtSummary;
