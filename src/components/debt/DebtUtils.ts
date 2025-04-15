
import { Debt } from "@/context/finance/types";
import { parseISO, isBefore } from "date-fns";

// Format currency consistently across debt components
export const formatCurrency = (amount: number, currency: string = 'ARS') => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

// Sort debts by urgency (overdue first, then by closest due date)
export const sortDebtsByUrgency = (debts: Debt[]): Debt[] => {
  const today = new Date();
  
  return [...debts].sort((a, b) => {
    const aDate = parseISO(a.due_date);
    const bDate = parseISO(b.due_date);
    
    const aIsOverdue = isBefore(aDate, today);
    const bIsOverdue = isBefore(bDate, today);
    
    if (aIsOverdue && !bIsOverdue) return -1;
    if (!aIsOverdue && bIsOverdue) return 1;
    
    return aDate.getTime() - bDate.getTime();
  });
};
