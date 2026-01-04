const { z } = require("zod");

const createExpenseSchema = z.object({
  body: z.object({
    user_id: z.coerce.number().int().positive("Invalid user_id"),
    category_id: z.coerce.number().int().positive("Invalid category_id"),
    amount: z.coerce.number().positive("Amount must be greater than 0"),
    date: z.string().refine((val) => !isNaN(new Date(val).getTime()), {
      message: "Invalid date",
    }),
    description: z.string().max(500).optional(),
  }),
});

const updateExpenseSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive("Invalid expense id"),
  }),
  body: z
    .object({
      user_id: z.coerce.number().int().positive().optional(),
      category_id: z.coerce.number().int().positive().optional(),
      amount: z.coerce.number().positive().optional(),
      date: z
        .string()
        .refine((val) => !isNaN(new Date(val).getTime()), {
          message: "Invalid date",
        })
        .optional(),
      description: z.string().max(500).optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field is required to update",
    }),
});

module.exports = {
  createExpenseSchema,
  updateExpenseSchema,
};
