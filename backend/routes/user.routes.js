const express = require("express");
const router = express.Router();

const validateRequest = require("../utill/validationreq");
const {
  createUserSchema,
  updateUserSchema,
} = require("../validation/userschema.validation");

const userController = require("../controller/user.controller");

router.get("/", userController.getUsers);
router.post("/", validateRequest(createUserSchema), userController.createUser);

router.put(
  "/:id",
  validateRequest(updateUserSchema),
  userController.updateUser
);

router.delete("/:id", userController.deleteUser);

module.exports = router;
