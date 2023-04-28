const { Contact } = require("../../schemas/contacts");
const RequestError = require("../../helpers/requestError");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw RequestError(404, "Not Found");
  }
  res.json(result);
};

module.exports = getContactById;
