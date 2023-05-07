const express = require("express");
const controllerWrapper = require("../../helpers/controllerWrapper");
const controller = require("../../controllers/users");
const auth = require("../../middlewares/auth");
const { joiSubscriptionSchema } = require("../../models/user");
const { validateBody } = require("../../middlewares");

const router = express.Router();

router.get(
  "/current",
  controllerWrapper(auth),
  controllerWrapper(controller.getCurrent)
);

router.patch(
  "/",
  controllerWrapper(auth),
  validateBody(joiSubscriptionSchema),
  controllerWrapper(controller.updateSubscription)
);

module.exports = router;
