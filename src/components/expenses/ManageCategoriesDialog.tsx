
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CategoryType } from "@/context/FinanceContext";
import { CATEGORY_COLORS, CATEGORY_ICONS } from "@/lib/constants";
import { Pencil, Trash, Check, X, AlertCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ManageCategoriesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: CategoryType[];
  onUpdateCategory: (oldCategory: CategoryType, newCategory: string) => void;
  onDeleteCategory: (category: CategoryType) => void;
  getCategoryExpenseCount: (category: CategoryType) => number;
}

const ManageCategoriesDialog = ({
  open,
  onOpenChange,
  categories,
  onUpdateCategory,
  onDeleteCategory,
  getCategoryExpenseCount
}: ManageCategoriesDialogProps) => {
  const [editingCategory, setEditingCategory] = useState<CategoryType | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleEditStart = (category: CategoryType) => {
    setEditingCategory(category);
    setNewCategoryName(category);
  };

  const handleEditCancel = () => {
    setEditingCategory(null);
    setNewCategoryName("");
  };

  const handleEditSave = () => {
    if (editingCategory && newCategoryName.trim()) {
      onUpdateCategory(editingCategory, newCategoryName.trim());
      setEditingCategory(null);
      setNewCategoryName("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Manage Categories</DialogTitle>
          <DialogDescription>
            Edit or delete your expense categories
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            {categories.map((category) => {
              const IconComponent = CATEGORY_ICONS[category as CategoryType];
              const isEditing = editingCategory === category;
              const expenseCount = getCategoryExpenseCount(category);
              const hasExpenses = expenseCount > 0;
              
              return (
                <div 
                  key={category} 
                  className="flex items-center justify-between p-2 rounded border"
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: CATEGORY_COLORS[category as CategoryType] }}
                    >
                      <IconComponent className="h-4 w-4 text-white" />
                    </div>
                    
                    {isEditing ? (
                      <Input
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        className="h-8 w-40"
                        autoFocus
                      />
                    ) : (
                      <div className="flex items-center">
                        <span className="capitalize">{category}</span>
                        {hasExpenses && (
                          <span className="text-xs text-muted-foreground ml-2">
                            ({expenseCount} expenses)
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex space-x-1">
                    {isEditing ? (
                      <>
                        <Button variant="ghost" size="sm" onClick={handleEditSave}>
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={handleEditCancel}>
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => handleEditStart(category)}
                                  disabled={hasExpenses}
                                >
                                  <Pencil className={`h-4 w-4 ${hasExpenses ? 'text-muted-foreground' : ''}`} />
                                </Button>
                              </div>
                            </TooltipTrigger>
                            {hasExpenses && (
                              <TooltipContent>
                                <p>Cannot edit category with existing expenses</p>
                              </TooltipContent>
                            )}
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => onDeleteCategory(category)}
                                  disabled={hasExpenses}
                                >
                                  <Trash className={`h-4 w-4 ${hasExpenses ? 'text-muted-foreground' : ''}`} />
                                </Button>
                              </div>
                            </TooltipTrigger>
                            {hasExpenses && (
                              <TooltipContent>
                                <p>Cannot delete category with existing expenses</p>
                              </TooltipContent>
                            )}
                          </Tooltip>
                        </TooltipProvider>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          <p className="text-sm text-muted-foreground">
            Categories with existing expenses cannot be edited or deleted. You must reassign or delete the expenses first.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManageCategoriesDialog;
