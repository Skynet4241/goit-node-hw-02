const { RequestError } = require("../../helpers");
const { Contact } = require("../../models/contacts");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { id } = req.user;
  const { favorite } = req.body;

  const result = await Contact.findByIdAndUpdate(contactId, favorite, {
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

module.exports = updateStatusContact;
