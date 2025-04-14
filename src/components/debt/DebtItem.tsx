
import { Debt } from "@/context/finance/types";
import { BanknoteIcon, CreditCard, CalendarCheck } from "lucide-react";
import { format, parseISO, differenceInDays } from "date-fns";
import { cn } from "@/lib/utils";

interface DebtItemProps {
  debt: Debt;
  today: Date;
}

export const DebtItem = ({ debt, today }: DebtItemProps) => {
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
};

// Utility function for formatting currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};
