import { getset1 } from "@/api/api";

import { DataTable } from "@/components/data-table";
import { ExpenseDetailDialog } from "@/components/tabledialog";
import { Button } from "@/components/ui/button";

import type { Expense, UserTable } from "@/schema/schema";
import type { TopDay, UserTotalRow } from "@/types/types";

import type { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { toast } from "sonner";
const detailColumns: ColumnDef<TopDay>[] = [
  {
    accessorKey: "expense_date",
    header: "Date",
    cell: ({ row }) => new Date(row.original.expense_date).toLocaleDateString(),
  },
  {
    accessorKey: "total_amount",
    header: "Amount",
    cell: ({ row }) => (
      <span className="font-medium">
        ₹ {Number(row.original.total_amount).toLocaleString()}
      </span>
    ),
  },
];
const Set1 = () => {
  const [expense, setexpense] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getset1();
        setexpense(
          data.map((u: any) => ({
            user_id: u.user_id,
            user_name: u.user_name,
            total_amount: u.top_days.reduce(
              (sum: any, d: any) => sum + Number(d.total_amount),
              0
            ),
            top_days: u.top_days,
          }))
        );
      } catch (err) {
        toast.error("Failed to load data");
      }
    };

    fetchData();
  }, []);

  const mainColumns: ColumnDef<UserTotalRow>[] = [
    {
      accessorKey: "user_id",
      header: "User ID",
      cell: ({ row }) => (
        <span className="font-mono">{row.original.user_id}</span>
      ),
    },
    {
      accessorKey: "user_name",
      header: "User Name",
      cell: ({ row }) => (
        <span className="font-mono">{row.original.user_name}</span>
      ),
    },
    {
      accessorKey: "total_amount",
      header: ({ column }) => (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-semibold"
        >
          Total Amount
          {column.getIsSorted() === "asc" && " ↑"}
          {column.getIsSorted() === "desc" && " ↓"}
        </div>
      ),
      cell: ({ row }) => (
        <ExpenseDetailDialog
          columns={detailColumns}
          data={row.original.top_days}
          total_amount={row.original.total_amount}
          userId={row.original.user_id}
          user_name={row.original.user_name}
        />
      ),
    },
  ];

  return (
    <DataTable
      data={expense}
      columns={mainColumns}
      key={JSON.stringify(expense)}
      filterpalceholder="Filter Expenses"
    />
  );
};

export default Set1;
