const { RequestError, sendEmail } = require("../../helpers");
const { User } = require("../../models/user");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw RequestError(404, "Missing required field email");
  }

  if (user.verify) {
    throw RequestError(400, "Verification has already been passed");
  }

  await sendEmail({
    to: email,
    subject: "Email verification",
    html: `<a href="http://localhost:3000/api/users/verify/${user.verificationToken}">Please verify your email</a>`,
  });

  return res.status(200).json({ message: "Verification email sent" });
};

module.exports = resendVerifyEmail;
