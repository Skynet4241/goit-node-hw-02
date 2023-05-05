const { Contact } = require("../../schemas/contacts");

const getAllContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

module.exports = getAllContacts;
