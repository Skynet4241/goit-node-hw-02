const { RequestError } = require("../../helpers");
const { User } = require("../../models/user");

const updateSubscription = async (req, res) => {
  const { id, email } = req.user;
  const { subscription } = req.body;

  const result = await User.findByIdAndUpdate(
    id,
    { subscription },
    { new: true }
  );

  if (!result) {
    throw RequestError(404, "Not Found");
  }
  res.json({ email, subscription });
};

module.exports = updateSubscription;
