const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Product = require("./product");
const User = require("./user");

const cartSchema = new schema(
  {
    _id: {
      type: ObjectId,
      required: true,
      default: ObjectId,
    },
    userId: {
      type: schema.Types.ObjectId,
      ref: User,
      required: true,
    },

    products: [
      {
        productId: {
          type: schema.Types.ObjectId,
          ref: Product,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("cart", cartSchema);
