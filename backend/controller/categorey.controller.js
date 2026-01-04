const categoryService = require("../service/category.service");
exports.createCategory = async (req, res, next) => {
  try {
    const result = await categoryService.createCategory(req.body);

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

exports.updateCategory = async (req, res, next) => {
  try {
    const result = await categoryService.updateCategory(
      req.params.id,
      req.body
    );

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

exports.deleteCategory = async (req, res, next) => {
  try {
    const result = await categoryService.deleteCategory(req.params.id);

    if (result.error) {
      return next(result.error);
    }

    res.json({
      status: "success",
      message: "Category deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const result = await categoryService.getCategories();

    res.json({
      status: "success",
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};
