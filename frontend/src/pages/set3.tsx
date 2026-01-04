import { getset3 } from "@/api/api";

import { DataTable } from "@/components/data-table";

import type { Set3 as Setrow } from "@/types/types";

import type { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { toast } from "sonner";
export const set3Columns: ColumnDef<Setrow>[] = [
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
      <span className="font-medium">{row.original.user_name}</span>
    ),
  },

  {
    accessorKey: "predicted_next_month_expense",
    header: "Predicted Next Month Expense",
    cell: ({ row }) => (
      <span className="font-semibold">
        ₹ {row.original.predicted_next_month_expense.toLocaleString()}
      </span>
    ),
  },
];
export const Setpage3 = () => {
  const [expense, setexpense] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getset3();
        setexpense(data);
      } catch (err) {
        toast.error("Failed to load data");
      }
    };

    fetchData();
  }, []);

  return (
    <DataTable
      data={expense}
      columns={set3Columns}
      key={JSON.stringify(expense)}
      filterpalceholder="Filter Expenses"
    />
  );
};
