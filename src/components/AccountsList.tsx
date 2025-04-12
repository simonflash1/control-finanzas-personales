
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFinance } from "@/context/FinanceContext";

const AccountsList = () => {
  const { accounts } = useFinance();
  
  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">My Accounts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
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
