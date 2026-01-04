import z from "zod";

export const dataTableSchema = z.object({
  id: z.number(),
  header: z.string(),
  type: z.string(),
  status: z.string(),
  target: z.string(),
  limit: z.string(),
  reviewer: z.string(),
});
export type DataTable = z.infer<typeof dataTableSchema>;

export const userTableSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  email: z.string().email(),
  status: z.enum(["active", "inactive"]),
});
export type UserTable = z.infer<typeof userTableSchema>;

export const categoriestableSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
});
export type CategoriesTable = z.infer<typeof categoriestableSchema>;
export const dataTableArraySchema = z.array(dataTableSchema);

export const expenseSchema = z.object({
  id: z.number().optional(),
  amount: z.string(), // backend sends string "500.00"
  date: z.string(),
  description: z.string(),
  created_at: z.string(),
  user_id: z.number(),
  user_name: z.string(),
  category_id: z.number(),
  category_name: z.string(),
  user_email: z.string().email(),
});

export type Expense = z.infer<typeof expenseSchema>;
