const express = require("express");
const router = express.Router();
const { userControllers } = require("../../../controllers");
const {
  validateUser,
  validateCredentials,
  validateSubscribe,
  validateId,
} = require("../../validation");
const { wrapperError } = require("../../../helpers/errorHandler");
const { guard } = require("../../../helpers/guard");

router.post(
  "/signup",
  validateUser,
  wrapperError(userControllers.registrationUser)
);
router.post("/login", validateCredentials, wrapperError(userControllers.login));
router.get("/logout", guard, wrapperError(userControllers.logout));
router.get("/current", guard, wrapperError(userControllers.userInfo));
router.patch(
  "/subscription",
  validateSubscribe,
  guard,
  wrapperError(userControllers.changeSubscribe)
);

module.exports = router;
