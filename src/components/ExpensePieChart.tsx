
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFinance, CategoryType } from "@/context/FinanceContext";

// For category names display
const CATEGORY_NAMES: Record<CategoryType, string> = {
  food: "Food",
  transport: "Transport",
  home: "Home",
  health: "Health",
  shopping: "Shopping",
  entertainment: "Entertainment",
  other: "Other"
};

const ExpensePieChart = () => {
  const { getCategoryExpenses, totalExpenses } = useFinance();
  const categoryExpenses = getCategoryExpenses();
  
  // Prepare data for the pie chart
  const data = Object.entries(categoryExpenses)
    .filter(([_, amount]) => amount > 0)
    .map(([category, amount]) => ({
      name: CATEGORY_NAMES[category as CategoryType],
      value: amount,
      color: `bg-category-${category}`,
    }));

  // Only show categories with expenses
  const chartData = data.filter(item => item.value > 0);

  // Colors for the pie chart sections
  const COLORS = [
    '#f471b5', // food
    '#f59e0b', // transport
    '#3b82f6', // home
    '#10b981', // health
    '#06b6d4', // shopping
    '#8b5cf6', // entertainment
    '#6b7280', // other
  ];

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Expense Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="pb-0">
        <div className="h-[300px] flex items-center justify-center">
          {totalExpenses > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']}
                  contentStyle={{ borderRadius: '8px' }}
                />
                <Legend 
                  formatter={(value, entry, index) => {
                    const item = chartData[index];
                    const percentage = ((item.value / totalExpenses) * 100).toFixed(0);
                    return `${value} (${percentage}%)`;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center text-muted-foreground">
              No expense data available
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpensePieChart;
