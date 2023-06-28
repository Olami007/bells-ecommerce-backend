let mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    first_name: { type: String, require: true },
    last_name: { type: String, require: true },
    email: { type: String, require: true, unique: true, index: true },
    phone: { type: String, require: true },
    sex: { type: String, require: true },
    address: { type: String, require: true },
    nationality: { type: String, require: true },
    region: { type: String, require: true },
    password: { type: String, require: true },
  },
  { timestamp: true }
);

module.exports = mongoose.model("harrearsUser", userSchema);
