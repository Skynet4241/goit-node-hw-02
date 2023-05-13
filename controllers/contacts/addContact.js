const { RequestError } = require("../../helpers");
const { Contact } = require("../../models/contacts");

const addContact = async (req, res) => {
  const { name } = req.body;
  const { _id } = req.user;

  const contactsList = await Contact.find({ owner: _id });

  const existingContact = contactsList.some((item) => item.name === name);

  if (existingContact) {
    throw RequestError(409, `Contact with name "${name}" already exists`);
  }

  const result = await Contact.create({ ...req.body, owner: _id });

  res.status(201).json({ result });
};

module.exports = addContact;
