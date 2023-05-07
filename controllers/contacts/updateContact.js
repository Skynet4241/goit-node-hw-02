const { RequestError } = require("../../helpers");
const { Contact } = require("../../models/contacts");

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { id } = req.user;
  const { name } = req.body;

  const existingContact = await Contact.findOne({ name, owner: id });

  if (existingContact) {
    throw RequestError(409, `Contact with name "${name}" already exists`);
  }

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw RequestError(404, "Not Found");
  }

  const { owner: resultOwner } = result;
  const value = resultOwner.toString();

  if (id !== value) {
    throw RequestError(404, "Not Found");
  }

  res.json(result);
};

module.exports = updateContact;
