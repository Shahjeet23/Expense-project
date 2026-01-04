const { z } = require("zod");

const createCategorySchema = z.object({
  body: z.object({
    name: z.string().min(2, "Category name is required"),
  }),
});

const updateCategorySchema = z.object({
  body: z.object({
    name: z.string().min(2, "Category name is required"),
  }),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
};
