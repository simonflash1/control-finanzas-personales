
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddExpenseForm from "./AddExpenseForm";
import RecurringExpenseForm from "./RecurringExpenseForm";

export function AddExpenseDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Expense
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add New Expense</DialogTitle>
          <DialogDescription>
            Add a one-time expense or set up a recurring payment.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="one-time" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="one-time">One-time</TabsTrigger>
            <TabsTrigger value="recurring">Recurring</TabsTrigger>
          </TabsList>
          <TabsContent value="one-time">
            <AddExpenseForm />
          </TabsContent>
          <TabsContent value="recurring">
            <RecurringExpenseForm onClose={() => document.querySelector<HTMLButtonElement>('[role="dialog"] button[data-state="open"]')?.click()} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
