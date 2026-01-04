const express = require("express");
const router = express.Router();

const validateRequest = require("../utill/validationreq");
const {
  createExpenseSchema,
  updateExpenseSchema,
} = require("../validation/expense.validation");

const expenseController = require("../controller/expense.controller");

router.post(
  "/",
  validateRequest(createExpenseSchema),
  expenseController.createExpense
);

router.get("/", expenseController.getExpenses);
router.get("/set1", expenseController.controllerset1);
router.get("/set2", expenseController.controllerset2);
router.get("/set3", expenseController.controllerset3);

router.put(
  "/:id",
  validateRequest(updateExpenseSchema),
  expenseController.updateExpense
);

router.delete("/:id", expenseController.deleteExpense);

module.exports = router;
