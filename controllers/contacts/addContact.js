const { Contact } = require("../../schemas/contacts");

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  return res.status(201).json(result);
};

module.exports = addContact;
