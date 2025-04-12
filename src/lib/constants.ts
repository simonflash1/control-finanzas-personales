
import { 
  Utensils, 
  Car, 
  Home, 
  Heart, 
  ShoppingBag, 
  Film, 
  HelpCircle
} from "lucide-react";
import { CategoryType } from "@/context/FinanceContext";

export const CATEGORY_ICONS = {
  food: Utensils,
  transport: Car,
  home: Home,
  health: Heart,
  shopping: ShoppingBag,
  entertainment: Film,
  other: HelpCircle,
};

export const CATEGORY_COLORS = {
  food: '#f471b5',
  transport: '#f59e0b',
  home: '#3b82f6',
  health: '#10b981',
  shopping: '#06b6d4',
  entertainment: '#8b5cf6',
  other: '#6b7280',
};
