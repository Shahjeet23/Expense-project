import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DataTable } from "@/components/data-table";
import type { ColumnDef } from "@tanstack/react-table";

export function ExpenseDetailDialog({
  data,
  columns,
  userId,
  total_amount,
  user_name,
}: {
  data: Record<string, any>[];
  columns: ColumnDef<any>[];
  userId: number;
  total_amount: number;
  user_name: string;
}) {
  return (
    <Dialog>
      <DialogTrigger>
        <span className="font-semibold text-primary cursor-pointer underline">
          ₹ {total_amount}
        </span>
      </DialogTrigger>
      <DialogContent className="max-w-[80%]! w-full!">
        <DialogHeader>
          <DialogTitle>
            Expense Breakdown (User {userId} - {user_name})
          </DialogTitle>
        </DialogHeader>

        <DataTable data={data} columns={columns} />
      </DialogContent>
    </Dialog>
  );
}
