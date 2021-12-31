const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const productSchema = new schema(
  {
    _id: {
      type: ObjectId,
      required: true,
      default: ObjectId,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: String,
    finalImage: {
      contentType: String,
      image: Buffer,
    },
    image: String,
    category: String,
  },
  { timestamps: true }
);
// productSchema.virtual("image").get(function () {
//   if (this.imageType != null && this.ImageData != null)
//     return `data:${
//       this.imageType
//     };charset=utf-8;base64,${this.ImageData.toString("base64")}`;
// });
module.exports = mongoose.model("product", productSchema);
