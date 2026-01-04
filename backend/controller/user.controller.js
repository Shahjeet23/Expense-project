const userService = require("../service/user.service");

exports.createUser = async (req, res, next) => {
  try {
    const result = await userService.createUser(req.body);
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

exports.updateUser = async (req, res, next) => {
  try {
    const result = await userService.updateUser(req.params.id, req.body);

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

exports.deleteUser = async (req, res, next) => {
  try {
    const result = await userService.deleteUser(req.params.id);

    if (result.error) {
      return next(result.error);
    }

    res.json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const result = await userService.getUsers();

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
