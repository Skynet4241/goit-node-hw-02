const { Contact } = require("../../models/contacts");

const getAllContacts = async (req, res) => {
  const { _id } = req.user;

  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const query = { owner: _id };

  if (favorite === "true") {
    query.favorite = true;
  }

  const contacts = await Contact.find(query, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id email subscription");

  res.json({ contacts });
};

module.exports = getAllContacts;
