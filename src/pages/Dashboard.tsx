
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/context/LanguageContext";
import MonthlyBalanceCard from "@/components/MonthlyBalanceCard";
import ExpensePieChart from "@/components/ExpensePieChart";
import AccountsList from "@/components/AccountsList";
import CategoryList from "@/components/CategoryList";
import DebtSummary from "@/components/DebtSummary";
import RecentTransactions from "@/components/RecentTransactions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">{t("dashboard.title")}</h1>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">{t("dashboard.overview")}</TabsTrigger>
          <TabsTrigger value="analytics">{t("dashboard.analytics")}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <MonthlyBalanceCard className="lg:col-span-2" />
            <AccountsList />
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <ExpensePieChart />
            <DebtSummary />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <CategoryList />
            <RecentTransactions />
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-full">
              <CardHeader>
                <CardTitle>{t("dashboard.monthlySpendingTrend")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  {t("dashboard.monthlySpendingTrend")}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t("dashboard.savingsRate")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                  {t("dashboard.savingsRate")}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t("dashboard.budgetStatus")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                  {t("dashboard.budgetStatus")}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t("dashboard.spendingCategories")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                  {t("dashboard.spendingCategories")}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
