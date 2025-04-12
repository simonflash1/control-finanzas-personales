
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from 'lucide-react';
import { Account } from "./accountTypes";

interface AccountCardProps {
  account: Account;
  onEdit: (account: Account) => void;
  onDelete: (id: string) => void;
}

const AccountCard = ({ account, onEdit, onDelete }: AccountCardProps) => {
  return (
    <Card className="bg-card text-card-foreground">
      <CardHeader>
        <CardTitle>{account.name}</CardTitle>
        <CardDescription>Type: {account.type}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${account.balance.toFixed(2)}</div>
        <div className="flex items-center justify-between mt-4">
          <Button variant="outline" size="sm" onClick={() => onEdit(account)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="destructive" size="sm" onClick={() => onDelete(account.id)}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountCard;
