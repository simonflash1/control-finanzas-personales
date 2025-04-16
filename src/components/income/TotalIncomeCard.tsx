
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/components/debt/DebtUtils";
import AdBanner from "@/components/ads/AdBanner";

interface TotalIncomeCardProps {
  totalIncome: number;
  loading: boolean;
  showAd?: boolean;
}

const TotalIncomeCard = ({ totalIncome, loading, showAd = false }: TotalIncomeCardProps) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center py-6">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <DollarSign className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold">Total Income</h2>
            {loading ? (
              <Skeleton className="h-10 w-32 mt-2" />
            ) : (
              <div className="text-4xl font-bold text-green-600 mt-2">
                {formatCurrency(totalIncome)}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {showAd && (
        <AdBanner 
          adSlot="5678901234" 
          format="rectangle" 
          className="w-full"
        />
      )}
    </div>
  );
};

export default TotalIncomeCard;
