
import { useState } from "react";
import { useFinance } from "@/context/FinanceContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import DebtList from "@/components/debts/DebtList";
import AddDebtForm from "@/components/debts/AddDebtForm";
import { BanknoteIcon, Plus, CreditCard, BarChart3 } from "lucide-react";

const Debts = () => {
  const { debts, loading } = useFinance();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  
  const totalDebt = debts.reduce((sum, debt) => sum + debt.remaining_amount, 0);
  const loanDebt = debts
    .filter(debt => debt.type === 'loan')
    .reduce((sum, debt) => sum + debt.remaining_amount, 0);
  const creditCardDebt = debts
    .filter(debt => debt.type === 'credit_card')
    .reduce((sum, debt) => sum + debt.remaining_amount, 0);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Debts</h1>
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Debt
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Debt</DialogTitle>
              <DialogDescription>
                Enter the details of your loan or credit card.
              </DialogDescription>
            </DialogHeader>
            <AddDebtForm onClose={() => setAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Debt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{formatCurrency(totalDebt)}</div>
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Loans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{formatCurrency(loanDebt)}</div>
              <BanknoteIcon className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Credit Cards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{formatCurrency(creditCardDebt)}</div>
              <CreditCard className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Debts</TabsTrigger>
          <TabsTrigger value="loans">Loans</TabsTrigger>
          <TabsTrigger value="credit-cards">Credit Cards</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <DebtList />
        </TabsContent>
        
        <TabsContent value="loans" className="space-y-4">
          {debts.filter(debt => debt.type === 'loan').length === 0 ? (
            <div className="text-center py-8">
              <div className="flex justify-center mb-4">
                <BanknoteIcon className="h-16 w-16 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No loans found</h3>
              <p className="text-muted-foreground mt-1">
                Add your loans to track them
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {debts
                .filter(debt => debt.type === 'loan')
                .map(debt => (
                  <div key={debt.id}>
                    {/* Loan card content would go here - using the same structure as in DebtList */}
                  </div>
                ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="credit-cards" className="space-y-4">
          {debts.filter(debt => debt.type === 'credit_card').length === 0 ? (
            <div className="text-center py-8">
              <div className="flex justify-center mb-4">
                <CreditCard className="h-16 w-16 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No credit cards found</h3>
              <p className="text-muted-foreground mt-1">
                Add your credit cards to track them
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {debts
                .filter(debt => debt.type === 'credit_card')
                .map(debt => (
                  <div key={debt.id}>
                    {/* Credit card content would go here - using the same structure as in DebtList */}
                  </div>
                ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Debts;
