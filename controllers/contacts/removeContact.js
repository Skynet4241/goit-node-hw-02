const { Contact } = require("../../models/contacts");
const RequestError = require("../../helpers/requestError");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const { id } = req.user;

  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) {
    throw RequestError(404, "Not Found");
  }

  const { owner: resultOwner } = result;
  const value = resultOwner.toString();

  if (id !== value) {
    throw RequestError(404, "Not Found");
  }

  res.json({ message: "Contact deleted" });
};

module.exports = removeContact;
