const express = require("express");
const router = express.Router();

const validateRequest = require("../utill/validationreq");

const {
  createCategorySchema,
  updateCategorySchema,
} = require("../validation/category.schema");

const categoryController = require("../controller/categorey.controller");
router.get("/", categoryController.getCategories);
router.post(
  "/",
  validateRequest(createCategorySchema),
  categoryController.createCategory
);

router.put(
  "/:id",
  validateRequest(updateCategorySchema),
  categoryController.updateCategory
);

router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
