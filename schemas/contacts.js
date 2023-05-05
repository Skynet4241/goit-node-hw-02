const { Schema, model } = require("mongoose");
const Joi = require("joi");

const shema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", shema);

const contactShema = Joi.object({
  name: Joi.string().required().error(new Error("Set name for contact")),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const contactStatusUpdate = Joi.object({
  favorite: Joi.boolean().required().error(new Error("Missing field favorite")),
});

module.exports = { Contact, contactStatusUpdate, contactShema };
