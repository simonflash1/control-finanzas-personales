
import { useFinance } from "@/context/FinanceContext";
import { Calendar, BanknoteIcon, CreditCard, CalendarCheck, AlertCircle } from "lucide-react";
import { format, parseISO, isAfter, addDays, isBefore } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const DebtList = () => {
  const { debts, loading, deleteDebt } = useFinance();

  const getDebtStatusColor = (dueDate: string, closingDate?: string) => {
    const today = new Date();
    const dueDateObj = parseISO(dueDate);
    
    // Due in the next 7 days
    if (isAfter(dueDateObj, today) && isBefore(dueDateObj, addDays(today, 7))) {
      return "bg-amber-500 hover:bg-amber-600";
    }
    
    // Overdue
    if (isBefore(dueDateObj, today)) {
      return "bg-red-500 hover:bg-red-600";
    }
    
    // Credit card approaching closing date
    if (closingDate) {
      const closingDateObj = parseISO(closingDate);
      if (isAfter(closingDateObj, today) && isBefore(closingDateObj, addDays(today, 7))) {
        return "bg-blue-500 hover:bg-blue-600";
      }
    }
    
    // Default - no urgent status
    return "bg-green-500 hover:bg-green-600";
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (loading) {
    return <div className="text-center py-4">Loading debts...</div>;
  }

  if (debts.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="flex justify-center mb-4">
          <BanknoteIcon className="h-16 w-16 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">No debts found</h3>
        <p className="text-muted-foreground mt-1">
          Add your loans and credit cards to track them
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {debts.map((debt) => (
        <Card key={debt.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {debt.type === 'loan' ? <BanknoteIcon className="h-5 w-5" /> : <CreditCard className="h-5 w-5" />}
                  {debt.name}
                </CardTitle>
                <CardDescription>
                  {debt.type === 'loan' ? 'Loan' : 'Credit Card'}
                  {debt.interest_rate && ` • ${debt.interest_rate}% interest`}
                </CardDescription>
              </div>
              <Badge variant={debt.type === 'loan' ? 'default' : 'secondary'}>
                {debt.type === 'loan' ? 'Loan' : 'Credit Card'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="grid gap-1">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total amount:</span>
                <span className="font-medium">{formatCurrency(debt.amount)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Remaining:</span>
                <span className="font-medium">{formatCurrency(debt.remaining_amount)}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center gap-1 text-sm">
                  <CalendarCheck className="h-4 w-4 text-muted-foreground" />
                  <span>Due: {format(parseISO(debt.due_date), 'MMM d, yyyy')}</span>
                </div>
                {debt.type === 'credit_card' && debt.closing_date && (
                  <div className="flex items-center gap-1 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Closes: {format(parseISO(debt.closing_date), 'MMM d')}</span>
                  </div>
                )}
              </div>
              {debt.description && (
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{debt.description}</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex gap-2 justify-between">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => deleteDebt(debt.id)}
              className="flex-1"
            >
              Delete
            </Button>
            <Button 
              size="sm" 
              className={`flex-1 ${getDebtStatusColor(debt.due_date, debt.closing_date)}`}
            >
              Make Payment
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default DebtList;
