
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFinance } from "@/context/FinanceContext";

const AccountsList = () => {
  const { accounts, totalBalance } = useFinance();
  
  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">My Accounts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-4 p-3 rounded-lg border border-primary/20 bg-primary/5">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Balance</p>
            </div>
            <p className="text-2xl font-bold">${totalBalance.toFixed(2)}</p>
          </div>
          
          {accounts.map((account) => (
            <div 
              key={account.id} 
              className="flex items-center justify-between p-3 rounded-lg border"
            >
              <div className="flex items-center space-x-3">
                <div 
                  className="w-3 h-10 rounded-sm" 
                  style={{ backgroundColor: account.color }}
                />
                <div>
                  <p className="font-medium">{account.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{account.type}</p>
                </div>
              </div>
              <div 
                className={`font-semibold ${
                  account.balance < 0 ? 'text-red-500' : account.type === 'savings' ? 'text-green-600' : ''
                }`}
              >
                ${account.balance.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountsList;
