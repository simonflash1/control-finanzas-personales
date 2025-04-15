
import { useFinance } from "@/context/FinanceContext";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CATEGORY_ICONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface CategoryListProps {
  className?: string;
}

const CategoryList = ({ className }: CategoryListProps) => {
  const { getCategoryExpenses, getAllCategories } = useFinance();
  const { t } = useLanguage();

  const categoryExpenses = getCategoryExpenses();
  const categories = getAllCategories();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(amount);
  };
  
  return (
    <Card className={cn("col-span-1", className)}>
      <CardHeader>
        <CardTitle>{t("dashboard.spending")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categories.map((category) => {
            const IconComponent = CATEGORY_ICONS[category];
            return (
              <div key={category} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <IconComponent className="h-4 w-4 text-gray-500" />
                  <span>{category}</span>
                </div>
                <span>{formatCurrency(categoryExpenses[category] || 0)}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryList;
