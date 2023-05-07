const express = require("express");
const controllerWrapper = require("../../helpers/controllerWrapper");
const controller = require("../../controllers/auth");
const { validateBody } = require("../../middlewares");
const { userRegisterSchema } = require("../../models/user");
const auth = require("../../middlewares/auth");

const router = express.Router();

router.post(
  "/register",
  validateBody(userRegisterSchema),
  controllerWrapper(controller.registration)
);
router.post(
  "/login",
  validateBody(userRegisterSchema),
  controllerWrapper(controller.login)
);

router.post(
  "/logout",
  controllerWrapper(auth),
  controllerWrapper(controller.logout)
);

module.exports = router;
