const { z } = require("zod");

const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    status: z.enum(["active", "inactive"]).optional(),
  }),
});

const updateUserSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    email: z.string().email().optional(),
    status: z.enum(["active", "inactive"]).optional(),
  }),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
};
