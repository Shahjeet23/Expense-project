import { addCategory, deletecategory, updatecategories } from "@/api/api";
import { CategoryDialog } from "@/components/categoriesdialog";
import { DataTable } from "@/components/data-table";
import { ConfirmDialog } from "@/components/deletedialog";
import { Button } from "@/components/ui/button";
import { getcate } from "@/features/extrareducer";
import type { CategoriesTable } from "@/schema/schema";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { IconPencil, IconTrash } from "@tabler/icons-react";
import type { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";

const Categories = () => {
  // const [cate, setcate] = useState<CategoriesTable[]>([]);
  const cate = useAppSelector((state) => state.expense.categories);
  const dispatch = useAppDispatch();
  const columns: ColumnDef<CategoriesTable>[] = [
    {
      accessorKey: "id",
      header: () => (
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          ID
        </span>
      ),
      cell: ({ row }) => (
        <span className="font-mono text-sm text-foreground">
          {row.original.id}
        </span>
      ),
    },

    {
      accessorKey: "name",
      header: () => (
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Name
        </span>
      ),
      cell: ({ row }) => (
        <span className="font-medium text-foreground">{row.original.name}</span>
      ),
    },

    {
      id: "actions",

      header: () => (
        <p className=" text-xs font-semibold uppercase tracking-wide text-muted-foreground text-end">
          Action
        </p>
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2 justify-end">
          <CategoryDialog
            mode="edit"
            defaultValues={row.original}
            onSubmit={(data) => handlecate(row?.original?.id || 0, data)}
          >
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
            >
              <IconPencil className="h-4 w-4" />
            </Button>
          </CategoryDialog>

          <ConfirmDialog
            onConfirm={() => handledeletecate(row?.original?.id || 0)}
            title="Delete Category"
            description="Are you sure you want to delete this category? This action cannot be undone."
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
      ),
    },
  ];

  const handleAddcate = async (data: Omit<CategoriesTable, "id">) => {
    try {
      await addCategory(data);
      dispatch(getcate());
      toast.success("User added successfully");
    } catch (error: any) {
      console.error("Add user failed:", error);

      toast.error(error?.response?.data?.message || "Failed to add user");
    }
  };
  const handlecate = async (id: number, data: CategoriesTable) => {
    try {
      await updatecategories(id, data);

      dispatch(getcate());
      toast.success("User added successfully");
    } catch (error: any) {
      console.error("Add user failed:", error);

      toast.error(error?.response?.data?.message || "Failed to add user");
    }
  };
  const handledeletecate = async (id: number) => {
    try {
      await deletecategory(id);
      dispatch(getcate());
      toast.success("User deleted successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete user");
    }
  };
  return (
    <>
      <DataTable data={cate} columns={columns} key={JSON.stringify(cate)}>
        <CategoryDialog mode="add" onSubmit={handleAddcate}>
          <Button>Add cate</Button>
        </CategoryDialog>
      </DataTable>
    </>
  );
};

export default Categories;
