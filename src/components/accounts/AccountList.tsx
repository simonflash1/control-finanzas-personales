
import AccountCard from "./AccountCard";
import { Account } from "./accountTypes";

interface AccountListProps {
  accounts: Account[];
  onEdit: (account: Account) => void;
  onDelete: (id: string) => void;
}

const AccountList = ({ accounts, onEdit, onDelete }: AccountListProps) => {
  if (accounts.length === 0) {
    return <div className="text-muted-foreground">No accounts added yet.</div>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {accounts.map((account) => (
        <AccountCard
          key={account.id}
          account={account}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default AccountList;
