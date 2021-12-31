const res = require("express/lib/response");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const schema = mongoose.Schema;
const validator = require("validator");

const userSchema = new schema(
  {
    _id: {
      type: ObjectId,
      required: true,
      default: ObjectId,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: (value) => {
        if (!validator.isEmail(value)) {
          throw new Error({ error: "Invalid Email address" });
        }
      },
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      firstname: {
        type: String,
        required: true,
      },
      lastname: {
        type: String,
        required: true,
      },
    },
    address: {
      city: String,
      street: String,
      number: Number,
    },
    phone: String,
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
