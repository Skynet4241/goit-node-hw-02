const express = require("express");
const router = express.Router();
const contactsController = require("../../controllers/contacts");
const controllerWrapper = require("../../helpers/controllerWrapper");
const { contactShema, contactStatusUpdate } = require("../../schemas/contacts");
const validateBody = require("../../middlewares/validateBody");

router.get(
  "/",

  controllerWrapper(contactsController.getAllContacts)
);

router.get("/:contactId", controllerWrapper(contactsController.getContactById));

router.post(
  "/",
  validateBody(contactShema),
  controllerWrapper(contactsController.addContact)
);

router.delete(
  "/:contactId",
  controllerWrapper(contactsController.removeContact)
);

router.put(
  "/:contactId",
  validateBody(contactShema),
  controllerWrapper(contactsController.updateContact)
);

router.patch(
  "/:contactId/favorite",
  validateBody(contactStatusUpdate),
  controllerWrapper(contactsController.updateStatusContact)
);

module.exports = router;
