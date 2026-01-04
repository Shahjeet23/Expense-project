import { addExpense, deleteExpense, updateExpense } from "@/api/api";

import { DataTable } from "@/components/data-table";
import { ConfirmDialog } from "@/components/deletedialog";
import {
  ExpenseDialog,
  type ExpenseFormValues,
} from "@/components/expensedialog";
import { SearchSelect } from "@/components/searchbleselect";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getexpense } from "@/features/extrareducer";

import type { Expense } from "@/schema/schema";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { IconPencil, IconTrash } from "@tabler/icons-react";
import type { ColumnDef } from "@tanstack/react-table";
import { CalendarIcon, Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Home = () => {
  const expense = useAppSelector((state) => state.expense.expenses);
  const users = useAppSelector((state) => state.expense.users);
  const categories = useAppSelector((state) => state.expense.categories);

  const [filters, setFilters] = useState<{
    user_id?: number;
    category_id?: number;
    start_date?: string;
    end_date?: string;
  }>({});

  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getexpense());
      } catch (err) {
        toast.error("Failed to load data");
      }
    };

    fetchData();
  }, []);

  const handleAddExpense = async (data: ExpenseFormValues) => {
    try {
      await addExpense(data);
      dispatch(getexpense());
      toast.success("User added successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to add user");
    }
  };

  const handleEdit = async (id: number, data: ExpenseFormValues) => {
    try {
      await updateExpense(id, data);
      dispatch(getexpense());
      toast.success("User updated successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update user");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteExpense(id);
      dispatch(getexpense());
      toast.success("User deleted successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete user");
    }
  };

  const columns: ColumnDef<Expense>[] = [
    {
      accessorKey: "id",
      header: () => (
        <span className="text-xs font-semibold uppercase text-muted-foreground">
          ID
        </span>
      ),
      cell: ({ row }) => (
        <span className="font-mono text-sm">{row.original.id}</span>
      ),
    },
    {
      accessorKey: "user_name",
      header: ({ column }) => (
        <button
          type="button"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1 text-xs font-semibold uppercase text-muted-foreground hover:text-foreground"
        >
          User Name
          {column.getIsSorted() === "asc" && " ↑"}
          {column.getIsSorted() === "desc" && " ↓"}
        </button>
      ),
      cell: ({ row }) => (
        <span className="font-medium">{row.original.user_name}</span>
      ),
    },
    {
      accessorKey: "user_email",
      header: () => (
        <span className="text-xs font-semibold uppercase text-muted-foreground">
          Email
        </span>
      ),
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {row.original.user_email}
        </span>
      ),
    },
    {
      accessorKey: "category_name",
      header: () => (
        <span className="text-xs font-semibold uppercase text-muted-foreground">
          Category
        </span>
      ),
      cell: ({ row }) => (
        <span className="capitalize">{row.original.category_name}</span>
      ),
    },
    {
      accessorKey: "amount",
      header: () => (
        <span className="text-xs font-semibold uppercase text-muted-foreground">
          Amount
        </span>
      ),
      cell: ({ row }) => (
        <span className="capitalize">{row.original.amount}</span>
      ),
    },
    {
      accessorKey: "date",
      header: () => (
        <span className="text-xs font-semibold uppercase text-muted-foreground">
          Date
        </span>
      ),
      cell: ({ row }) => (
        <span className="capitalize">
          {new Date(row.original.date).toLocaleDateString()}
        </span>
      ),
    },
    {
      accessorKey: "description",
      header: () => (
        <span className="text-xs font-semibold uppercase text-muted-foreground">
          Description
        </span>
      ),
      cell: ({ row }) => (
        <span className="capitalize">{row.original.description}</span>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const user = row.original;

        return (
          <div className="flex items-center gap-2">
            <ExpenseDialog
              mode="edit"
              defaultValues={user}
              onSubmit={(data) => handleEdit(user.id!, data)}
            >
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
              >
                <IconPencil className="h-4 w-4" />
              </Button>
            </ExpenseDialog>

            <ConfirmDialog
              title="Delete Expense"
              description="Are you sure you want to delete this expense? This action cannot be undone."
              onConfirm={() => handleDelete(user?.id || 0)}
            >
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive hover:bg-destructive/10"
              >
                <IconTrash className="h-4 w-4" />
              </Button>
            </ConfirmDialog>
          </div>
        );
      },
    },
  ];
  const Useropt = [
    {
      value: -1,
      label: "All User",
    },
    ...users.map((c) => ({
      value: c.id,
      label: c.name,
    })),
  ];
  return (
    <div className="mt-4">
      <h1 className="mb-6 text-2xl font-bold">Expenses</h1>
      <div className="flex flex-wrap items-end gap-3 mb-4">
        <SearchSelect
          className={"w-fit"}
          value={filters.user_id ?? -1}
          options={Useropt}
          placeholder="All User"
          searchPlaceholder="Search user..."
          onChange={(v) => {
            if (v == -1) {
              const { user_id, ...rest } = filters;
              setFilters(rest);
            } else {
              setFilters({ ...filters, user_id: Number(v) });
            }
          }}
        />

        <Select
          value={filters.category_id?.toString() ?? "-1"}
          onValueChange={(v) => {
            if (v === "-1") {
              const { category_id, ...rest } = filters;
              setFilters(rest);
            } else {
              setFilters({ ...filters, category_id: Number(v) });
            }
          }}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="-1">All Categories</SelectItem>

            {categories.map((c) => (
              <SelectItem key={c.id} value={c.id.toString()}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[160px] justify-start">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filters.start_date || "From date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <Calendar
              mode="single"
              selected={
                filters.start_date ? new Date(filters.start_date) : undefined
              }
              onSelect={(d) =>
                setFilters({
                  ...filters,
                  start_date: d ? d.toDateString() : undefined,
                })
              }
              disabled={{ after: new Date() }}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[160px] justify-start">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filters.end_date || "To date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <Calendar
              mode="single"
              selected={
                filters.end_date ? new Date(filters.end_date) : undefined
              }
              onSelect={(d) =>
                setFilters({
                  ...filters,
                  end_date: d ? d.toDateString() : undefined,
                })
              }
              disabled={{ after: new Date() }}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Button onClick={() => dispatch(getexpense(filters))} className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>

        <Button
          variant="outline"
          onClick={() => {
            setFilters({});
            dispatch(getexpense());
          }}
        >
          Clear
        </Button>
      </div>
      <DataTable
        data={expense}
        columns={columns}
        filteron="user_name"
        key={JSON.stringify(expense)}
        filterpalceholder="Filter Expenses"
      >
        <ExpenseDialog mode="add" onSubmit={handleAddExpense}>
          <Button>Add Expense</Button>
        </ExpenseDialog>
      </DataTable>
    </div>
  );
};

export default Home;
