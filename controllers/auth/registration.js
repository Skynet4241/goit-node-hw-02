const { User } = require("../../models/user");
const { sendEmail } = require("../../helpers");
const bcrypt = require("bcrypt");
const { v4 } = require("uuid");

const registration = async (req, res) => {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const verificationToken = v4();

  const result = await User.create({
    email,
    password: hashedPassword,
    verificationToken,
  });

  await sendEmail({
    to: email,
    subject: "Please, confirm your email",
    html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}">Please verify your email</a>`,
  });

  res.status(201).json({ id: result._id, email });
};

module.exports = registration;
