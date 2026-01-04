const expenseService = require("../service/expense.service");

exports.createExpense = async (req, res, next) => {
  try {
    const result = await expenseService.create(req.body);

    if (result.error) {
      return next(result.error);
    }

    res.status(201).json({
      status: "success",
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getExpenses = async (req, res, next) => {
  try {
    const result = await expenseService.getExpenses(req.query);

    if (result.error) {
      return next(result.error);
    }

    res.json({
      status: "success",
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateExpense = async (req, res, next) => {
  try {
    const result = await expenseService.updateExpense(req.params.id, req.body);

    if (result.error) {
      return next(result.error);
    }

    res.json({
      status: "success",
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteExpense = async (req, res, next) => {
  try {
    const result = await expenseService.deleteExpense(req.params.id);

    if (result.error) {
      return next(result.error);
    }

    res.json({
      status: "success",
      message: "Expense deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
exports.controllerset1 = async (req, res, next) => {
  try {
    const result = await expenseService.Set1();

    if (result.error) {
      return next(result.error);
    }

    res.json({
      status: "success",
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};
exports.controllerset2 = async (req, res, next) => {
  try {
    const result = await expenseService.Set2();

    if (result.error) {
      return next(result.error);
    }

    res.json({
      status: "success",
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

exports.controllerset3 = async (req, res, next) => {
  try {
    const result = await expenseService.Set3();

    if (result.error) {
      return next(result.error);
    }

    res.json({
      status: "success",
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};
