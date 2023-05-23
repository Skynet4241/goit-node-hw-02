const nodemailer = require("nodemailer");

const { EMAIL_USER, EMAIL_PASSWORD } = process.env;

const sendEmail = async ({ to, subject, html }) => {
  const from = "luke.skywalker.chu@gmail.com";
  const email = {
    to,
    from,
    subject,
    html,
  };

  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
  });

  await transport.sendMail(email);
};

module.exports = sendEmail;
