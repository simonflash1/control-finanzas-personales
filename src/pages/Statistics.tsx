
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { useFinance, CategoryType } from "@/context/FinanceContext";
import { CATEGORY_COLORS } from "@/lib/constants";

const CATEGORY_NAMES: Record<CategoryType, string> = {
  food: "Food",
  transport: "Transport",
  home: "Home",
  health: "Health",
  shopping: "Shopping",
  entertainment: "Entertainment",
  other: "Other"
};

const Statistics = () => {
  const { expenses, incomes, getCategoryExpenses, totalExpenses, totalIncome } = useFinance();
  
  // Prepare data for category pie chart
  const categoryExpenses = getCategoryExpenses();
  const pieData = Object.entries(categoryExpenses)
    .filter(([_, amount]) => amount > 0)
    .map(([category, amount]) => ({
      name: CATEGORY_NAMES[category as CategoryType],
      value: amount,
      color: CATEGORY_COLORS[category as CategoryType],
    }));

  // Prepare data for income vs expense comparison
  const compareData = [
    { name: "Income", value: totalIncome, color: "#10b981" },
    { name: "Expenses", value: totalExpenses, color: "#ef4444" },
  ];

  // Group expenses by date for trend analysis
  const last7Days = new Array(7).fill(0).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().slice(0, 10);
  }).reverse();

  const expensesByDate = last7Days.map(date => {
    const dayExpenses = expenses.filter(e => e.date.startsWith(date));
    return {
      date: new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      amount: dayExpenses.reduce((sum, e) => sum + e.amount, 0),
    };
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Statistics</h1>
      
      <Tabs defaultValue="charts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="charts">Charts</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>
        
        <TabsContent value="charts" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {totalExpenses > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']}
                          contentStyle={{ borderRadius: '8px' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-muted-foreground">
                      No expense data available
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Income vs Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {(totalIncome > 0 || totalExpenses > 0) ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={compareData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']}
                          contentStyle={{ borderRadius: '8px' }}
                        />
                        <Bar dataKey="value">
                          {compareData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-muted-foreground">
                      No financial data available
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Expense Trend (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={expensesByDate}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']}
                      contentStyle={{ borderRadius: '8px' }}
                    />
                    <Bar dataKey="amount" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Savings Potential</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-between">
                  <span>Income</span>
                  <span className="font-medium">${totalIncome.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Expenses</span>
                  <span className="font-medium">${totalExpenses.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4 flex justify-between">
                  <span className="font-semibold">Savings</span>
                  <span 
                    className={`font-semibold ${
                      totalIncome - totalExpenses >= 0 ? 'text-green-600' : 'text-red-500'
                    }`}
                  >
                    ${(totalIncome - totalExpenses).toFixed(2)}
                  </span>
                </div>
                
                {totalIncome > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Savings Rate: {totalIncome > 0 
                        ? `${(((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1)}%` 
                        : '0%'}
                    </p>
                    <div className="expense-bar">
                      <div 
                        className="progress-indicator bg-green-500" 
                        style={{ 
                          width: `${totalIncome > 0 
                            ? Math.max(0, ((totalIncome - totalExpenses) / totalIncome) * 100)
                            : 0}%` 
                        }} 
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Statistics;
