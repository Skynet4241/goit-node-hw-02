const contacts = require("../../models/contacts");

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  res.json(result);
};

module.exports = updateContact;
