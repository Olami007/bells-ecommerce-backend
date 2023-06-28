let mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    first_name: { type: String, require: true },
  },
  { timestamp: true }
);

module.exports = mongoose.model("products", ProductSchema);
