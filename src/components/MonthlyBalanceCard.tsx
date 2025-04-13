
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFinance } from "@/context/FinanceContext";
import { startOfMonth, endOfMonth, format } from "date-fns";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

const MonthlyBalanceCard = () => {
  const { expenses, incomes } = useFinance();
  
  // Get current month date range
  const currentMonthStart = startOfMonth(new Date());
  const currentMonthEnd = endOfMonth(new Date());
  
  // Filter expenses and incomes for the current month
  const monthlyExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= currentMonthStart && expenseDate <= currentMonthEnd;
  });
  
  const monthlyIncomes = incomes.filter(income => {
    const incomeDate = new Date(income.date);
    return incomeDate >= currentMonthStart && incomeDate <= currentMonthEnd;
  });
  
  // Calculate monthly totals
  const totalMonthlyExpenses = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalMonthlyIncome = monthlyIncomes.reduce((sum, income) => sum + income.amount, 0);
  const monthlyBalance = totalMonthlyIncome - totalMonthlyExpenses;
  
  // Format month label (e.g., "April 2025")
  const monthLabel = format(new Date(), 'MMMM yyyy');
  
  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Monthly Balance ({monthLabel})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className={`text-3xl font-bold ${monthlyBalance >= 0 ? 'text-green-600' : 'text-red-500'}`}>
            {monthlyBalance >= 0 ? '+' : ''}{monthlyBalance.toFixed(2)}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1">
              <span className="text-xs text-muted-foreground">Monthly Income</span>
              <div className="flex items-center text-sm font-medium text-green-600">
                <ArrowUpIcon className="mr-1 h-4 w-4" />
                +${totalMonthlyIncome.toFixed(2)}
              </div>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-xs text-muted-foreground">Monthly Expenses</span>
              <div className="flex items-center text-sm font-medium text-red-500">
                <ArrowDownIcon className="mr-1 h-4 w-4" />
                -${totalMonthlyExpenses.toFixed(2)}
              </div>
            </div>
          </div>
          
          {monthlyBalance < 0 && (
            <div className="mt-2 p-2 bg-red-50 dark:bg-red-950/30 rounded-md text-xs text-red-600 dark:text-red-400">
              <p>Warning: You're spending more than your income this month. Consider reducing expenses or increasing income.</p>
            </div>
          )}
          
          {monthlyBalance >= 0 && monthlyBalance < totalMonthlyIncome * 0.1 && (
            <div className="mt-2 p-2 bg-amber-50 dark:bg-amber-950/30 rounded-md text-xs text-amber-600 dark:text-amber-400">
              <p>Notice: Your savings this month are less than 10% of your income.</p>
            </div>
          )}
          
          {monthlyBalance >= totalMonthlyIncome * 0.2 && (
            <div className="mt-2 p-2 bg-green-50 dark:bg-green-950/30 rounded-md text-xs text-green-600 dark:text-green-400">
              <p>Great job! You're saving more than 20% of your income this month.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyBalanceCard;
