const express = require("express");
const router = express.Router();
const contactsController = require("../../controllers/contacts");
const controllerWrapper = require("../../helpers/controllerWrapper");
const { contactShema, contactStatusUpdate } = require("../../models/contacts");
const { validateBody, auth } = require("../../middlewares");

router.get(
  "/",
  controllerWrapper(auth),
  controllerWrapper(contactsController.getAllContacts)
);

router.get(
  "/:contactId",
  controllerWrapper(auth),
  controllerWrapper(contactsController.getContactById)
);

router.post(
  "/",
  controllerWrapper(auth),
  validateBody(contactShema),
  controllerWrapper(contactsController.addContact)
);

router.delete(
  "/:contactId",
  controllerWrapper(auth),
  controllerWrapper(contactsController.removeContact)
);

router.put(
  "/:contactId",
  controllerWrapper(auth),
  validateBody(contactShema),
  controllerWrapper(contactsController.updateContact)
);

router.patch(
  "/:contactId/favorite",
  controllerWrapper(auth),
  validateBody(contactStatusUpdate),
  controllerWrapper(contactsController.updateStatusContact)
);

module.exports = router;
