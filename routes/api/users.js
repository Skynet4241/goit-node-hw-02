const express = require("express");
const controllerWrapper = require("../../helpers/controllerWrapper");
const controller = require("../../controllers/users");
const { joiSubscriptionSchema } = require("../../models/user");
const { auth, validateBody, upload } = require("../../middlewares");

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

router.patch(
  "/avatars",
  controllerWrapper(auth),
  upload.single("avatar"),
  controllerWrapper(controller.uploadAvatar)
);

module.exports = router;
