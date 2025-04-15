
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFinance } from "@/context/FinanceContext";

const BalanceCard = () => {
  const { totalBalance, totalIncome, totalExpenses } = useFinance();
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(amount);
  };
  
  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Current Balance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="text-3xl font-bold text-primary">
            {formatCurrency(totalBalance)}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1">
              <span className="text-xs text-muted-foreground">Income</span>
              <span className="text-sm font-medium text-green-600">
                +{formatCurrency(totalIncome)}
              </span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-xs text-muted-foreground">Expenses</span>
              <span className="text-sm font-medium text-red-500">
                -{formatCurrency(totalExpenses)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceCard;
