const express = require("express");
const fs = require("fs/promises");
const router = express.Router();
const { upload } = require("../../../helpers/uploads-service");
const { userControllers } = require("../../../controllers");
const {
  validateUser,
  validateCredentials,
  validateSubscribe,
  validateId,
  validateEmailBeforeVerify,
} = require("../../validation");
const { wrapperError } = require("../../../helpers/errorHandler");
const { guard } = require("../../../helpers/guard");
const { UPLOAD_DIR } = require("../../../config/dotenv-info");

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
router.patch(
  "/avatar",
  upload.single("avatar"),
  guard,
  wrapperError(userControllers.uploadAvatar)
);

router.post(
  "/verify",
  validateEmailBeforeVerify,
  wrapperError(userControllers.refreshVerifyToken)
);
router.get("/verify/:verifyToken", wrapperError(userControllers.verifyUser));

module.exports = router;
