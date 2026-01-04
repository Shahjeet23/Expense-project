import { addUser, deleteuser, updateUser } from "@/api/api";
import { DataTable } from "@/components/data-table";
import { ConfirmDialog } from "@/components/deletedialog";
import { Button } from "@/components/ui/button";
import { UserDialog } from "@/components/userdialog";
import { getusers } from "@/features/extrareducer";
import type { UserTable } from "@/schema/schema";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { IconPencil, IconTrash } from "@tabler/icons-react";
import type { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";

const Users = () => {
  const users = useAppSelector((state) => state.expense.users);
  const dispatch = useAppDispatch();
  const columns: ColumnDef<UserTable>[] = [
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
      accessorKey: "email",
      header: () => (
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Email
        </span>
      ),
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {row.original.email}
        </span>
      ),
    },

    {
      accessorKey: "status",
      header: () => (
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Status
        </span>
      ),
      cell: ({ row }) => {
        return <p>{row.original.status}</p>;
      },
    },

    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <UserDialog
            mode="edit"
            defaultValues={row.original}
            onSubmit={(data) => handleEdit(row?.original?.id || 0, data)}
          >
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
            >
              <IconPencil className="h-4 w-4" />
            </Button>
          </UserDialog>

          {/* DELETE */}
          <ConfirmDialog
            onConfirm={() => handleDelete(row?.original?.id || 0)}
            title="Delete User"
            description="Are you sure you want to delete this user? This action cannot be undone."
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

  const handleAddUser = async (data: Omit<UserTable, "id">) => {
    try {
      await addUser(data);

      dispatch(getusers());
      toast.success("User added successfully");
    } catch (error: any) {
      console.error("Add user failed:", error);

      toast.error(error?.response?.data?.message || "Failed to add user");
    }
  };
  const handleEdit = async (id: number, data: UserTable) => {
    try {
      await updateUser(id, data);

      dispatch(getusers());
      toast.success("User Update successfully");
    } catch (error: any) {
      console.error("Add user failed:", error);

      toast.error(error?.response?.data?.message || "Failed to add user");
    }
  };
  const handleDelete = async (id: number) => {
    try {
      await deleteuser(id);
      dispatch(getusers());
      toast.success("User deleted successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete user");
    }
  };
  return (
    <div className="mt-4">
      <h1 className="text-2xl font-bold">User</h1>
      <DataTable
        data={users}
        columns={columns}
        key={JSON.stringify(users)}
        filteron="name"
        filterpalceholder="Filter names..."
      >
        <UserDialog mode="add" onSubmit={handleAddUser}>
          <Button>Add User</Button>
        </UserDialog>
      </DataTable>
    </div>
  );
};

export default Users;
