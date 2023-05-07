const Joi = require("joi");
const { Schema, model, Types } = require("mongoose");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/, "email is not valid"],
    },
    contacts: {
      type: [Types.ObjectId],
      ref: "contacts",
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },
  { timestamps: true, versionKey: false }
);

const User = model("user", userSchema);

const userRegisterSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const joiSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

module.exports = { User, userRegisterSchema, joiSubscriptionSchema };
