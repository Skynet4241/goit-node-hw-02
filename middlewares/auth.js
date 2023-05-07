const { RequestError } = require("../helpers");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { User } = require("../models/user");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer") {
    throw RequestError(401, "Token type is not valid");
  }

  if (!token) {
    throw RequestError(401, "Not authorized");
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    req.user = user;
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      throw RequestError(401, "Not authorized");
    }
  }

  next();
};

module.exports = auth;
