const { RequestError } = require("../../helpers");
const { User } = require("../../models/user");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw RequestError(404, "User not found");
  }

  if (user.verify) {
    throw RequestError(400, "User have already verified");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
  });

  return res.status(200).json({ message: "Verification successful" });
};

module.exports = verifyEmail;
