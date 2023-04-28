const { Contact } = require("../../schemas/contacts");
const RequestError = require("../../helpers/requestError");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw RequestError(404, "Not Found");
  }
  res.json({ message: "Contact deleted" });
};

module.exports = removeContact;
