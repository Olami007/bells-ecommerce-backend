let mongoose = require("mongoose");
const { Schema } = mongoose;

const ProdSchema = new Schema(
  {
    id: { type: Number, require: true },
    title: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: String, require: true },
    discountPercentage: { type: String, require: true },
    rating: { type: String, require: true },
    stock: { type: String, require: true },
    brand: { type: String, require: true },
    category: { type: String, require: true },
    thumbnail: { type: String, require: true },
  },
  { timestamp: true }
);

module.exports = mongoose.model("prods", ProdSchema);
