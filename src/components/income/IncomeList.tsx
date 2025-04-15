
import { useState } from "react";
import { Income } from "@/context/finance/types";
import { format } from "date-fns";
import { DollarSign, Pencil, Trash } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/components/debt/DebtUtils";

interface IncomeListProps {
  incomes: Income[];
  loading: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const IncomeList = ({ incomes, loading, onEdit, onDelete }: IncomeListProps) => {
  return (
    <div className="space-y-4">
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center space-x-3">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div>
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-3 w-24 mt-1" />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {incomes.length > 0 ? (
            [...incomes]
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((income) => (
                <div 
                  key={income.id} 
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">{income.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {income.source} • {format(new Date(income.date), 'MMM dd, yyyy')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-green-600 mr-4">+{formatCurrency(income.amount)}</span>
                    <Button variant="ghost" size="sm" onClick={() => onEdit(income.id)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onDelete(income.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              No income entries yet. Add your first income!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default IncomeList;
