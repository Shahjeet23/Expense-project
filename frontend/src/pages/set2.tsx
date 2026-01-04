import { getset2 } from "@/api/api";

import { DataTable } from "@/components/data-table";
import { cn } from "@/lib/utils";

import type { Set2 as Setrow } from "@/types/types";

import type { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { toast } from "sonner";
export const set2Columns: ColumnDef<Setrow>[] = [
  {
    accessorKey: "user_id",
    header: "User ID",
    cell: ({ row }) => (
      <span className="font-mono">{row.original.user_id}</span>
    ),
  },

  {
    accessorKey: "month",
    header: "Month",
    cell: ({ row }) => {
      const date = new Date(row.original.month);
      return (
        <span className="font-medium">
          {date.toLocaleDateString(undefined, {
            month: "short",
            year: "numeric",
          })}
        </span>
      );
    },
  },

  {
    accessorKey: "current_month_total",
    header: "Current Month",
    cell: ({ row }) => (
      <span className="font-semibold">
        ₹ {row.original.current_month_total.toLocaleString()}
      </span>
    ),
  },

  {
    accessorKey: "previous_month_total",
    header: "Previous Month",
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        ₹ {row.original.previous_month_total.toLocaleString()}
      </span>
    ),
  },

  {
    accessorKey: "percentage_change",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="font-semibold"
      >
        % Change
        {column.getIsSorted() === "asc" && " ↑"}
        {column.getIsSorted() === "desc" && " ↓"}
      </button>
    ),
    cell: ({ row }) => {
      const value = Number(row.original.percentage_change);
      const isPositive = value >= 0;

      return (
        <span
          className={cn(
            "font-semibold",
            isPositive ? "text-green-600" : "text-red-600"
          )}
        >
          {isPositive ? "▲" : "▼"} {Math.abs(value)}%
        </span>
      );
    },
    sortingFn: "alphanumeric",
  },
];
export const Setpage2 = () => {
  const [expense, setexpense] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getset2();
        setexpense(data);
      } catch (err) {
        toast.error("Failed to load data");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-4">
      <h1 className="text-2xl font-bold">Set - 2</h1>
      <DataTable
        data={expense}
        columns={set2Columns}
        key={JSON.stringify(expense)}
        filterpalceholder="Filter Expenses"
      />
    </div>
  );
};
