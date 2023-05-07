const { RequestError } = require("../../helpers");
const { User } = require("../../models/user");

const logout = async (req, res) => {
  const { id } = req.user;

  const result = await User.findByIdAndUpdate(id, { token: "" });

  if (!result) {
    throw RequestError(401, "Not authorized");
  }

  res.status(204).json();
};

module.exports = logout;
