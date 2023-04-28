const contacts = require("../../models/contacts");
const contactShema = require("../../schemas/contacts");
const RequestError = require("../../helpers/requestError");

const updateContact = async (req, res, next) => {
  try {
    const { error } = contactShema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw RequestError(404, "Not Found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
