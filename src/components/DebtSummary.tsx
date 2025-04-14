
import { useFinance } from "@/context/FinanceContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BanknoteIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { DebtItem } from "./debt/DebtItem";
import { EmptyDebtList } from "./debt/EmptyDebtList";
import { sortDebtsByUrgency } from "./debt/DebtUtils";

export interface DebtSummaryProps {
  className?: string;
}

const DebtSummary = ({ className }: DebtSummaryProps) => {
  const { debts } = useFinance();
  const today = new Date();
  
  // Sort and limit to 5 most urgent debts
  const upcomingDebts = sortDebtsByUrgency(debts).slice(0, 5);
  
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
          <EmptyDebtList />
        ) : (
          <div className="space-y-4">
            {upcomingDebts.map((debt) => (
              <DebtItem 
                key={debt.id} 
                debt={debt} 
                today={today} 
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DebtSummary;
