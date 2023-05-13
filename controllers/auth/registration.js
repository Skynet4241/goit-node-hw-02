const { User } = require("../../models/user");
const bcrypt = require("bcrypt");
const garavatar = require("gravatar");

const registration = async (req, res) => {
  const { email, password } = req.body;

  const avatarURL = garavatar.url(email);

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const result = await User.create({
    email,
    password: hashedPassword,
    avatarURL,
  });
  res.status(201).json({ id: result._id, email });
};

module.exports = registration;
